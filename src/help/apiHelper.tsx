// help/fetch.ts
export const BASE_URL =
  typeof window === "undefined"
    ? process.env.API_BACKEND
    : process.env.NEXT_PUBLIC_API_BACKEND;
// Tạo fetch options không cần token
export const getFetchOptions = (method: string, data?: any): RequestInit => {
  const isFormData = data instanceof FormData;

  const options: RequestInit = {
    method,

    credentials: "omit",
    // Tắt cache để tránh lấy dữ liệu cũ khi server vừa mở CORS
    cache: "no-store",
    headers: isFormData
      ? {
          // Thêm Origin header cho FormData
          Origin:
            typeof window === "undefined"
              ? process.env.PUBLIC_DOMAIN
              : window.location.origin,
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        }
      : {
          "Content-Type": "application/json",
          Origin:
            typeof window === "undefined"
              ? process.env.PUBLIC_DOMAIN
              : window.location.origin,
          redirect: "follow",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        },
  };

  if (data && method !== "GET") {
    options.body = isFormData ? data : JSON.stringify(data);
  }

  return options;
};

export const getFetchOptionsToken = (
  method: string,
  data?: any
): RequestInit => {
  const token = getAccessToken();
  const isFormData = data instanceof FormData;

  const headers: HeadersInit = {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    // Thêm Origin header cho tất cả requests có token
    Origin:
      typeof window === "undefined"
        ? process.env.PUBLIC_DOMAIN
        : process.env.NEXT_PUBLIC_DOMAIN,
    // Tắt cache để tránh lấy dữ liệu cũ khi server vừa mở CORS
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: "0",
  };

  // Nếu không phải FormData → thêm Content-Type application/json
  if (!isFormData) {
    headers["Content-Type"] = "application/json";
    headers["redirect"] = "follow";
  }

  const options: RequestInit = {
    method,
    credentials: "omit",
    // Tắt cache để tránh lấy dữ liệu cũ khi server vừa mở CORS
    cache: "no-store",
    headers,
  };

  if (data && method !== "GET") {
    options.body = isFormData ? data : JSON.stringify(data);
  }
  return options;
};

// Lấy access_token từ localStorage (JWT) và kiểm tra hết hạn
function getAccessToken(): string | null {
  try {
    // Tránh truy cập localStorage khi chạy server-side
    if (typeof window === "undefined") return null;

    const authUser = localStorage.getItem("authUser");
    if (!authUser) return null;

    const token = JSON.parse(authUser).access_token;
    if (!token) return null;

    const [, payloadBase64] = token.split(".");
    // atob không có trên Node.js → dùng Buffer để decode khi cần
    const decoded = Buffer.from(payloadBase64, "base64").toString("utf8");
    const payload = JSON.parse(decoded);
    const exp = payload.exp;

    // Token hết hạn → xóa authUser để logout
    if (exp && Date.now() >= exp * 1000) {
      localStorage.removeItem("authUser");
      return null;
    }

    return token;
  } catch {
    return null;
  }
}

// Fetch API không cần token
export async function customFetch<T>(
  endpoint: string,
  method: string = "GET",
  data?: any
): Promise<T> {
  let finalUrl = `${BASE_URL}${endpoint}`;
  
  // Thêm timestamp để tránh cache khi server vừa mở CORS
  const timestamp = Date.now();
  const separator = endpoint.includes("?") ? "&" : "?";
  finalUrl += `${separator}_t=${timestamp}`;

  if (method === "GET" && data) {
    const query = new URLSearchParams(data).toString();
    finalUrl += `&${query}`;
  }

  try {
    const response = await fetch(finalUrl, getFetchOptions(method, data));
    const responseBody = await response.json();
    return responseBody;
  } catch (err: any) {
    throw err instanceof Error ? err.message : "INTERNAL SERVER ERROR";
  }
}

// Fetch API có kiểm tra token và silently reject nếu không có hoặc hết hạn
export async function customFetchToken<T>(
  endpoint: string,
  method: string = "GET",
  data?: any
): Promise<T> {
  const token = getAccessToken();

  // ❗ Nếu token không hợp lệ hoặc hết hạn, không fetch, không thông báo
  if (!token) {
    return Promise.reject();
  }

  let finalUrl = `${BASE_URL}${endpoint}`;

  // Thêm timestamp để tránh cache khi server vừa mở CORS
  const timestamp = Date.now();
  const separator = endpoint.includes("?") ? "&" : "?";
  finalUrl += `${separator}_t=${timestamp}`;

  if (method === "GET" && data) {
    const query = new URLSearchParams(data).toString();
    finalUrl += `&${query}`;
  }

  try {
    const response = await fetch(finalUrl, getFetchOptionsToken(method, data));
    const responseBody = await response.json();

    if (responseBody.statusCode === 200 || responseBody.statusCode === 201) {
      return responseBody;
    } else {
      throw new Error(responseBody?.message || "INTERNAL SERVER ERROR");
    }
  } catch (err: any) {
    throw err instanceof Error ? err.message : "INTERNAL SERVER ERROR";
  }
}

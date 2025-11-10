import { customFetch } from "./apiHelper";
import { CLIENT_ENDPOINTS } from "./urlHelper";

//OPHIM69
export const fetchMenus = async () => {
  const result = await customFetch(CLIENT_ENDPOINTS.MENU, "GET");
  return result;
};

export const fetchBannerList = async () => {
  return customFetch(CLIENT_ENDPOINTS.PUBLICS.BANNERS.LIST, "GET", '?type=all');
};

export const fetchCategories = async ({ limit = 10 }: { limit: number }) => {
  return customFetch(CLIENT_ENDPOINTS.PUBLICS.CATEGORIES.LIST, "GET", {
    limit,
  });
};

export const fetchMovies = async ({
  limit = 10,
  page = 1,
  category,
  actor,
  country,
  director,
  search,
  status,
  type,
  year,
  sortBy,
  movieType,
  movieStatus,
  movieCategory,
  movieCountry,
}: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  type?: string;
  status?: string;
  year?: string;
  country?: string;
  actor?: string;
  director?: string;
  sortBy?: string;
  movieType?: string;
  movieStatus?: string;
  movieCategory?: string;
  movieCountry?: string;
}) => {
  const query = {
    limit,
    page,
    ...(category && { category }),
    ...(actor && { actor }),
    ...(country && { country }),
    ...(director && { director }),
    ...(search && { search }),
    ...(status && { status }),
    ...(type && {
      type:
        type === "phim-bo"
          ? "series"
          : type === "phim-le"
            ? "single"
            : type === "phim-sap-chieu"
              ? "upcoming"
              : type,
    }),
    ...(year && { year }),
    ...(sortBy && { sortBy }),
    ...(movieType && { movieType }),
    ...(movieStatus && { movieStatus }),
    ...(movieStatus && { movieStatus }),
    ...(movieCategory && { movieCategory }),
    ...(movieCountry && { movieCountry }),
  };
  return customFetch(CLIENT_ENDPOINTS.PUBLICS.MOVIES.LIST, "GET", query);
};

// Lấy danh sách thể loại phim
export const fetchCategoryList = async () => {
  return customFetch("/publics/categories", "GET");
};

export const fetchDetailsMovies = async (slug: string) => {
  return customFetch(CLIENT_ENDPOINTS.PUBLICS.MOVIES.DETAIL(`${slug}`), "GET");
};

export const fetchSimilarMovies = async (slug: string, page: number) => {
  return customFetch(CLIENT_ENDPOINTS.PUBLICS.MOVIES.DETAIL(`${slug}/with-similar?limit=${page}`), "GET");
};

export const fetchCountries = async () => {
  return customFetch(CLIENT_ENDPOINTS.PUBLICS.COUNTRIES.LIST, "GET");
};

export const postRating = async (data: any) => {
  return customFetch(
    `/rating/rate-movie`,
    "POST",
    data
  );
};

export const postComments = async (data: any) => {
  return customFetch(
    `/comments`,
    "POST",
    data
  );
};

// Lấy danh sách diễn viên (phân trang, tìm kiếm)
export const fetchActors = async (params?: {
  page?: number;
  limit?: number;
  search?: string;
  current?: number;
  pageSize?: number;
}) => {
  const query = {
    page: params?.page || params?.current || 1,
    limit: params?.limit || params?.pageSize || 40,
    search: params?.search || "",
  };
  return customFetch("/publics/actors", "GET", query);
};

export const fetchActorDetail = async (slug: string, params?: any) => {
  return customFetch(
    CLIENT_ENDPOINTS.PUBLICS.ACTOR.DETAIL(slug),
    "GET",
    params
  );
};

// Fetch tất cả dữ liệu menu cần thiết cho header - chỉ sử dụng 3 API chính
export const fetchMenuData = async () => {
  try {
    // Fetch categories và countries song song
    const [categoriesResponse, countriesResponse] = await Promise.all([
      fetchCategories({ limit: 50 }),
      fetchContries({ limit: 50 }),
    ]);

    // Tạo menu items cố định với routes mới
    const menuItems = [
      { name: "Trang chủ", slug: "home" },
      { name: "Phim lẻ", slug: "phim-le" },
      { name: "Phim bộ", slug: "phim-bo" },
      // { name: "Phim sắp chiếu", slug: "phim-sap-chieu" },
    ];

    // Chuyển đổi dữ liệu categories và countries thành format MenuItem
    const theLoai =
      (categoriesResponse as any)?.data?.data?.map((item: any) => ({
        name: item.name,
        slug: item.url,
      })) || [];

    const quocGia =
      (countriesResponse as any)?.data?.data?.map((item: any) => ({
        name: item.name,
        slug: item.url,
      })) || [];

    return {
      items: menuItems,
      theLoai,
      quocGia,
    };
  } catch (error) {
    // console.error("Error fetching menu data:", error);
    // Trả về dữ liệu mặc định nếu có lỗi
    return {
      items: [
        { name: "Trang chủ", slug: "home" },
        { name: "Phim lẻ", slug: "phim-le" },
        { name: "Phim bộ", slug: "phim-bo" },
      ],
      theLoai: [],
      quocGia: [],
    };
  }
};

// Chuẩn hóa URL ảnh sang absolute dựa trên NEXT_PUBLIC_DOMAIN
export const toAbsoluteImageUrl = (path?: string) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const domain = process.env.NEXT_PUBLIC_DOMAIN || "";
  if (!domain) return path;
  const hasSlash = path.startsWith("/");
  return `${domain}${hasSlash ? "" : "/"}${path}`;
};

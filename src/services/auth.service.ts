// import { customFetch } from "@/help/apiHelper";
// import { CLIENT_ENDPOINTS } from "@/help/urlHelper";

// interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// interface RegisterResponse {
//   statusCode: number;
//   message: string;
//   data?: {
//     token: string;
//     user: {
//       id: string;
//       name: string;
//       email: string;
//     };
//   };
// }

// interface LoginData {
//   username: string;
//   password: string;
// }

// interface LoginResponse {
//   statusCode: number;
//   message: string;
//   data?: {
//     access_token: string;
//     user: {
//       _id: string;
//       name: string;
//       email: string;
//       role: {
//         _id: string;
//         name: string;
//       };
//       permissions: string[];
//     };
//   };
// }

// export const register = async (data: RegisterData): Promise<RegisterResponse> => {
//   return customFetch(CLIENT_ENDPOINTS.REGISTER, "POST", data);
// };

// export const login = async (data: LoginData): Promise<LoginResponse> => {
//   return customFetch(CLIENT_ENDPOINTS.LOGIN, "POST", data);
// }; 

// export const forgotPassword = (email: string) => {
//   return customFetch("/mail", "POST", { email });
// }; 
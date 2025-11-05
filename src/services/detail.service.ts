// import { customFetch, customFetchToken } from "@/help/apiHelper";
// import { CLIENT_ENDPOINTS } from "@/help/urlHelper";
// import { ApiResponse, MovieData, SuggestedMoviesResponse } from "@/types/detail";

// /**
//  * Lấy thông tin chi tiết phim
//  * @param slug - Slug của phim
//  */
// export const fetchFilmDetail = async (slug: string): Promise<ApiResponse<MovieData>> => {
//   return customFetch(CLIENT_ENDPOINTS.FILM_DETAIL(slug), "GET");
// };

// /**
//  * Lấy danh sách phim đề xuất
//  */
// export const fetchSuggestedMovies = async (): Promise<SuggestedMoviesResponse> => {
//   return customFetch(CLIENT_ENDPOINTS.FILM_SUGGESTED(1, 10), "GET");
// };

// // Lấy danh sách bình luận theo phim
// export const fetchCommentsByFilm = async (slug: string, current = 1, pageSize = 10) => {
//   return customFetchToken(
//     `/comments/findCommentByFilm/${slug}?current=${current}&pageSize=${pageSize}`,
//     "GET"
//   );
// };

// // Gửi bình luận hoặc trả lời
// export const postComment = async (data: any) => {
//   return customFetchToken(
//     `/comments`,
//     "POST",
//     data
//   );
// };

// // Vote bình luận
// export const voteComment = async (commentId: string, upVote: number, downVote: number) => {
//   return customFetchToken(
//     `/comments/vote/${commentId}?upVote=${upVote}&downVote=${downVote}`,
//     "PATCH"
//   );
// };

// // Lấy danh sách review (đánh giá) theo phim
// export const fetchRatingsByFilm = async (slug: string, current = 1, pageSize = 10) => {
//   return customFetchToken(
//     `/ratings/findRatingByFilm/${slug}?current=${current}&pageSize=${pageSize}`,
//     "GET"
//   );
// };

// // Gửi review (đánh giá)
// export const postRating = async (data: any) => {
//   return customFetchToken(
//     `/ratings`,
//     "POST",
//     data
//   );
// };

// // Vote bình luận
// export const voteRating = async (ratingId: string, upVote: number, downVote: number) => {
//   return customFetchToken(
//     `/ratings/vote/${ratingId}?upVote=${upVote}&downVote=${downVote}`,
//     "PATCH"
//   );
// };


// // Cập nhật lượt xem phim
// export const updateFilmView = async (slug: string) => {
//   return customFetchToken(
//     `/films/updateView/${slug}`,
//     "PATCH"
//   );
// };

// // Thêm vào lịch sử xem
// export const addToHistory = async (slug: string) => {
//   return customFetchToken(
//     `/users/addOrRemoteHistory/${slug}?isHistory=true`,
//     "PATCH"
//   );
// };

// // Lấy danh sách phim yêu thích
// export const fetchFavorite = async () => {
//   return customFetchToken(
//     `/users/getFavorite`,
//     "GET"
//   );
// };

// // Thêm/xóa phim khỏi danh sách yêu thích
// export const toggleFavorite = async (slug: string, isFavorite: boolean) => {
//   return customFetchToken(
//     `/users/addFavorite/${slug}?isFavorite=${isFavorite}`,
//     "PATCH"
//   );
// };

// // Lấy danh sách playlist của user
// export const fetchPlaylists = async () => {
//   return customFetchToken(
//     `/play-list/findByUser?current=1&pageSize=10`,
//     "GET"
//   );
// };

// // Thêm/xóa phim vào playlist
// export const updatePlaylist = async (playList: any) => {
//   return customFetchToken(
//     `/play-list/updateByUser`,
//     "PATCH",
//     { playList }
//   );
// };

// export const updateWatchProgress = async (slug: string, percent: number) => {
//   return customFetchToken(
//     `/users/addOrRemoteHistory/${slug}?percent=${percent}&isHistory=true`,
//     "PATCH",
//     {}
//   );
// };

// export const createPlaylist = async (title: string) => {
//   return customFetchToken(
//     "/play-list",
//     "POST",
//     { title }
//   );
// };

// export const removeFilmFromPlaylist = async (playlistId: string, slug: string) => {
//   return customFetchToken(
//     `/play-list/removeFilm/${playlistId}?slug=${slug}`,
//     "PATCH"
//   );
// };
import { CategoryModel } from "@/types/model/category.d";

export const TypeFilms: CategoryModel[] = [
    {
        slug: 'phim-moi',
        name: 'Phim mới',
        sortBy: 'newest',
    },
    {
        slug: 'phim-le',
        name: 'Phim lẽ',
        english: 'single',
    },
    {
        slug: 'phim-bo',
        name: 'Phim bộ',
        english: 'series',
    },
    {
        slug: 'phim-chieu-rap',
        name: 'Phim chiếu rạp',
        category: 'phim-chieu-rap',
    },
    {
        slug: 'hoat-hinh',
        name: 'Hoạt hình',
        category: 'hoat-hinh',
    },
    {
        slug: 'phim-thinh-hanh',
        name: 'Phim thịnh hành',
        sortBy: 'most_viewed',
    },
]
export interface Category {
    id: string,
    name: string,
    link: string,
    filter?: FilterCategory[],
    isLarge?: boolean,
}

export interface FilterCategory {
    value: string;
    label: string;
}

export interface FilmData {
    id: number;
    name: string;
    title: string;
    image: string;
    link: string;
    tag: string;
}
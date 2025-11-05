export const removeVietnameseTones = (str: string) => {
    return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
};

export const NAVIGATION = {
    HOME: '/',
    SEARCH: '/search',
    INFO: '/phim',
    LIST: '/list',
    ACTOR: '/dien-vien',
    USER: '/user',
};
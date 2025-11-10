// app/list-film/[slug]/page.tsx
import ListFilmClient from "@/component/list-component/list.component";
import { fetchCountries, fetchMenus, fetchMovies } from "@/help/helper";
import { CategoryModel } from "@/types/model/category.d";
import { CountryModel } from "@/types/model/country.d";
import { TypeFilms } from "@/ultis/constant/type-film.constant";

interface Props {
    params: { slug: string };
}

export default async function ListFilmPage({ params }: Props) {
    const { slug } = params;

    const typeFilm = TypeFilms.find((item) => item.slug === slug);
    const type = typeFilm?.english;
    const movieCategory = typeFilm?.category;
    const sortBy = typeFilm?.sortBy;

    const filmsRes: any = await fetchMovies({
        page: 1,
        limit: 40,
        ...(type ? { type } : {}),
        ...(movieCategory ? { movieCategory } : {}),
        ...(sortBy ? { sortBy } : {}),
    }).catch(() => ({ data: { data: { result: [] } } }));

    const filmsData = filmsRes.data?.movies || [];
    const pagination = filmsRes.data?.pagination || [];

    const countriesRes: any = await fetchCountries().catch(() => ({ data: { data: { result: [] } } }));
    const countriesData = countriesRes.data.data.countries || [];

    let categoriesData: CategoryModel[] = [];
    let countryData: CountryModel[] = [];
    const menusRes: any = await fetchMenus();
    if (menusRes.data.menuTree && menusRes.data.menuTree.length > 0) {
        menusRes.data.menuTree.forEach(item => {
            if (item.categoryDetails.slug === "the-loai") {
                categoriesData = item.children.map((children) => ({
                    slug: children.categoryDetails.slug,
                    name: children.categoryDetails.name,
                }));
            }
            if (item.categoryDetails.slug === "quoc-gia") {
                countryData = item.children.map((children) => ({
                    slug: children.categoryDetails.slug,
                    name: children.categoryDetails.name,
                }));
            }
        });
    }

    return (
        <ListFilmClient
            films={filmsData}
            pagination={pagination}
            types={TypeFilms}
            typeFilm={typeFilm}
            categories={categoriesData}
            countries={countriesData}
            hideFilters={false}
        />
    );
}

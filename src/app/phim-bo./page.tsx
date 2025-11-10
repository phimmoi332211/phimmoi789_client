import List from "@/component/list/list.component";
import { fetchCategories, fetchContries, fetchMovies } from "@/help/helper";

interface Props {
  params: Promise<{ slug: string }>;
}
const PhimBoList = async ({ params }: Props) => {
  const { slug } = await params;

  const pageSize = 40;

  const [resCountry, resType] = (await Promise.all([
    fetchContries({ limit: 50 }),
    fetchCategories({ limit: 50 }),
  ])) as [any, any];

  const countries = resCountry?.data?.data || [];
  const types = resType?.data?.data || [];

  const filmsRes: any = await fetchMovies({
    page: 1,
    limit: pageSize,
    type: "series",
  }).catch(() => ({ data: { data: { result: [] } } }));

  const filmsData = filmsRes.data?.movies || [];;
  const totalPage = filmsRes?.meta?.totalPages || 1;

  return (
    <List
      url={"series"}
      films={filmsData}
      totalPage={totalPage}
      countries={countries}
      types={types}
      title="Phim bộ"
    />
  );
};

export default PhimBoList;
export const runtime = "edge";

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
    limit: pageSize,
    page: 1,
    type: "phim-bo",
  });
  const filmsData = filmsRes?.data?.data || { meta: {}, result: [] };
  const totalPage = filmsData?.meta?.totalPages || 1;

  return (
    <List
      url={"phim-bo"}
      films={filmsRes?.data}
      totalPage={totalPage}
      countries={countries}
      types={types}
      title="Phim bộ"
    />
  );
};

export default PhimBoList;
export const runtime = "edge";

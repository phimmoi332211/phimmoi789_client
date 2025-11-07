import MovieDetail from "@/component/movie/MovieDetail";
export const runtime = 'edge';

type Props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  return <MovieDetail slug={slug} />;
}

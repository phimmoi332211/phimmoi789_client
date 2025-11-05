import Actors from "@/component/actor/actor.component";
import { fetchActors } from "@/help/helper";
import { ApiResponse } from "@/types/response/api.response";
import { Actor } from "@/types/model/actor.d";

const ActorPage = async () => {
  const current = 1;
  const pageSize = 40;

  const actors: any = (await fetchActors({
    current: current,
    pageSize: pageSize,
  })) as ApiResponse<Actor[]>;
  const totalPage = actors?.data?.meta?.pages || 1;
  return <Actors actor={{ ...actors.data }} totalPage={totalPage} />;
};
export default ActorPage;
export const runtime = "edge";

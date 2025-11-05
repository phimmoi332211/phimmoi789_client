'use client';
import UserMenuComponent from "@/component/user/menu.component";
import UserProfileComponent from "@/component/user/profile.component";
import {useParams} from "next/navigation";
import {useEffect, useMemo} from "react";
import XemTiepComponent from "@/component/user/xem-tiep.component";
import FavoriteComponent from "@/component/user/favorite.component";
import PlaylistComponent from "@/component/user/playlist.component";
export const runtime = 'edge';

export default function UserPage() {
  const {slug} = useParams();
  useEffect(() => {

  }, [slug]);
  const showContent = useMemo(() => {
    switch (slug) {
      case "profile":
        return <UserProfileComponent />;
      case "xem-tiep":
        return <XemTiepComponent />;
      case "favorite":
        return <FavoriteComponent />;
      case "playlist":
        return <PlaylistComponent />;
      default:
        return;
    }
  }, [slug])
  return (
    <>
      <div id="wrapper" className="account-wrap">
        <div className="dashboard-container">
          <UserMenuComponent/>
          <div className="dcc-main">
            {
              showContent
            }
          </div>
        </div>
      </div>
    </>
  )
}
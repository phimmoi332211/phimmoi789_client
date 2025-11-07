"use client";
import Link from "next/link";
import Image from "next/image";
import { NAVIGATION } from "@/ultis/ultis";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function UserMenuComponent() {
  const { slug } = useParams();
  const router = useRouter();
  const { authUser, logout } = useAuth();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    router.push("/phim-hay");
  };

  return (
    <div className="dcc-side">
      <div className="ds-menu">
        <div className="heading-sm">Quản lý tài khoản</div>
        <div className="menu-user">
          <Link
            className={`item ${slug === "favorite" ? "active" : ""}`}
            href={`${NAVIGATION.USER}/favorite`}
          >
            <div className="line-center">
              <i className="fa-solid fa-heart"></i>
              <span>Yêu thích</span>
            </div>
          </Link>
          <Link
            className={`item ${slug === "playlist" ? "active" : ""}`}
            href={`${NAVIGATION.USER}/playlist`}
          >
            <div className="line-center">
              <i className="fa-solid fa-plus"></i>
              <span>Danh sách</span>
            </div>
          </Link>
          <Link
            className={`item ${slug === "xem-tiep" ? "active" : ""}`}
            href={`${NAVIGATION.USER}/xem-tiep`}
          >
            <div className="line-center">
              <i className="fa-solid fa-history"></i>
              <span>Xem tiếp</span>
            </div>
          </Link>
          <Link
            className={`item ${slug === "profile" ? "active" : ""}`}
            href={`${NAVIGATION.USER}/profile`}
          >
            <div className="line-center">
              <i className="fa-solid fa-user"></i>
              <span>Tài khoản</span>
            </div>
          </Link>
        </div>

        <div className="side-user">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white">
            <Image
              alt={authUser?.user?.name || "avatar"}
              src={authUser?.user?.avatar || "/image/16.jpg"}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="info">
            <h2 className="heading-xs user-name mb-0 lim-1">
              {authUser?.user?.name || ""}
            </h2>
            <div className="alias-name lim-1 mb-3">
              {authUser?.user?.email || ""}
            </div>
            <Link
              href="#"
              className="btn btn-sx btn-basic px-0"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span>Thoát</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

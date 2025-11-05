"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Define } from "@/types/define";
import { NAVIGATION, removeVietnameseTones } from "@/ultis/ultis";
import LoginModal from "../modal/LoginModal";
import RegisterModal from "../modal/RegisterModal";
import ForgotPasswordModal from "../modal/ForgotPasswordModal";
import { useAuth } from "@/context/AuthContext";
import { modalEvent } from "@/events/modal";
import Image from "next/image";

type HeaderPageProps = {
  menuList: Define.DataRepository<Define.Menu> | null;
};

export default function HeaderPage({ menuList }: HeaderPageProps) {
  const menus = menuList.data.menuTree || [];
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const userDropdownRef = useRef(null);

  const { authUser, setAuthUser, logout } = useAuth();

  // Load user from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("authUser");
    if (userStr) {
      try {
        setAuthUser(JSON.parse(userStr));
      } catch {
        setAuthUser(null);
      }
    } else {
      setAuthUser(null);
    }
  }, [showLoginModal]);

  // Handle outside click for dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userDropdownRef.current &&
        !(userDropdownRef.current as any).contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    }

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  // Modal event listeners
  useEffect(() => {
    const handleShowLogin = () => {
      setShowLoginModal(true);
      setShowRegisterModal(false);
      setShowForgotModal(false);
    };

    const handleShowRegister = () => {
      setShowLoginModal(false);
      setShowRegisterModal(true);
      setShowForgotModal(false);
    };

    const handleShowForgot = () => {
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setShowForgotModal(true);
    };

    const handleHideModals = () => {
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setShowForgotModal(false);
    };

    modalEvent.on("showLogin", handleShowLogin);
    modalEvent.on("showRegister", handleShowRegister);
    modalEvent.on("showForgot", handleShowForgot);
    modalEvent.on("hideModals", handleHideModals);

    return () => {
      modalEvent.off("showLogin", handleShowLogin);
      modalEvent.off("showRegister", handleShowRegister);
      modalEvent.off("showForgot", handleShowForgot);
      modalEvent.off("hideModals", handleHideModals);
    };
  }, []);

  const handleSearch = () => {
    if (keyword) {
      router.push(`${NAVIGATION.SEARCH}/${keyword}`);
    }
  };

  const handleToggleUserDropdown = () => {
    setShowUserDropdown((prev) => !prev);
  };

  const handleLoginClick = () => modalEvent.showLogin();
  const handleRegisterClick = () => modalEvent.showRegister();
  const handleCloseModals = () => modalEvent.hideModals();

  const handleLogout = () => {
    logout();
    toast.success("Đã đăng xuất!");
    router.push("/phim-hay");
  };

  return (
    <>
      <header className="fly menuDesktop">
        <div className="header-elements">
          <Link id="logo" title="Rophimmoi" href="/home">
            <Image src="/logo.webp" alt="logo" width={134} height={40} />
          </Link>

          <div id="search">
            <div className="search-elements">
              <div className="search-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                id="main-search"
                className="search-input"
                placeholder="Tìm kiếm phim, diễn viên"
                autoComplete="off"
                type="text"
                onChange={(e) =>
                  setKeyword(
                    encodeURIComponent(
                      removeVietnameseTones(e.target.value)
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                    )
                  )
                }
                onKeyDown={(e) => e.code === "Enter" && handleSearch()}
              />
            </div>
          </div>
          <div className="el-group mt-3">
            {menus && menus.length > 0 && (
              <ul id="main_menu" className="flex flex-wrap gap-4">
                {menus.map((item, index) => {
                  // Menu không có children
                  if (!item?.children || item.children.length < 1) {
                    return (
                      <li key={index} className="menu-item">
                        <Link
                          href={item?.categoryDetails?.slug || "#"}
                          title={item?.categoryDetails?.name}
                          className="text-white hover:text-red-500 transition-colors"
                        >
                          {item?.categoryDetails?.name}
                        </Link>
                      </li>
                    );
                  }

                  // Menu có children
                  return (
                    <li key={index} className="menu-item relative group">
                      {/* Phần cha */}
                      <Link
                        href="#"
                        title={item?.categoryDetails?.description}
                        className="flex items-center gap-1 text-white hover:text-red-500 transition-colors"
                      >
                        {item?.categoryDetails?.name}
                        <i className="fa fa-angle-down text-sm"></i>
                      </Link>

                      {/* Dropdown (submenu) */}
                      <ul
                        className="
                          text-center
                          absolute top-full
                          hidden group-hover:flex
                          flex-col
                          bg-gray-900 rounded-lg shadow-lg z-[9999]
                          animate-fadeIn
                        "
                        style={{ paddingLeft: '0px !important' }}
                        // 👇 giúp không mất hover khi di chuyển từ cha xuống con
                        onMouseEnter={(e) => e.currentTarget.classList.add('flex')}
                        onMouseLeave={(e) => e.currentTarget.classList.remove('flex')}
                      >
                        {item.children?.map((child, subIndex) => (
                          <li key={subIndex}>
                            <Link
                              href={`/${item?.categoryDetails?.slug}/${child?.categoryDetails?.slug}`}
                              className="px-5 py-2 block text-sm text-gray-200 hover:bg-gray-800 hover:text-white transition"
                            >
                              {child?.categoryDetails?.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  );
                })}
              </ul>
            )}
            <div className="flex-grow-1"></div>
            {!authUser ? (
              <div id="main_user" className="mb-3">
                <div
                  className="button-user button-login"
                  onClick={handleLoginClick}
                >
                  <div className="line-center">
                    <i className="fa-solid fa-user ms-1"></i>
                    <span>Thành viên</span>
                  </div>
                </div>
              </div>
            ) : (
              <div id="main_user" className="user-logged" ref={userDropdownRef}>
                <div className="show dropdown">
                  <div
                    className="header-user"
                    onClick={handleToggleUserDropdown}
                  >
                    <div className="line-center gap-3">
                      <div className="user-avatar">
                        <Image
                          alt={authUser?.user?.name}
                          src={authUser?.user?.avatar || "/image/16.jpg"}
                          fill
                        />
                      </div>
                      <i className="fa-solid fa-caret-down"></i>
                    </div>
                  </div>
                  <ul
                    className={`v-dropdown-menu user-dropdown bg-dark dropdown-menu dropdown-menu-end`}
                    style={{
                      display: showUserDropdown ? "block" : "none",
                      right: "-10px",
                      position: "absolute",
                      top: "100%",
                      minWidth: "180px",
                      zIndex: 9999,
                    }}
                  >
                    <div className="dropdown-blank flex-column align-items-start gap-0 w-100">
                      <div className="small-text">Chào,</div>
                      <div className="d-block lim-1">
                        <strong>
                          {authUser?.user?.name || authUser?.user?.email}
                        </strong>
                      </div>
                    </div>
                    <hr className="my-2" />
                    <Link className="dropdown-item" href="/user/favorite">
                      <div className="line-center">
                        <i className="fa-solid fa-heart"></i>
                        <span>Yêu thích</span>
                      </div>
                    </Link>
                    <Link className="dropdown-item" href="/user/playlist">
                      <div className="line-center">
                        <i className="fa-solid fa-plus"></i>
                        <span>Danh sách</span>
                      </div>
                    </Link>
                    <Link className="dropdown-item" href="/user/xem-tiep">
                      <div className="line-center">
                        <i className="fa-solid fa-history"></i>
                        <span>Xem tiếp</span>
                      </div>
                    </Link>
                    <Link className="dropdown-item" href="/user/profile">
                      <div className="line-center">
                        <i className="fa-solid fa-user"></i>
                        <span>Tài khoản</span>
                      </div>
                    </Link>
                    <hr className="my-2" />
                    <div className="dropdown-item" onClick={handleLogout}>
                      <div className="line-center">
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span>Thoát</span>
                      </div>
                    </div>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </header >

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={handleCloseModals}
          onRegisterClick={handleRegisterClick}
        />
      )}

      {
        showRegisterModal && (
          <RegisterModal
            isOpen={showRegisterModal}
            onClose={handleCloseModals}
            onLoginClick={handleLoginClick}
          />
        )
      }

      {
        showForgotModal && (
          <ForgotPasswordModal
            isOpen={showForgotModal}
            onClose={handleCloseModals}
            onLoginClick={handleLoginClick}
          />
        )
      }
    </>
  );
}

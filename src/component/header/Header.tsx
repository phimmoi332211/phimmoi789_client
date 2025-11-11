"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Define } from "@/types/define";
import { NAVIGATION, removeVietnameseTones } from "@/ultis/ultis";
import LoginModal from "../modal/LoginModal";
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
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const userDropdownRef = useRef(null);

  const { setAuthUser } = useAuth();

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
    };

    const handleShowRegister = () => {
      setShowLoginModal(false);
    };

    const handleShowForgot = () => {
      setShowLoginModal(false);
    };

    const handleHideModals = () => {
      setShowLoginModal(false);
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

  const handleRegisterClick = () => modalEvent.showRegister();
  const handleCloseModals = () => modalEvent.hideModals();

  return (
    <>
      <header className="fly menuDesktop bg-transparent fixed z-10 py-2.5">
        <div className="header-elements">
          <Link id="logo" title="Phimmoi789" href="/phim-hay">
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
    </>
  );
}

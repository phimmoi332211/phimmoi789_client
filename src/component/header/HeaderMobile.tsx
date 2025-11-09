"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Define } from "@/types/define";

type HeaderMobileSimpleProps = {
  menuList: Define.DataRepository<Define.Menu> | null;
};

export default function HeaderMobileSimple({ menuList }: HeaderMobileSimpleProps) {
  const router = useRouter();
  const menus = menuList?.data?.menuTree || [];
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Toggle main menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setShowSearch(false);
  };

  // Dropdown hover or click
  const toggleDropdown = (slug: string) => {
    setOpenDropdown(openDropdown === slug ? null : slug);
  };

  // Hover logic
  const handleMouseEnter = (slug: string) => setOpenDropdown(slug);
  const handleMouseLeave = () => setOpenDropdown(null);

  const handleSearch = () => {
    if (keyword.trim()) {
      router.push(`/search/${encodeURIComponent(keyword.trim())}`);
      setShowSearch(false);
    }
  };

  return (
    <>
      <header className="header-mobile bg-dark text-white">
        <div className="header-elements flex items-center justify-between p-3">
          {/* Logo */}
          <Link href="/phim-hay" title="Phimmoi789" className="logo">
            <Image src="/logo.webp" alt="logo" width={120} height={35} />
          </Link>

          <div className="flex gap-3 items-center">
            {/* Search Button */}
            <button
              aria-label="Search"
              onClick={() => {
                setShowSearch(!showSearch);
                setIsOpen(false);
                setTimeout(() => inputRef.current?.focus(), 100);
              }}
              className="text-xl"
            >
              <FaSearch />
            </button>

            {/* Menu Button */}
            <button
              className="hamburger-btn text-2xl"
              onClick={toggleMenu}
            >
              <i className={`fa ${isOpen ? "fa-times" : "fa-bars"}`} />
            </button>
          </div>
        </div>

        {/* Search overlay */}
        {showSearch && (
          <div className="fixed top-0 left-0 right-0 z-40 bg-dark flex items-center gap-3 p-4">
            <input
              ref={inputRef}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Tìm kiếm phim, diễn viên..."
              className="flex-1 px-3 py-2 rounded-md bg-gray-800 text-white border border-gray-700 focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              className="bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              <FaSearch />
            </button>
            <button
              onClick={() => setShowSearch(false)}
              className="text-2xl px-2"
            >
              ×
            </button>
          </div>
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="mobile-menu mt-3 bg-dark rounded-md p-3 z-30">
            <ul id="main_menu_mobile" className="flex flex-col gap-2">
              {menus.length > 0 &&
                menus.map((item, index) => {
                  const hasChildren = item?.children && item.children.length > 0;
                  const slug = item?.categoryDetails?.slug;

                  if (!hasChildren) {
                    return (
                      <li key={index}>
                        <Link
                          href={slug || "#"}
                          className="block py-2 px-3 rounded hover:bg-gray-800 transition"
                          onClick={() => setIsOpen(false)}
                        >
                          {item?.categoryDetails?.name}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li
                      key={index}
                      onMouseEnter={() => handleMouseEnter(slug)}
                      onMouseLeave={handleMouseLeave}
                      className="relative"
                    >
                      <div
                        className="flex justify-between items-center py-2 px-3 rounded cursor-pointer hover:bg-gray-800"
                        onClick={() => toggleDropdown(slug)}
                      >
                        <span>{item?.categoryDetails?.name}</span>
                        <i
                          className={`fa fa-angle-${openDropdown === slug ? "up" : "down"
                            }`}
                        />
                      </div>

                      {openDropdown === slug && (
                        <ul className="ml-3 mt-1 bg-gray-900 rounded-lg overflow-hidden">
                          {item.children.map((child, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                href={`/${slug}/${child?.categoryDetails?.slug}`}
                                className="block py-2 px-4 text-gray-300 hover:text-white hover:bg-gray-800 transition"
                                onClick={() => setIsOpen(false)}
                              >
                                {child?.categoryDetails?.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { modalEvent } from "@/events/modal";

interface Film {
  title: string;
  slug: string;
}

interface Playlist {
  _id: string;
  title: string;
  films: Film[];
}

interface PlaylistDropdownProps {
  slug?: string;
  variant?: "default" | "compact";
}

export default function PlaylistDropdown({
  slug,
  variant = "default",
}: PlaylistDropdownProps) {
  const { authUser } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<Set<string>>(
    new Set()
  );
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlaylistsData = async () => {
    if (!authUser?.access_token) return;
    try {
    } catch (error) {
      toast.error("Không thể tải danh sách playlist!");
      setPlaylists([]);
      setSelectedPlaylists(new Set());
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (authUser?.access_token) {
      fetchPlaylistsData();
    }
  }, [authUser, slug]);

  useEffect(() => {
    if (showDropdown && authUser?.access_token) {
      fetchPlaylistsData();
    }
  }, [showDropdown]);

  // Đóng dropdown khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".dropdown") && !target.closest(".item-playlist")) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const handleAddToPlaylist = async (playlistId: string) => {
    if (!slug) {
      toast.error("Không tìm thấy thông tin phim!");
      return;
    }
    try {
      const playlist = playlists.find((p) => p._id === playlistId);
      if (!playlist) {
        toast.error("Không tìm thấy playlist!");
        return;
      }
    } catch (error) {
      toast.error("Không thể cập nhật playlist!");
    }
  };

  const handleClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleNewPlaylist = () => {
    setShowDropdown(false);
    modalEvent.showPlaylist();
  };

  if (variant === "compact") {
    return (
      <div className="dropdown">
        <div>
          <div className="item-playlist">
            <div
              className="item"
              onClick={handleClick}
              style={{ cursor: "pointer" }}
            >
              <div className="inc-icon icon-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <path
                    d="M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <span>Thêm vào</span>
            </div>
          </div>
        </div>
        {showDropdown && (
          <div className="v-dropdown-menu dropdown-menu show">
            <div className="dropdown-blank w-100">
              <span className="flex-grow-1">Danh sách</span>
              <small>{playlists.length}/5</small>
            </div>
            {playlists.map((playlist, index) => (
              <li key={index}>
                <div className="dropdown-checkbox">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`playlist-${playlist._id}`}
                    value={playlist._id}
                    checked={selectedPlaylists.has(playlist._id)}
                    onChange={() => handleAddToPlaylist(playlist._id)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`playlist-${playlist._id}`}
                  >
                    {playlist.title}
                  </label>
                </div>
              </li>
            ))}
            <li>
              <div className="dropdown-blank mt-1">
                <button
                  className="btn btn-sm btn-primary w-100"
                  onClick={handleNewPlaylist}
                >
                  <i className="fa-solid fa-plus small"></i>
                  <span>Thêm mới</span>
                </button>
              </div>
            </li>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`show dropdown ${showDropdown ? "show" : ""}`}>
      <div>
        <div className="item item-playlist">
          <Link
            className="item-v"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleClick();
            }}
          >
            <div className="inc-icon icon-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M89.7273 41.6365H58.3635V10.2727C58.3635 6.81018 55.5534 4 52.0908 4H47.9092C44.4466 4 41.6365 6.81018 41.6365 10.2727V41.6365H10.2727C6.81018 41.6365 4 44.4466 4 47.9092V52.0908C4 55.5534 6.81018 58.3635 10.2727 58.3635H41.6365V89.7273C41.6365 93.1898 44.4466 96 47.9092 96H52.0908C55.5534 96 58.3635 93.1898 58.3635 89.7273V58.3635H89.7273C93.1898 58.3635 96 55.5534 96 52.0908V47.9092C96 44.4466 93.1898 41.6365 89.7273 41.6365Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <span>Thêm vào</span>
          </Link>
        </div>
      </div>
      {showDropdown && (
        <div
          className="v-dropdown-menu dropdown-menu show"
          data-popper-reference-hidden="false"
          data-popper-escaped="false"
          data-popper-placement="bottom-start"
          style={{
            position: "absolute",
            inset: "0px auto auto 0px",
            transform: "translate3d(0px, 59.5px, 0px)",
          }}
        >
          <div className="dropdown-blank w-100">
            <span className="flex-grow-1">Danh sách</span>
            <small>{playlists.length}/5</small>
          </div>
          {playlists.map((playlist, index) => (
            <li key={index}>
              <div className="dropdown-checkbox">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`playlist-${playlist._id}`}
                  value={playlist._id}
                  checked={selectedPlaylists.has(playlist._id)}
                  onChange={() => handleAddToPlaylist(playlist._id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`playlist-${playlist._id}`}
                >
                  {playlist.title}
                </label>
              </div>
            </li>
          ))}
          <li>
            <div className="dropdown-blank mt-1">
              <button
                className="btn btn-sm btn-primary w-100"
                onClick={handleNewPlaylist}
              >
                <i className="fa-solid fa-plus small"></i>
                <span>Thêm mới</span>
              </button>
            </div>
          </li>
        </div>
      )}
    </div>
  );
}

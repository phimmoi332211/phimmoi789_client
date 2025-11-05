"use client";

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
// import { createPlaylist } from "@/services/detail.service";

interface PlaylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (playlist: { _id: string; title: string }) => void;
}

export default function PlaylistModal({
  isOpen,
  onClose,
  onSuccess,
}: PlaylistModalProps) {
  const { authUser } = useAuth();
  const [newPlaylistTitle, setNewPlaylistTitle] = useState("");

  const handleCreatePlaylist = async () => {
    // if (!newPlaylistTitle.trim()) {
    //   toast.error("Vui lòng nhập tên playlist!");
    //   return;
    // }
    // try {
    //   const response = (await createPlaylist(newPlaylistTitle)) as {
    //     statusCode: number;
    //     data?: { _id: string; title: string };
    //   };
    //   if (response && response.statusCode === 201) {
    //     toast.success("Tạo playlist thành công!");
    //     setNewPlaylistTitle("");
    //     onClose();
    //     if (onSuccess && response.data) {
    //       onSuccess({
    //         _id: response.data._id,
    //         title: response.data.title,
    //       });
    //     }
    //   }
    // } catch (error) {
    //   toast.error("Không thể tạo playlist!");
    // }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade v-modal modal-xs modal show"
      tabIndex={-1}
      style={{
        display: "block",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 1050,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <button className="btn modal-close" onClick={onClose}>
            <i className="fa-solid fa-times"></i>
          </button>
          <div className="is-header mb-3">
            <h4 className="heading-xs mb-0">Thêm danh sách mới</h4>
          </div>
          <div className="is-body mb-4">
            <input
              className="form-control v-form-control"
              placeholder="Tên danh sách"
              maxLength={20}
              type="text"
              value={newPlaylistTitle}
              onChange={(e) => setNewPlaylistTitle(e.target.value)}
            />
          </div>
          <div className="is-footer">
            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={handleCreatePlaylist}
            >
              <i className="fa-solid fa-plus small"></i>
              Thêm
            </button>
            <button
              type="button"
              className="btn btn-sm btn-light px-4"
              onClick={onClose}
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

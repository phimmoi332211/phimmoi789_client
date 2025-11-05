"use client";

import React from "react";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export default function ShareModal({ isOpen, onClose, title }: ShareModalProps) {
  if (!isOpen) return null;

  
  return (
    <>
      <div className="modal-backdrop fade show" style={{ zIndex: 1040 }}></div>
      <div role="dialog" aria-modal="true" className="fade v-modal modal-md modal show" tabIndex={-1} style={{ display: "block", zIndex: 1050 }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <button className="btn modal-close" onClick={onClose}>
              <i className="fa-solid fa-times"></i>
            </button>
            <div className="is-header mb-2">
              <h4 className="heading-sm text-center mb-0">{title}</h4>
            </div>
            <div className="is-body mb-5">
              {/* Share content will go here */}
            </div>
            <div className="is-footer gap-3">
              <button type="button" className="btn btn-light px-4" onClick={onClose}>Đóng</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 
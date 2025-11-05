"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
// import { forgotPassword } from "@/services/auth.service";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  onLoginClick,
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Vui lòng nhập email");
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast.error("Email không hợp lệ");
      return;
    }

    setIsLoading(true);
    try {
      // await forgotPassword(email);
      // toast.success("Đã gửi liên kết khôi phục mật khẩu, vui lòng kiểm tra email");
      // onClose();
    } catch (error) {
      toast.error("Không thể gửi yêu cầu, thử lại sau");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade v-modal modal-login modal show"
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
          <button
            className="btn modal-close"
            aria-label="Close"
            onClick={onClose}
          >
            <i className="fa-solid fa-times"></i>
          </button>
          <div className="is-header mb-3">
            <h4 className="heading-sm mb-0">Quên mật khẩu</h4>
          </div>
          <div className="is-body">
            <p className="mb-4">
              Nếu bạn đã có tài khoản,{" "}
              <div
                className="text-primary btn-link"
                onClick={() => {
                  if (onLoginClick) onLoginClick();
                  onClose();
                }}
              >
                đăng nhập
              </div>
            </p>

            <form className="v-form" onSubmit={handleSubmit} noValidate>
              <div className="form-group mb-4">
                <input
                  className="form-control v-form-control"
                  placeholder="Email đăng ký"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group action-btn mt-4">
                <button
                  className="btn d-block btn-primary"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Đang gửi..." : "Gửi yêu cầu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

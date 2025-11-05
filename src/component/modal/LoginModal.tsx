"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
// import { login } from "@/services/auth.service";
import { useAuth } from "@/context/AuthContext"; // ✅ Import context
import { modalEvent } from "@/events/modal";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterClick?: () => void;
  onForgotClick?: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onRegisterClick,
  onForgotClick,
}: LoginModalProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { setAuthUser } = useAuth(); // ✅ Lấy hàm setAuthUser từ context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.username)) {
      toast.error("Vui lòng nhập email hợp lệ");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // if (!validateForm()) return;
    // setIsLoading(true);
    // try {
    //   const response = await login({
    //     username: formData.username,
    //     password: formData.password,
    //   });
    //   if (response.statusCode === 201) {
    //     localStorage.setItem("authUser", JSON.stringify(response.data));
    //     setAuthUser(response.data); // ✅ Quan trọng: cập nhật context
    //     toast.success("Đăng nhập thành công!");
    //     onClose();
    //   }
    // } catch (error: any) {
    // } finally {
    //   setIsLoading(false);
    // }
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fade modal-backdrop show"></div>
      <div
        role="dialog"
        aria-modal="true"
        className="fade v-modal modal-login modal show"
        tabIndex={-1}
        style={{ display: "block" }}
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
              <h4 className="heading-sm mb-0">Đăng nhập</h4>
            </div>

            <div className="is-body">
              <p className="mb-4">
                Nếu bạn chưa có tài khoản,{" "}
                <button
                  className="text-primary btn-link"
                  onClick={onRegisterClick}
                >
                  đăng ký ngay
                </button>
              </p>

              <form className="v-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group mb-2">
                  <input
                    className="form-control v-form-control"
                    placeholder="Email"
                    type="email"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    onInvalid={(e) => {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.validity.valueMissing) {
                        target.setCustomValidity("Vui lòng nhập email");
                      } else if (target.validity.typeMismatch) {
                        target.setCustomValidity("Vui lòng nhập email hợp lệ");
                      } else {
                        const emailRegex =
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                        if (!emailRegex.test(target.value)) {
                          target.setCustomValidity(
                            "Email chứa ký tự không hợp lệ"
                          );
                        }
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity("");
                    }}
                  />
                </div>
                <div className="form-group mb-4 user-password">
                  <input
                    className="form-control v-form-control"
                    placeholder="Mật khẩu"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                {/* CAPTCHA hoặc token có thể đặt ở đây nếu cần */}{" "}
                <div id="cf-turnstile">
                  <div>
                    <input
                      type="hidden"
                      name="cf-turnstile-response"
                      id="cf-chl-widget-m1v9p_response"
                      value="0.VbTqrb09nsmqCdS2_FzUKLx_hp5IjL42XFVnZZif0dPK9wHsa2CZWYAyxB0wkm6AHGskjzo4mqTIxhozzbVlSnCc-SfGUbA5Y_tWbpfznL6EyFMoxQLORyhaBjC7F3h3oJPqrIj94vJLWCbdgZLiGk1MPNboRf0ljdFFgrnpOgSt8HtvdUhVgZSzURwpU-iPS7hQsZWLPIV6CBGugbSZAtkgM24f9Cl8GtCPl7yfsrbr7y_DyxtrMhQOZyRf_gRMxNp-YYEk7OfZQ770EfwGb3VJdG4ITpaNjujzQ0X8z77FGgvuJPYcgkK2LepAVvREOqg1tXhnDn6UJDNO4abzo4ugVpbGme3NjFxyrMvoPEKLiMZFITRmGT27CpOZ5OfkXwM5N-Pbu5ts_hZ24zKxV2Nd6enCFoLpI8aRdPi7PXfTAz0VQ_EZOcGKHYBT6_e0cC0s-HenE29eu6q-qyRAaRzzTouBo0u27pr5GYswlU-RSk6sA9oPKgebuG0V-iJoS1tGZ5wOE1t6q07zzOrjNPNaWwyMsECIiAAx1gzSG54W9NvnM7he1TAmy3BRgef4zIDqzQO5bWHUCU1t9Qz9yyRXPZLdOFILuoLSIpqsYELe5KqzoIWe8eo_L0W3_-6445ftgiAkSDlA7vZXQnNYN_ZAFU6OavaqQZUYb7g3nHQ8Hx_ieANCAxTvE0XyCuQ4Ux46d8iJ1p4nO-VVP6yOYRdOtv7i7hFLswznZ3_RbLNhfvMIGTh6cQwgH2X3Wr2rjTRcRLO7XDBYU49jGn-sY7QrtWrZ12TV4qvFJxukYpB9RmXF0uLZMBvMdTBmifG6RqrgD_dFgShhjO-V5-v4oFwSqaO7jjpaHZrASLO3t1U.bIpwMMJlg__ELsZqe0wLzQ.3cb91748945e3384edb8e6345bf59396bf04af90584bd66490b5310279f7d1e5"
                    />
                  </div>
                </div>
                <div className="form-group action-btn mt-4 mb-4 d-grid">
                  <button
                    className="btn d-block btn-primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Đăng nhập"}
                  </button>
                </div>
                <div className="form-opt text-center">
                  <button
                    type="button"
                    className="small btn-link"
                    onClick={() => {
                      if (onForgotClick) {
                        onForgotClick();
                      } else {
                        modalEvent.showForgot();
                      }
                    }}
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

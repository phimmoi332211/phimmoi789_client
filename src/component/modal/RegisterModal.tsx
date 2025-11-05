"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";
// import { register } from '@/services/auth.service';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

export default function RegisterModal({
  isOpen,
  onClose,
  onLoginClick,
}: RegisterModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    cf_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.cf_password
    ) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return false;
    }

    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
    if (!nameRegex.test(formData.name.trim())) {
      toast.error("Tên hiển thị chỉ được chứa chữ cái và dấu cách");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email.trim())) {
      toast.error("Email không hợp lệ");
      return false;
    }

    if (formData.password !== formData.cf_password) {
      toast.error("Mật khẩu xác nhận không khớp");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // e.preventDefault();
    // if (!validateForm()) return;
    // setIsLoading(true);
    // try {
    //   const response = await register({
    //     name: formData.name,
    //     email: formData.email,
    //     password: formData.password,
    //     confirmPassword: formData.cf_password,
    //   });
    //   if (response.statusCode === 201) {
    //     toast.success("Đăng ký thành công!");
    //     onClose();
    //     if (onLoginClick) onLoginClick();
    //   } else {
    //     toast.error(response.message || "Đăng ký thất bại");
    //   }
    // } catch (error: any) {
    //   if (error.response?.data?.message) {
    //     toast.error(error.response.data.message);
    //   }
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
              <h4 className="heading-sm mb-0">Tạo tài khoản mới</h4>
            </div>

            <div className="is-body">
              <p className="mb-4">
                Nếu bạn đã có tài khoản,{" "}
                <button
                  className="text-primary btn-link"
                  onClick={onLoginClick}
                >
                  đăng nhập
                </button>
              </p>

              <form className="v-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group mb-2">
                  <input
                    className="form-control v-form-control"
                    placeholder="Tên hiển thị"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onInvalid={(e) => {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.validity.valueMissing) {
                        target.setCustomValidity("Vui lòng nhập tên hiển thị");
                      } else {
                        const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
                        if (!nameRegex.test(target.value.trim())) {
                          target.setCustomValidity(
                            "Tên hiển thị chỉ được chứa chữ cái và dấu cách"
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

                <div className="form-group mb-2">
                  <input
                    className="form-control v-form-control"
                    placeholder="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onInvalid={(e) => {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.validity.typeMismatch) {
                        target.setCustomValidity("Vui lòng nhập email hợp lệ");
                      } else if (target.validity.valueMissing) {
                        target.setCustomValidity("Vui lòng nhập email");
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity("");
                    }}
                  />
                </div>

                <div className="form-group mb-2">
                  <input
                    className="form-control v-form-control"
                    placeholder="Mật khẩu"
                    minLength={6}
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onInvalid={(e) => {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.validity.valueMissing) {
                        target.setCustomValidity("Vui lòng nhập mật khẩu");
                      } else if (target.validity.tooShort) {
                        target.setCustomValidity(
                          "Mật khẩu phải có ít nhất 6 ký tự"
                        );
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity("");
                    }}
                  />
                </div>

                <div className="form-group mb-4">
                  <input
                    className="form-control v-form-control"
                    placeholder="Nhập lại mật khẩu"
                    minLength={6}
                    type="password"
                    name="cf_password"
                    value={formData.cf_password}
                    onChange={handleChange}
                    onInvalid={(e) => {
                      e.preventDefault();
                      const target = e.target as HTMLInputElement;
                      if (target.validity.valueMissing) {
                        target.setCustomValidity("Vui lòng nhập lại mật khẩu");
                      } else if (target.validity.tooShort) {
                        target.setCustomValidity(
                          "Mật khẩu phải có ít nhất 6 ký tự"
                        );
                      }
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      target.setCustomValidity("");
                    }}
                  />
                </div>

                <div id="cf-turnstile">
                  <div>
                    <input
                      type="hidden"
                      name="cf-turnstile-response"
                      id="cf-chl-widget-4ls1a_response"
                      value="0.-9ruR_GXWVIKWzdLHh0FdxS_iZasBxtbFgr4dkpJ7OqI2-rjLd4Zx3q0-RLQJ-CEpLY-6Lavlo5r2h0-T0VQCJZVnQSelgyfouaJZHJD-Zn7QlJ0Vc55HL1yuu70EJH3-Q0jVo2kcQd6c3w2QcchJdCFMUDORzTznqHJ5j5B7WlmFzAckG__KA1AU2y01U42mNkMZiOupXvwknk5W7tPVf_hIbCIZPq0bjaYfVLtpf3HPyBuwwYIIcvy6ewh1E0kuiGSPTRCB1GN-Xiynavo3lyKTsQCNxYhoDeSfDN269mEwot2fhGZCnikoAfbZ3pbTPuVeJeqLTV1HzKm-N8bTESJkSLK5FJtcjQM-l6LZGG-Dnf34sDPpenJ-eF1giik8LwEGKDfciLZwG1Sx0SbB3WCfgD8ptr_QywXbFsbBCmcBAciXd6v1cFQxmfwA5eBaDBJM_Ep5PT49TEqU0Mu3_HBVpsDbMteSeKxfjwJCWTGKZaCOCMm_uRy2PZLR8b5091MAyT3u7NQgX24cSpsq8rg_PZb1nArBW6gnroqqwvxpek8J3LokcEhHBp2OZbj-etY9jW2hBB_h0pLeSiGd4VG_0kJbESm1a6vwnARWoVLlyTORhcRN2qunzI7ql0gupNjiMa52wdL2_CTG0xswT74XLjDxaqS3-Z2VooDu92-PvwDFR7AozFoje9qpW0IT0X-uMgNz_X-XXIInd8T-dKNt1fmmZnjxmebpHO87mBfSX4HqneRemBDDWIrApg5mFqe8hN-VqqUD41Al65z_b8X9FCDSv2efaTbw2yXstd3RvSHteqWBeuGZT-J0MyT46As8qTirE7qR_gQ8PNCOejYaaiLjJ2qKI2K4kpRZGg.WdmYG4biHLyCbihstYXPaA.c82500cc6dd13a19475e77aa2c464ecac67cd7f6c881a10dcdd17b0a5d1ab1a4"
                    />
                  </div>
                </div>

                <div className="form-group action-btn mt-4 mb-4 d-grid">
                  <button
                    className="btn d-block btn-primary"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Đang xử lý..." : "Đăng ký"}
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

"use client";

// import {
//   fetchGetFile,
//   fetchUpdateAuth,
//   fetchUpdatePassAuth,
//   fetchUploadFile,
//   fetchTypeAvatarList,
//   fetchAvatarByType,
// } from "@/help/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function UserProfileComponent() {
  const { authUser, setAuthUser } = useAuth();
  const router = useRouter();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [activeTab, setActiveTab] = useState("a-g-1");

  const [avatarTabs, setAvatarTabs] = useState<
    { id: string; name: string; images: string[] }[]
  >([]);

  const [user, setUser] = useState({
    email: "",
    name: "",
    gender: "3",
    avatar: "/image/16.jpg",
    _id: "",
  });

  const [tempAvatar, setTempAvatar] = useState(user.avatar);
  const [customAvatar, setCustomAvatar] = useState<string | null>(null);
  const [passwordInput, setPasswordInput] = useState({
    password: "",
    configPassword: "",
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authUser) {
        toast.warning("Bạn cần đăng nhập để truy cập trang này");
        router.push("/phim-hay");
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [authUser]);

  useEffect(() => {
    if (authUser) {
      setUser({
        email: authUser.user.email || "",
        name: authUser.user.name || "",
        gender: authUser.user.gender?.toString() || "3",
        avatar: authUser.user.avatar || "/image/16.jpg",
        _id: authUser.user._id || "",
      });
      setTempAvatar(authUser.user.avatar || "/image/16.jpg");
    }
  }, [authUser]);

  useEffect(() => {
    setTempAvatar(user.avatar);
  }, [user.avatar]);

  useEffect(() => {
    const loadAvatarTabs = async () => {
      try {
        // const typeRes: any = await fetchTypeAvatarList();
        // const types = typeRes?.data?.result || [];
        // const tabs = await Promise.all(
        //   types.map(
        //     async (type: { code: string; name: string }, index: number) => {
        //       const avatarRes: any = await fetchAvatarByType(type.code);
        //       const images: string[] =
        //         avatarRes?.data?.result?.map((item: any) => item.avatar) || [];
        //       return {
        //         id: `a-g-${index + 1}`,
        //         name: type.name,
        //         images,
        //       };
        //     }
        //   )
        // );
        // tabs.push({ id: "a-g-99", name: "Cá nhân", images: [] });
        // setAvatarTabs(tabs);
      } catch {
        toast.error("Không thể tải danh sách avatar!");
      }
    };

    loadAvatarTabs();
  }, []);

  const handleCustomAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("fileUpload", file);

    try {
      // const res: any = await fetchUploadFile(formData);
      // const uploadedUrl = res?.data?.cdnOrigin;
      // if (uploadedUrl) {
      //   setCustomAvatar(uploadedUrl);
      //   setTempAvatar(uploadedUrl);
      //   toast.success("Tải ảnh thành công!");
      // } else {
      //   toast.error("Không thể upload ảnh.");
      // }
    } catch {
      toast.error("Lỗi khi upload ảnh!");
    }
  };

  const changeAvatar = async (newAvatar: string) => {
    try {
      // await fetchUpdateAuth({ _id: user._id, avatar: newAvatar });
      // if (authUser)
      //   setAuthUser({
      //     ...authUser,
      //     user: { ...authUser.user, avatar: newAvatar },
      //   });
      // toast.success("Đã đổi avatar!");
    } catch {
      toast.error("Lỗi khi cập nhật avatar!");
    }
  };

  const changeGender = async (gender: string, name: string) => {
    try {
      // await fetchUpdateAuth({ _id: user._id, gender, name });
      // if (authUser)
      //   setAuthUser({ ...authUser, user: { ...authUser.user, gender, name } });
      // toast.success("Đã đổi thông tin cá nhân!");
    } catch {
      toast.error("Lỗi khi cập nhật thông tin cá nhân!");
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const { password, configPassword } = passwordInput;
    if (!password || !configPassword)
      return toast.error("Vui lòng nhập đầy đủ thông tin!");
    if (password !== configPassword)
      return toast.error("Mật khẩu xác nhận không khớp!");
    await changePassword({ password, configPassword });
  };

  const changePassword = async (data: typeof passwordInput) => {
    try {
      // await fetchUpdatePassAuth(data);
      // toast.success("Đã đổi mật khẩu!");
      // setShowChangePasswordModal(false);
      // setPasswordInput({ password: "", configPassword: "" });
    } catch {
      toast.error("Lỗi khi cập nhật mật khẩu!");
    }
  };

  return (
    <div className="cg-body-box py-0 is-profile">
      <div className="box-header flex-column align-items-start gap-2">
        <div className="heading-sm mb-0">Tài khoản</div>
        <p className="mb-0">Cập nhật thông tin tài khoản</p>
      </div>

      <div className="box-body">
        <div className="dash-form">
          <div className="v-avatar flex-shrink-0 text-center">
            <button
              onClick={() => setShowAvatarModal(true)}
              style={{
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
              }}
            >
              <div
                className="rounded-full border-4 border-white overflow-hidden mb-2"
                style={{ width: 100, height: 100, position: "relative" }}
              >
                <Image
                  src={user.avatar}
                  alt={user.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="small text-white">Đổi ảnh đại diện</span>
            </button>
          </div>

          <form className="v-form flex-grow-1" autoComplete="off">
            <div className="form-group mb-4">
              <label className="form-label small">Email</label>
              <input
                className="form-control v-form-control"
                type="text"
                value={user.email}
                readOnly
              />
            </div>

            <div className="form-group mb-3">
              <label className="form-label small">Tên hiển thị</label>
              <input
                className="form-control v-form-control"
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
            </div>

            <div className="form-group mb-5">
              <label className="form-label d-block small mb-3">Giới tính</label>
              {["2", "1", "3"].map((g) => (
                <div className="form-check form-check-inline" key={g}>
                  <input
                    className="form-check-input"
                    type="radio"
                    value={g}
                    name="gender"
                    checked={user.gender === g}
                    onChange={(e) =>
                      setUser({ ...user, gender: e.target.value })
                    }
                  />
                  <label className="form-check-label">
                    {g === "2" ? "Nam" : g === "1" ? "Nữ" : "Không xác định"}
                  </label>
                </div>
              ))}
            </div>

            <div className="button-group line-center gap-3">
              <button
                className="btn px-4 btn-primary"
                type="button"
                onClick={() => changeGender(user.gender, user.name)}
              >
                Cập nhật
              </button>
            </div>

            <p className="mt-5">
              Đổi mật khẩu, nhấn vào{" "}
              <a
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => setShowChangePasswordModal(true)}
              >
                đây
              </a>
            </p>
          </form>
        </div>
      </div>

      {/* Modal đổi mật khẩu */}
      {showChangePasswordModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#181a20",
              borderRadius: 12,
              padding: 24,
              width: 380,
              maxWidth: "95%",
              position: "relative",
            }}
          >
            <button
              type="button"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
              }}
              onClick={() => setShowChangePasswordModal(false)}
            >
              <i className="fa-solid fa-times" />
            </button>
            <h4 className="heading-sm text-center mb-4">Đổi mật khẩu</h4>
            <form onSubmit={handleChangePassword}>
              <div className="mb-3">
                <label className="form-label">Mật khẩu mới</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={passwordInput.password}
                  onChange={(e) =>
                    setPasswordInput({
                      ...passwordInput,
                      password: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="form-label">Xác nhận mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  required
                  value={passwordInput.configPassword}
                  onChange={(e) =>
                    setPasswordInput({
                      ...passwordInput,
                      configPassword: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex justify-content-end gap-3">
                <button className="btn btn-sm btn-primary" type="submit">
                  Đổi mật khẩu
                </button>
                <button
                  className="btn btn-sm btn-light"
                  type="button"
                  onClick={() => setShowChangePasswordModal(false)}
                >
                  Đóng
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal đổi avatar */}
      {showAvatarModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#181a20",
              borderRadius: 12,
              padding: 24,
              width: 600,
              maxWidth: "100%",
              height: 500,
              position: "relative",
            }}
          >
            <button
              type="button"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                color: "white",
              }}
              onClick={() => setShowAvatarModal(false)}
            >
              <i className="fa-solid fa-times" />
            </button>
            <h4 className="heading-sm mb-3">Đổi ảnh đại diện</h4>

            {/* Tab header */}
            <div
              className="v-tabs v-tabs-min tab-trans mb-4 nav nav-pills"
              role="tablist"
            >
              {avatarTabs.map((tab, index) => (
                <div key={index} className="nav-item">
                  <div
                    role="tab"
                    aria-selected={activeTab === tab.id}
                    className={`nav-link ${
                      activeTab === tab.id ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.preventDefault(); // Ngăn reload trang
                      setActiveTab(tab.id);
                    }}
                  >
                    {tab.name}
                  </div>
                </div>
              ))}
            </div>

            {/* Tab content */}
            {avatarTabs.map((tab, index) => (
              <div
                key={index}
                className={`${activeTab === tab.id ? "d-block" : "d-none"}`}
              >
                <div className="avatar-list d-flex flex-wrap gap-2">
                  {tab.id === "a-g-99" ? (
                    <div className="w-100">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <label
                          style={{
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "2px dashed #888",
                            borderRadius: 8,
                            height: 120,
                            width: "100%",
                            color: "#fff",
                            fontSize: 24,
                            fontWeight: "bold",
                          }}
                        >
                          +
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleCustomAvatarUpload(file);
                            }}
                            style={{ display: "none" }}
                          />
                        </label>

                        {customAvatar && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <Image
                              src={customAvatar}
                              alt="custom avatar"
                              className="rounded-[6px] object-cover border-[2px] border-[#f2f4f7]"
                              width={100}
                              height={100}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    tab.images.map((img, index) => (
                      <div
                        key={index}
                        style={{
                          border:
                            tempAvatar === img
                              ? "2px solid #edeff1"
                              : "2px solid transparent",
                          borderRadius: 6,
                          padding: 2,
                          cursor: "pointer",
                        }}
                        onClick={() => setTempAvatar(img)}
                      >
                        <Image
                          src={img}
                          alt="avatar"
                          width={50}
                          height={50}
                          style={{ borderRadius: 6 }}
                        />
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 d-flex justify-content-end gap-3">
              <button
                className="btn btn-sm btn-primary"
                onClick={async () => {
                  setUser((u) => ({ ...u, avatar: tempAvatar }));
                  await changeAvatar(tempAvatar);
                  setShowAvatarModal(false);
                }}
              >
                Lưu lại
              </button>
              <button
                className="btn btn-sm btn-light"
                onClick={() => setShowAvatarModal(false)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

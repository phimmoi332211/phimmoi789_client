// import {
//   fetchCreatePlayList,
//   fetchDeletePlayList,
//   fetchPlayListUser,
//   fetchUpdatePlayListName,
//   fetchRemoveFilmPlayList,
// } from "@/help/helper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function PlaylistComponent() {
  const { authUser, setAuthUser } = useAuth();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [listName, setListName] = useState("");
  const [listPlayList, setListPlayList] = useState([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const [editModal, setEditModal] = useState(false);
  const [editPlaylist, setEditPlaylist] = useState<any>(null);
  const [editName, setEditName] = useState("");

  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  useEffect(() => {
    if (authUser) {
      getListPlayUser();
    }
  }, [authUser]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!authUser) {
        toast.warning("Bạn cần đăng nhập để truy cập trang này");
        router.push("/home");
      }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [authUser]);
  const getListPlayUser = async () => {
    if (authUser) {
      try {
        // const res: any = await fetchPlayListUser({ current: 1, pageSize: 30 });
        // const list = res?.data?.result || [];
        // setListPlayList(list);
        // if (list.length > 0 && !selectedId) {
        //   setSelectedId(list[0]._id);
        // }
      } catch (error) {
        toast.error("Lấy danh sách thất bại");
      }
    }
  };

  const createPlaylist = async (title: string) => {
    try {
      // await fetchCreatePlayList({ title });
      toast.success("Tạo danh sách thành công");
      setListName("");
      getListPlayUser();
    } catch (error) {
      toast.error("Tạo danh sách thất bại");
    }
  };

  const openEditModal = (playlist: any) => {
    setEditPlaylist(playlist);
    setEditName(playlist.title || "");
    setEditModal(true);
  };

  const updatePlaylist = async () => {
    if (!editName.trim()) return;
    try {
      // await fetchUpdatePlayListName(editPlaylist._id, {
      //   title: editName.trim(),
      // });
      toast.success("Cập nhật danh sách thành công");
      setEditModal(false);
      getListPlayUser();
    } catch (error) {
      toast.error("Cập nhật danh sách thất bại");
    }
  };

  const confirmDelete = () => {
    setEditModal(false);
    setConfirmDeleteModal(true);
  };

  const deletePlaylist = async () => {
    try {
      // await fetchDeletePlayList(editPlaylist._id);
      toast.success("Xoá danh sách thành công");
      setConfirmDeleteModal(false);
      if (editPlaylist._id === selectedId) setSelectedId(null);
      getListPlayUser();
    } catch (error) {
      toast.error("Xoá danh sách thất bại");
    }
  };

  const removeFilmFromPlaylist = async (
    playlistId: string,
    filmSlug: string
  ) => {
    try {
      // await fetchRemoveFilmPlayList(playlistId, filmSlug);
      toast.success("Đã xoá phim khỏi danh sách");
      getListPlayUser();
    } catch (error) {
      toast.error("Xoá phim thất bại");
    }
  };

  useEffect(() => {
    getListPlayUser();
  }, []);

  const selectedPlaylist = listPlayList.find((p: any) => p._id === selectedId);

  return (
    <div className="cg-body-box py-0 is-list">
      <div className="box-header justify-content-start gap-3 mb-4">
        <div className="heading-sm mb-0">Danh sách</div>
        <a
          className="btn btn-xs btn-rounded btn-outline"
          onClick={() => setShowModal(true)}
        >
          <i className="fa-solid fa-plus small"></i>Thêm mới
        </a>
      </div>

      <div className="dcc-playlist mb-5">
        {listPlayList.map((item: any) => {
          const isActive = item._id === selectedId || item._id === hoveredId;
          return (
            <div
              key={item._id}
              className={`item ${isActive ? "active" : ""}`}
              onClick={() => setSelectedId(item._id)}
              onMouseEnter={() => setHoveredId(item._id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="playlist-name lim-2">{item.title}</div>
              <div className="pl-control line-center d-flex small">
                <div className="added flex-grow-1">
                  <i className="fa-regular fa-circle-play me-1"></i>
                  {item.films?.length || 0} phim
                </div>
                <div
                  className="edit"
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(item);
                  }}
                >
                  <u>Sửa</u>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="box-body">
        <div className="tab-content">
          <div className="tab-pane fade show active">
            <div className="cards-grid-wrapper de-suggest">
              {selectedPlaylist?.films?.map((film: any, idx: number) => (
                <div className="sw-item" key={idx}>
                  <div
                    className="pin-remove"
                    onClick={() =>
                      removeFilmFromPlaylist(selectedPlaylist._id, film.slug)
                    }
                  >
                    <i className="fa-solid fa-times"></i>
                  </div>
                  <Link className="v-thumbnail" href={`/phim/${film.slug}`}>
                    <div className="pin-new m-pin-new">
                      <div className="line-center line-pd">
                        <span></span>
                        <strong>{film.episode_total?.match(/\d+/)?.[0]}</strong>
                      </div>
                      <div className="line-center line-tm">
                        <span></span>
                        <strong>{film.time?.match(/\d+/)?.[0]}</strong>
                      </div>
                    </div>
                    <div>
                      <Image
                        alt={film.title}
                        loading="lazy"
                        src={film.thumb_url}
                        fill
                      />
                    </div>
                  </Link>
                  <div className="info">
                    <h4 className="item-title lim-1">
                      <Link title={film.title} href={`/phim/${film.slug}`}>
                        {film.title}
                      </Link>
                    </h4>
                    <h4 className="alias-title lim-1">
                      <Link
                        title={film.name_english}
                        href={`/phim/${film.slug}`}
                      >
                        {film.name_english}
                      </Link>
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal thêm playlist */}
      {showModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fade v-modal modal-xs modal show"
          tabIndex={-1}
          style={{ display: "block", paddingRight: "15px" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <button
                className="btn modal-close"
                onClick={() => setShowModal(false)}
              >
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
                  value={listName}
                  onChange={(e) => setListName(e.target.value)}
                />
              </div>
              <div className="is-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => {
                    if (listName.trim()) {
                      createPlaylist(listName);
                      setShowModal(false);
                    }
                  }}
                >
                  <i className="fa-solid fa-plus small"></i>Thêm
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-light px-4"
                  onClick={() => setShowModal(false)}
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal sửa playlist */}
      {editModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fade v-modal modal-xs modal show"
          tabIndex={-1}
          style={{ display: "block", paddingRight: "15px" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <button
                className="btn modal-close"
                onClick={() => setEditModal(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <div className="is-header mb-3">
                <h4 className="heading-xs mb-0">Cập nhật Playlist</h4>
              </div>
              <div className="is-body mb-4">
                <div className="form-w-icon">
                  <div className="fa-solid fa-pen icon"></div>
                  <input
                    className="form-control v-form-control"
                    placeholder="Tên danh sách"
                    maxLength={20}
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                </div>
              </div>
              <div className="is-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={updatePlaylist}
                >
                  <i className="fa-solid fa-check small"></i>Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={confirmDelete}
                >
                  <i className="fa-solid fa-trash small"></i>Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal xác nhận xoá */}
      {confirmDeleteModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fade v-modal modal-xs modal show"
          tabIndex={-1}
          style={{ display: "block", paddingRight: "15px" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <button
                className="btn modal-close"
                onClick={() => setConfirmDeleteModal(false)}
              >
                <i className="fa-solid fa-times"></i>
              </button>
              <div className="is-header mb-3">
                <h4 className="heading-xs mb-0">Xác nhận xoá</h4>
              </div>
              <div className="is-body mb-4">
                Bạn có chắc chắn muốn xoá playlist{" "}
                <strong>{editPlaylist?.title}</strong> không?
              </div>
              <div className="is-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-light px-4"
                  onClick={() => setConfirmDeleteModal(false)}
                >
                  Huỷ
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={deletePlaylist}
                >
                  <i className="fa-solid fa-trash small"></i> Xác nhận xoá
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

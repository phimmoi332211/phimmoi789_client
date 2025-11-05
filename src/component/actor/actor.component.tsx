"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { fetchActors } from "@/help/helper";
import { ApiResponse } from "@/types/response/api.response";
import Loading from "@/component/lazyLoading/loading.component";
import { NAVIGATION } from "@/ultis/ultis";
import ReactPaginate from "react-paginate";
import { Actor } from "@/types/model/actor.d";

interface Pagination {
  current: number;
  pageSize: number;
  pages: number;
  totalPages: number;
}

interface Props {
  actor: ApiResponse<Actor[]>;
  totalPage: number;
}

const Actors = ({ actor, totalPage }: Props) => {
  const [data, setData] = useState<ApiResponse<Actor[]> | null>(actor);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const mountedRef = useRef(true);

  const [pagination, setPaginate] = useState<Pagination>({
    current: 1,
    pageSize: 40,
    pages: totalPage || 1,
    totalPages: 1,
  });

  // Detect mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Cleanup effect to prevent state updates on unmounted component
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Fetch actors when pagination.current changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchActors({
          current: pagination.current,
          pageSize: pagination.pageSize,
        });
        if (!mountedRef.current) return;
        setData(res as ApiResponse<Actor[]>);
        const data = res as ApiResponse<Actor[]>;
        setPaginate((prev) => ({
          ...prev,
          pageSize: data.data.meta.pageSize,
          current: data.data.meta.current,
          pages: data.data.meta.pages,
          totalPages: data.data.meta.total,
        }));
      } catch (error) {
        console.error("Failed to fetch actors:", error);
      } finally {
        if (mountedRef.current) {
          setIsLoading(false);
        }
      }
    };
    // Đừng fetch lần đầu nếu đã có sẵn data từ props
    if (pagination.current !== 1) fetchData();
    // Nếu props data là null thì fetch luôn
    if (pagination.current === 1 && !data) fetchData();
    // eslint-disable-next-line
  }, [pagination.current]);

  const actors: any = data?.data?.result || [];

  return (
    <div id="wrapper">
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="row-header">
            <h3 className="category-name">Diễn viên</h3>
          </div>
          {/* Loading overlay */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="row-content relative">
              <div
                className={`actors-grid-wrapper ${
                  isLoading ? "opacity-40 pointer-events-none" : ""
                }`}
              >
                {actors?.map((actor, index) => (
                  <div key={index} className="item-actor">
                    <div className="v-item">
                      <Link
                        className="v-actor v-actor-large"
                        href={`/dien-vien/${actor?.url}`}
                      >
                        <Image
                          alt={actor?.name || "actor"}
                          src={actor?.profile_path || "/default-avatar.jpg"}
                          width={150}
                          height={225}
                          className="object-cover"
                          onError={(e: any) => {
                            if (
                              e?.currentTarget?.src !== "/default-avatar.jpg"
                            ) {
                              e.currentTarget.src = "/default-avatar.jpg";
                            }
                          }}
                          unoptimized
                        />
                      </Link>
                      <div className="info">
                        <h4 className="item-title lim-2">
                          <Link
                            title={actor?.name}
                            href={`/dien-vien/${actor?.slug}`}
                          >
                            {actor?.name}
                          </Link>
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* Pagination */}
          <div className="v-pagination line-center mt-8">
            {isMobile ? (
              <div className="mobile-pagination flex items-center justify-center gap-3 py-3">
                <button
                  type="button"
                  className="btn btn-circle btn-lg btn-secondary"
                  onClick={() => {
                    if (pagination.current > 1) {
                      setPaginate((prev) => ({
                        ...prev,
                        current: prev.current - 1,
                      }));
                    }
                  }}
                  disabled={pagination.current === 1 || isLoading}
                >
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
                <span className="text-base font-semibold">
                  {pagination.current}/{pagination.pages}
                </span>
                <button
                  type="button"
                  className="btn btn-circle btn-lg btn-secondary"
                  onClick={() => {
                    if (pagination.current < pagination.pages) {
                      setPaginate((prev) => ({
                        ...prev,
                        current: prev.current + 1,
                      }));
                    }
                  }}
                  disabled={
                    pagination.current === pagination.pages || isLoading
                  }
                >
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            ) : (
              <ReactPaginate
                forcePage={pagination.current - 1}
                pageCount={Math.ceil(pagination.pages ?? 1)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={3}
                renderOnZeroPageCount={null}
                onPageChange={({ selected }) => {
                  setPaginate((prev) => ({
                    ...prev,
                    current: selected + 1,
                  }));
                }}
                previousLabel={
                  <button
                    type="button"
                    className="btn btn-circle btn-lg btn-secondary"
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-arrow-left"></i>
                  </button>
                }
                breakLabel={"..."}
                nextLabel={
                  <button
                    type="button"
                    className="btn btn-circle btn-lg btn-secondary"
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                }
                activeLinkClassName={"current"}
                previousClassName="group"
                nextClassName="group"
                pageLinkClassName="page-current line-center"
                containerClassName="page-control line-center"
                disabledClassName="opacity-50 cursor-not-allowed"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actors;

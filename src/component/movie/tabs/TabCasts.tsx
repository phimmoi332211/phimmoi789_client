"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { MovieData } from "@/types/detail";

interface TabCastsProps {
  movieData: MovieData;
}

const TabCasts: React.FC<TabCastsProps> = ({ movieData }) => {
  if (!movieData.actors || movieData.actors.length === 0) {
    return (
      <div className="box">
        <div className="box-header">
          <h2 className="title">Diễn viên</h2>
        </div>
        <div className="box-body">
          <div className="de-actors">
            <p className="text-center text-gray-500 py-4">
              Chưa có thông tin diễn viên
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="box">
      <div className="box-header">
        <h2 className="title">Diễn viên</h2>
      </div>
      <div className="box-body">
        <div className="de-actors">
          {movieData.actors.map((actor) => {
            const imageSrc =
              actor?.profile_path && actor.profile_path.trim() !== ""
                ? actor.profile_path
                : "/default-avatar.jpg";
            const actorSlug =
              actor?.slug && actor.slug.trim() !== "" ? actor.slug : "#";
            return (
              <div key={actorSlug || actor.name} className="item-actor">
                <div className="v-item">
                  <Link
                    href={actorSlug === "#" ? "#" : `/actor/${actorSlug}`}
                    className="v-actor"
                  >
                    <div className="v-actor-img">
                      <Image
                        src={imageSrc}
                        alt={actor.name}
                        width={80}
                        height={80}
                        unoptimized
                      />
                    </div>
                    <div className="v-actor-info">
                      <h3 className="v-actor-name">{actor.name}</h3>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabCasts;

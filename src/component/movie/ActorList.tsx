"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Actor } from "@/types/detail";

interface ActorListProps {
  actors: Actor[];
}

export default function ActorList({ actors }: ActorListProps) {
  if (!actors || actors.length === 0) {
    return null;
  }

  return (
    <div className="ws-actors">
      <div className="child-box child-actors">
        <div className="child-header">Diễn viên</div>
        <div className="child-actors-list">
          {actors.map((actor) => {
            const imageSrc =
              actor?.url && actor.url.trim() !== ""
                ? actor.url
                : "/default-avatar.jpg";
            const actorSlug =
              actor?.url && actor.url.trim() !== "" ? actor.url : "#";
            return (
              <div key={actorSlug || actor.name} className="v-item">
                <Link
                  className="v-actor v-actor-medium"
                  href={actorSlug === "#" ? "#" : `/dien-vien/${actorSlug}`}
                >
                  <Image
                    alt={actor.name}
                    src={imageSrc}
                    width={500}
                    height={500}
                    loading="lazy"
                    unoptimized
                  />
                </Link>
                <div className="info">
                  <h4 className="item-title lim-2">
                    <Link
                      href={actorSlug === "#" ? "#" : `/dien-vien/${actorSlug}`}
                    >
                      {actor.name}
                    </Link>
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

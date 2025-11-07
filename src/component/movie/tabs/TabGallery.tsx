"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MovieData } from "@/types/detail";

interface TabGalleryProps {
  movieData: MovieData;
}

export default function TabGallery({ movieData }: TabGalleryProps) {
  const videos = movieData?.videos || [];
  const images = movieData?.images || [];

  return (
    <div className="cg-body-box is-gallery">
      <div className="box-body">
        <div className="heading-sm mb-3">Videos</div>
        {videos.length > 0 ? (
          <div className="videos-grid">
            {videos.map((video) => (
              <Link key={video.id} href={video.url} className="media-item">
                <Image 
                  alt={video.title || 'Video thumbnail'} 
                  src={video.thumbnail || video.url} 
                  width={300} 
                  height={169} 
                  className="w-full h-auto object-cover"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="v-notice mb-3">
            <div className="inc-icon icon-notice">
              <Image src="/images/icons/empty-box.svg" alt="Empty box" width={24} height={24} />
            </div>
            <p className="mb-0">Chưa có video nào</p>
          </div>
        )}

        <div className="heading-sm mb-3">Ảnh</div>
        {images.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" id="image-gallery">
            {images.map((image, index) => (
              <Link key={index} href={image.url} className="media-item block relative aspect-[2/3] overflow-hidden rounded-lg">
                <Image 
                  alt={image.title || `Image ${index}`} 
                  src={image.url} 
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="v-notice">
            <div className="inc-icon icon-notice">
              <Image src="/images/icons/empty-box.svg" alt="Empty box" width={24} height={24} />
            </div>
            <p className="mb-0">Chưa có ảnh nào</p>
          </div>
        )}
      </div>
    </div>
  );
} 
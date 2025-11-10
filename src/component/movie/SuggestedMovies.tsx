"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SimilarMovies } from '@/types/detail';

interface SuggestedMoviesProps {
  movies: SimilarMovies[];
}

export default function SuggestedMovies({ movies }: SuggestedMoviesProps) {
  if (!movies || movies.length === 0) {
    return null;
  }
  
  return (
    <div className="ws-top">
      <div className="child-box child-suggest">
        <div className="child-header">
          <span>Đề xuất cho bạn</span>
        </div>
        <div className="child-content">
          <div className="cc-top">
            {movies && movies.length > 0 && movies.map((movie, index) => (
              <div key={index} className="item">
                <div className="h-item">
                  <div className="v-thumb-m">
                    <Link className="v-thumbnail" href={`/phim/${movie.slug}`}>
                      <Image 
                        alt={movie?.featuredImage?.alt || "default-avatar"}
                        src={movie?.featuredImage?.url ||"/default-avatar.jpg"}
                        width={300}
                        height={450}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="info">
                    <h4 className="item-title lim-2">
                      <Link title={movie.title} href={`/phim/${movie.slug}`}>
                        {movie.title}
                      </Link>
                    </h4>
                    <div className="alias-title mb-2 lim-1">{movie.movieData.origin_name}</div>
                    <div className="info-line">
                      <div className="tag-small">{movie.movieData.hashtag ? 'Vietsub' : 'Thuyết minh'}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
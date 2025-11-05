"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { TopMovie } from '@/types/detail';

interface SuggestedMoviesProps {
  movies: TopMovie[];
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
            {movies.map((movie) => (
              <div key={movie.id} className="item">
                <div className="h-item">
                  <div className="v-thumb-m">
                    <Link className="v-thumbnail" href={`/phim/${movie.id}`}>
                      <Image 
                        alt={movie.title}
                        src={movie.image}
                        width={300}
                        height={450}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="info">
                    <h4 className="item-title lim-2">
                      <Link title={movie.title} href={`/phim/${movie.id}`}>
                        {movie.title}
                      </Link>
                    </h4>
                    <div className="alias-title mb-2 lim-1">{movie.alias}</div>
                    <div className="info-line">
                      <div className="tag-small">{movie.hasSubtitle ? 'Vietsub' : 'Thuyết minh'}</div>
                      {movie.episodes > 0 && <div className="tag-small">{movie.episodes} tập</div>}
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
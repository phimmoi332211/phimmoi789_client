"use client";
import { FavoriteMovies } from "./FavoriteMovies";
import { HotMovies } from "./HotMovies";
import { HotType } from "./HotType";
import NewComments from "./NewComments";
import { TopComments } from "./TopComments";

export const Community = () => {

  return (
    <div id="community" className="effect-fade-in">
      <div className="cards-row wide">
        <div className="row-content">
          <div className="comm-wrap">
            <TopComments />
            <div className="irt-table">
              <HotMovies />
              <FavoriteMovies />
              <HotType />
              <NewComments />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

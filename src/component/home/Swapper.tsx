import React from "react";
import Link from "next/link";

export interface Topic {
  id: string;
  title: string;
  href: string;
  backgroundColor: string;
}

interface TopicGridProps {
  topics: Topic[];
}

const TopicGrid: React.FC<TopicGridProps> = ({ topics }) => {
  return (
    <div id="wrapper" className="wrapper-w-slide">
      <div className="fluid-gap">
        <div className="cards-row wide">
          <div className="row-header">
            <h1 className="category-name">Bạn đang quan tâm gì?</h1>
          </div>
          <div className="row-content">
            <div className="topics-list topics-grid">
              {topics.map((topic: Topic) => (
                <Link key={topic.id} className="row-topic" href={topic.href}>
                  <div
                    className="mask"
                    style={{ backgroundColor: topic.backgroundColor }}
                  ></div>
                  <div className="intro">
                    <div className="heading-md lim-2 mb-0">{topic.title}</div>
                    <div className="info">
                      <div className="btn btn-sm btn-outline">
                        <span>Xem toàn bộ</span>
                        <i className="fa-solid fa-angle-right"></i>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicGrid;

import React from "react";

export default function TabSwitcher({ activeTab, onChangeTab }: any) {
  return (
    <div className="model-tabs actor-tabs">
      <button 
        className={`item ${activeTab === 'comments' ? 'active' : ''}`} 
        onClick={() => onChangeTab('comments')}
      >
        Bình luận
      </button>
      <button 
        className={`item ${activeTab === 'reviews' ? 'active' : ''}`} 
        onClick={() => onChangeTab('reviews')}
      >
        Đánh giá
      </button>
    </div>
  );
} 
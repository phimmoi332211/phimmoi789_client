import React from "react";
import Image from "next/image";
import ToggleSwitch from "../ToggleSwitch";

// Array mapping điểm đánh giá sang emoji và text
const ratingEmojis = [
  { point: 5, emoji: "😍", text: "Tuyệt vời" },
  { point: 4, emoji: "😊", text: "Phim hay" },
  { point: 3, emoji: "🙂", text: "Khá ổn" },
  { point: 2, emoji: "😕", text: "Phim chán" },
  { point: 1, emoji: "😡", text: "Dở tệ" },
];

// Function kiểm tra URL ảnh hợp lệ
const isValidImageUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();
    
    // Kiểm tra đuôi file ảnh
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
    const hasValidExtension = imageExtensions.some(ext => pathname.endsWith(ext));
    
    return hasValidExtension;
  } catch {
    return false;
  }
};

export default function CommentItem({
  item,
  activeTab,
  authUser,
  newCommentId,
  replyContents,
  replySubmitting,
  onReplyClick,
  onReplyChange,
  onReplySubmit,
  onVote,
  onToggleReplies,
  isSpoiler,
  setIsSpoiler,
  votedComments
}: any) {
  // Tìm emoji và text tương ứng với điểm đánh giá
  const foundRating = ratingEmojis.find(e => e.point === Number(item.rating));
  return (
    <div 
      key={item.id} 
      className={`d-item ${item.isPinned ? 'd-item-pin' : ''} ${item.id === newCommentId ? 'animate-new-comment' : ''}`}
    >
      <div className="user-avatar">
        {item.avatar && isValidImageUrl(item.avatar) ? (
          <Image src={item.avatar} alt="User avatar" width={40} height={40} />
        ) : (
          <div className="user-avatar-default">
            <i className="fa-solid fa-user-circle"></i>
          </div>
        )}
      </div>
      <div className="info">
        {item.isPinned && (
          <div className="stick">
            <div className="line-center">
              <i className="fa-solid fa-thumbtack"></i>
              <span>Ghim bởi Rổ</span>
            </div>
          </div>
        )}
        <div className="comment-header">
          {activeTab === 'reviews' && (
            <div className="rated">
              {foundRating ? (
                <>
                  <span>{foundRating.emoji}</span>
                {foundRating.text}
                </>
              ) : (
                <>
                  <span>{item.ratingEmoji}</span>
                  {item.rating}
                </>
              )}
            </div>
          )}
          <div className={`user-name line-center ${item.isAdmin ? 'gr-admin' : ''}`}>
            {item.isAdmin && <div className="gr-tag">Admin</div>}
            <span>{item.userName} <i className="fa-solid fa-infinity text-primary ms-2"></i></span>
          </div>
          <div className="ch-logs">
            <div className="c-time">{item.time}</div>
            {/* {item.replies && item.replies.length > 0 && (
              <span className="ch-for">P.{item.id}<span>{item.replies.length}</span></span>
            )} */}
          </div>
        </div>
        <div className="text">
          <span>{item.content}</span>
        </div>
        <div className="comment-bottom line-center d-flex">
          <div className="group-react line-center">
              <button 
                className={`item item-up line-center${votedComments?.[item.id] === 'up' ? ' active' : ''}`}
                onClick={() => onVote(item.id, 'up')}
              >
              <i className="fa-solid fa-circle-up"></i>
                <span>{item.upvotes}</span>
              </button>
              <button 
                className={`item item-down line-center${votedComments?.[item.id] === 'down' ? ' active' : ''}`}
                onClick={() => onVote(item.id, 'down')}
              >
              <i className="fa-solid fa-circle-down"></i>
                <span>{item.downvotes}</span>
              </button>
          </div>
          <button 
            type="button" 
            className="btn btn-xs btn-basic btn-comment"
            onClick={() => onReplyClick(item.id)}
          >
            <i className="fa-solid fa-reply"></i>
            <span>Trả lời</span>
          </button>
          <div className="dropdown">
            {/* <button type="button" className="btn btn-xs btn-basic btn-menu">
              <i className="fa-solid fa-ellipsis"></i>
              <span>Thêm</span>
            </button> */}
          </div>
        </div>
        {item.showReplyForm && (
          <div className="my-area my-area-sub reply-active">
            <div className="textarea-wrap">
              <div className="ma-input">
                <textarea 
                  className="form-control v-form-control v-form-textarea" 
                  rows={4} 
                  cols={3} 
                  maxLength={1000} 
                  placeholder="Viết trả lời"
                  value={replyContents[item.id] || ""}
                  onChange={(e) => onReplyChange(item.id, e.target.value)}
                  readOnly={!authUser || replySubmitting[item.id]}
                />
                <div className="chac-left">{(replyContents[item.id] || "").length} / 1000</div>
              </div>
              <div className="line-center d-flex gap-3 ma-buttons">
                {/* <div className="v-toggle v-toggle-min line-center">
                  <ToggleSwitch 
                    id={`spoil-toggle-${item.id}`}
                    defaultState={false}
                    onChange={setIsSpoiler}
                  />
                  <div className="text">Tiết lộ?</div>
                </div> */}
                <div className="flex-grow-1"></div>
                <button 
                  className="btn btn-basic btn-submit" 
                  type="button"
                  onClick={() => onReplySubmit(item.id)}
                  disabled={!authUser || !replyContents[item.id]?.trim() || replySubmitting[item.id]}
                >
                  {replySubmitting[item.id] ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <span>Gửi</span>
                      <div className="inc-icon icon-20 ms-1">
                        <svg fill="none" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg">
                          <path d="m22.1012 10.5616-19.34831-9.43824c-.1664-.08117-.34912-.12336-.53427-.12336-.67302 0-1.21862.5456-1.21862 1.21862v.03517c0 .16352.02005.32643.05971.48507l1.85597 7.42384c.05069.2028.22214.3526.42986.3757l8.15756.9064c.2829.0314.4969.2705.4969.5552s-.214.5238-.4969.5552l-8.15756.9064c-.20772.0231-.37917.1729-.42986.3757l-1.85597 7.4238c-.03966.1587-.05971.3216-.05971.4851v.0352c0 .673.5456 1.2186 1.21862 1.2186.18515 0 .36787-.0422.53427-.1234l19.34831-9.4382c.5499-.2682.8988-.8265.8988-1.4384s-.3489-1.1702-.8988-1.4384z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
        {item.replies && item.replies.length > 0 && (
          <div className="replies-wrap">
            <button 
              className="text-primary replies-toggle"
              onClick={() => onToggleReplies(item.id)}
            >
              <i className={`fa-solid fa-angle-${item.showReplies ? 'up' : 'down'} me-1`}></i>
              {item.replies.length} bình luận
            </button>
            {item.showReplies && (
              <div className="replies-list">
                {item.replies.map((reply: any, index) => (
                  <div key={index} className="d-item">
                    <div className="user-avatar">
                      {reply.avatar && isValidImageUrl(reply.avatar) ? (
                        <Image src={reply.avatar} alt="User avatar" width={40} height={40} />
                      ) : (
                        <div className="user-avatar-default">
                          <i className="fa-solid fa-user-circle"></i>
                        </div>
                      )}
                    </div>
                    <div className="info">
                      <div className="comment-header">
                        <div className="user-name line-center">
                          <span>{reply.userName} <i className="fa-solid fa-infinity text-primary ms-2"></i></span>
                        </div>
                        <div className="ch-logs">
                          <div className="c-time">{reply.time}</div>
                        </div>
                      </div>
                      <div className="text">
                        <span className="rep-sub">@{reply.replyToName}</span> <span>{reply.content}</span>
                      </div>
                      <div className="comment-bottom line-center d-flex">
                        <div className="group-react line-center">
                            <button 
                              className={`item item-up line-center${votedComments?.[reply.id] === 'up' ? ' active' : ''}`}
                              onClick={() => onVote(reply.id, 'up')}
                            >
                            <i className="fa-solid fa-circle-up"></i>
                              <span>{reply.upvotes}</span>
                            </button>
                            <button 
                              className={`item item-down line-center${votedComments?.[reply.id] === 'down' ? ' active' : ''}`}
                              onClick={() => onVote(reply.id, 'down')}
                            >
                            <i className="fa-solid fa-circle-down"></i>
                              <span>{reply.downvotes}</span>
                            </button>
                        </div>
                        <button 
                          type="button" 
                          className="btn btn-xs btn-basic btn-comment"
                          onClick={() => onReplyClick(item.id)}
                        >
                          <i className="fa-solid fa-reply"></i>
                          <span>Trả lời</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 
import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({
  items,
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
  return (
    <div className="discuss-list">
      {items.map((item: any, index) => (
        <CommentItem
          key={index}
          item={item}
          activeTab={activeTab}
          authUser={authUser}
          newCommentId={newCommentId}
          replyContents={replyContents}
          replySubmitting={replySubmitting}
          onReplyClick={onReplyClick}
          onReplyChange={onReplyChange}
          onReplySubmit={onReplySubmit}
          onVote={onVote}
          onToggleReplies={onToggleReplies}
          isSpoiler={isSpoiler}
          setIsSpoiler={setIsSpoiler}
          votedComments={votedComments}
        />
      ))}
    </div>
  );
} 
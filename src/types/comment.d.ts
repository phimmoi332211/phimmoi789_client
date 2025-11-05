export interface CommentUser {
  _id: string;
  name: string;
  email: string;
}

export interface CommentReply {
  _id: string;
  content: string;
  user: CommentUser;
  film: string;
  parent: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: CommentUser;
  film: string;
  parent: string | null;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
  replies: CommentReply[];
}

export interface CommentResponse {
  statusCode: number;
  message: string;
  data: {
    statusCode: number;
    message: string;
    data: Comment[];
  };
} 
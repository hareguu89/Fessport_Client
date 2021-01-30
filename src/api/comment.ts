import axios from 'axios';

// ----------- Get Comment list
export async function getCommentData(
  boardId: string,
): Promise<CommentDataRes | void> {
  const response = await axios.get<CommentDataRes>(
    `https://fessport-server.com/comment/list?boardId=${boardId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface CommentDataRes {
  _id: string;
  description: string;
  user: user;
  createdAt: Date;
  updatedAt: Date;
}

interface user {
  _id: string;
  nickname: string;
}

// ------------- Post Comment -------------
export async function postCommentData(
  param: CommentRequest,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    'https://fessport-server.com/comment/post',
    param.commentData,
    {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${param.accessToken}`,
      },
    },
  );
  return response.data;
}

export interface CommentRequest {
  commentData: CommentInfo;
  accessToken: string;
}

interface CommentInfo {
  boardId: string;
  description: string;
}

export interface Imessage {
  message: string;
}

// ------------- delete Comment -------------
export async function deleteCommentData(
  param: CommentDelete,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    'https://fessport-server.com/comment/delete',
    param.commentData,
    {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${param.accessToken}`,
      },
    },
  );
  return response.data;
}

export interface CommentDelete {
  commentData: Comment;
  accessToken: string;
}

interface Comment {
  commentId: string;
}

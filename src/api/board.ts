import axios from 'axios';
import participant from '../modules/participant/reducer';

// ----------- Get Board list
export async function getBoardData(
  boardId: string,
): Promise<BoardDataRes[] | void> {
  const response = await axios.get<BoardDataRes[]>(
    `/board/list?boardCategoryId=${boardId}`,
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface BoardDataRes {
  _id: string;
  title: string;
  description: string;
  image: string;
  user: BoardUser;
  festival: BoardFestival;
  createdAt: Date;
  updatedAt: Date;
  comments: comment[] | null;
  participants: participantlist[] | null;
}

export interface comment {
  _id: string;
  nickName: string;
  description: string;
}

export interface participantlist {
  _id: string;
  nickName: string;
}

export interface BoardUser {
  _id: string;
  image: string;
  nickName: string;
}

export interface BoardFestival {
  _id: string;
  name: string;
}

// ------------- Post & Edit Board -------------
export async function postBoardData(
  param: BoardRequest,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    '/board/create',
    param.postBoardData,
    {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${param.accessToken}`,
      },
    },
  );
  return response.data;
}

export interface BoardRequest {
  postBoardData: BoardInfo;
  accessToken: string;
}

interface BoardInfo {
  festivalId: string;
  boardCategoryId: string;
  title: string;
  description: string;
  Image: string | null;
}

export interface Imessage {
  message: string;
}

// ------------- delete Board -------------
export async function deleteBoardData(
  param: BoardDelete,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    '/board/delete',
    param.postBoardData,
    {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${param.accessToken}`,
      },
    },
  );
  return response.data;
}

export interface BoardDelete {
  postBoardData: Board;
  accessToken: string;
}

interface Board {
  boardId: string;
}

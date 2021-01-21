import axios from 'axios';

export async function getUserInfo(
  accessToken: string,
): Promise<IUserInfo | void> {
  const response = await axios.get<IUserInfo>('/myFessport', {
    withCredentials: true,
    headers: {
      Authorization: `bearer ${accessToken}`,
    },
  });
  return response.data;
}

export async function postUserInfo(param: IParam): Promise<Imessage | void> {
  const response = await axios.post<Imessage>('/edit', param.editUserInfo, {
    withCredentials: true,
    headers: {
      Authorization: `bearer ${param.accessToken}`,
    },
  });
  return response.data;
}

export interface IUserInfo {
  id: number;
  nickName: string | null;
  email: string;
  image: string | null;
  visit: IVisit[] | null;
  badge: IBadge[] | null;
}

export interface IVisit {
  id: number;
  image: string;
}

export interface IBadge {
  id: number;
  name: string;
  image: string;
  get: boolean;
}

export interface IParam {
  editUserInfo: IEditUserInfo;
  accessToken: string;
}

interface IEditUserInfo {
  nickName: string | null | undefined;
  password: string | null;
  image: string | null | undefined;
}

export interface Imessage {
  message: string;
}

import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getUserInfo(): Promise<IUserInfo | void> {
  const response = await axios.get<IUserInfo>(
    'https://fessport-server.com/user/myFessport',
  );
  return response.data;
}

export async function patchUserInfo(
  editUesrInfo: IEditUserInfo,
): Promise<{ message: string } | void> {
  const response = await axios.patch<{ message: string }>(
    'https://fessport-server.com/user/edit',
    editUesrInfo,
  );
  return response.data;
}

export interface IUserInfo {
  _id: string;
  nickName: string | null;
  email: string;
  image: string | null;
  visit: IVisit[] | null;
  badge: IBadge[] | null;
}

export interface IVisit {
  _id: string;
  image: string;
}

export interface IBadge {
  _id: string;
  name: string;
  image: string;
  get: boolean;
}

export interface IEditUserInfo {
  nickName: string | null | undefined;
  password: string | null;
  image: string | null | undefined;
}

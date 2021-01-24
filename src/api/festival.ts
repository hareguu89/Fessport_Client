import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getFestivalList(
  query: string,
): Promise<IFestivalList[] | void> {
  const response = await axios.get<IFestivalList[]>(`/festivalList?${query}`);
  return response.data;
}

export async function getFestivalDetail(
  _id: string,
): Promise<IFestivalDetail | void> {
  const response = await axios.get<IFestivalDetail>(`/festivalDetail/${_id}`);
  return response.data;
}

export interface IFestivalList {
  _id: string;
  total: number;
  name: string;
  poster: string;
  country: {
    _id: string;
    name: string;
  };
  genre: {
    _id: string;
    genre: string;
  };
}

export interface IFestivalDetail {
  _id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  video: string;
  poster: string;
  homepage: string;
  visited: boolean;
  isLiked: boolean;
  genre: {
    _id: string;
    genre: string;
  };
  country: {
    _id: string;
    name: string;
    flagImage: string;
  };
  artists: {
    _id: string;
    name: string;
    image: string;
  }[];
  companions: {
    _id: string;
    title: string;
  }[];
  reviews: {
    _id: string;
    userName: string;
    title: string;
    image: string;
  }[];
  resells: {
    _id: string;
    title: string;
  }[];
}

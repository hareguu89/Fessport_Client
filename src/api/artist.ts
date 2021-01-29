import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getArtistList(
  query: string,
): Promise<IArtistList[] | void> {
  const response = await axios.get<IArtistList[]>(`/artistList?${query}`);
  return response.data;
}

export async function getArtistDetail(
  _id: string,
): Promise<IArtistDetail | void> {
  const response = await axios.get<IArtistDetail>(`/artistDetail`);
  return response.data;
}

export async function postLikeArtist(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/like`, {
    artistId: _id,
  });
  return response.data;
}

export async function postDislikeArtist(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/dislike`, {
    artistId: _id,
  });
  return response.data;
}

export interface IArtistList {
  _id: string;
  total: number;
  name: string;
  image: string;
  description: string;
  genre: {
    _id: string;
    name: string;
  };
}

export interface IArtistDetail {
  _id: string;
  name: string;
  image: string;
  description: string;
  genre: {
    _id: string;
    name: string;
  };
  video: string[];
  isLiked: boolean;
  festivals: {
    _id: string;
    name: string;
    poster: string;
  }[];
}

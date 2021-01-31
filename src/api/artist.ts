import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getArtistList(
  query: string,
): Promise<IArtistList[] | void> {
  const response = await axios.get<IArtistList[]>(
    `https://fessport-server.com/artist/list?${query}`,
  );
  return response.data;
}

export async function getArtistDetail(
  _id: string,
): Promise<IArtistDetail | void> {
  const response = await axios.get<IArtistDetail>(
    `https://fessport-server.com/artist/detail/${_id}`,
  );
  return response.data;
}

export async function postLikeArtist(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(
    `https://fessport-server.com/like/artist`,
    {
      artistId: _id,
    },
  );
  return response.data;
}

export async function postDislikeArtist(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(
    `https://fessport-server.com/dislike/artist`,
    {
      artistId: _id,
    },
  );
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

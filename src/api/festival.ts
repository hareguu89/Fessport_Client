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
  const response = await axios.get<IFestivalDetail>(`/festivalDetail`);
  return response.data;
}

export async function postVisitedFestival(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/visit`, {
    festivalId: _id,
  });
  return response.data;
}

export async function postUnvisitedFestival(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/unvisited`, {
    festivalId: _id,
  });
  return response.data;
}

export async function postLikeFestival(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/like`, {
    festivalId: _id,
  });
  return response.data;
}

export async function postDislikeFestival(
  _id: string,
): Promise<{ message: string } | void> {
  const response = await axios.post<{ message: string }>(`/dislike`, {
    festivalId: _id,
  });
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
  video: string[];
  poster: string;
  homepage: string;
  visited: boolean;
  isLiked: boolean;
  genre: {
    _id: string;
    name: string;
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
    user: {
      _id: string;
      nickname: string;
    };
    image: string;
  }[];
  reviews: {
    _id: string;
    title: string;
    user: {
      _id: string;
      nickname: string;
    };
    image: string;
  }[];
  resells: {
    _id: string;
    title: string;
    user: {
      _id: string;
      nickname: string;
    };
    image: string;
  }[];
}

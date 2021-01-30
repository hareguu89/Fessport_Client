import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getWishList(): Promise<IWish | void> {
  const response = await axios.get<IWish>(`/wish`);
  return response.data;
}

export interface IWish {
  _id: string;
  wishfestivals: {
    _id: string;
    name: string;
    poster: string;
  }[];
  wishArtist: {
    _id: string;
    name: string;
    image: string;
  }[];
}

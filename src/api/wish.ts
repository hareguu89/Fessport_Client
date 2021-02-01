import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getWishList(): Promise<IWish | void> {
  const response = await axios.get<IWish>(
    `https://fessport-server.com/user/myWishlist`,
  );
  return response.data;
}

// export async function getWishList(): Promise<IWish | void> {
//   const response = await axios.get<IWish>(`/wish`);
//   return response.data;
// }

export interface IWish {
  _id: string;
  wishFestivals: {
    _id: string;
    name: string;
    poster: string;
  }[];
  wishArtists: {
    _id: string;
    name: string;
    image: string;
  }[];
}

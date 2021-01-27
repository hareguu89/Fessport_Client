import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getCountryCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(`/countryCategory`);
  return response.data;
}

export async function getGenreCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(`/genreCategory`);
  return response.data;
}

export async function getFestivalCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(`/festivalCategory`);
  return response.data;
}

export async function getArtistCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(`/artistCategory`);
  return response.data;
}

export interface ICategory {
  _id: string;
  name: string;
}

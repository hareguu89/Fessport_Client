import axios from 'axios';
axios.defaults.withCredentials = true;

export async function getCountryCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(
    `https://fessport-server.com/category/country`,
  );
  return response.data;
}

export async function getGenreCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(
    `https://fessport-server.com/category/genre`,
  );
  return response.data;
}

export async function getFestivalCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(
    `https://fessport-server.com/category/festival`,
  );
  return response.data;
}

export async function getArtistCategory(): Promise<ICategory[] | void> {
  const response = await axios.get<ICategory[]>(
    `https://fessport-server.com/category/artist`,
  );
  return response.data;
}

export interface ICategory {
  _id: string;
  name: string;
}

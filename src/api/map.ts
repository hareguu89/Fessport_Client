import axios from 'axios';

export async function getMapData(): Promise<IMap[] | void> {
  const response = await axios.get<IMap[]>('/map');
  return response.data;
}

export interface IMap {
  id: number;
  name: string;
  y: number;
  x: number;
  flagImage: string;
  festival: IFestival[];
}

interface IFestival {
  id: number;
  name: string;
  thumbnail: string;
}

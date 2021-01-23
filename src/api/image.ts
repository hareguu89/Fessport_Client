import axios from 'axios';

export async function postImage(image: FormData): Promise<IImage | void> {
  const response = await axios.post<IImage>(
    '/imgUpload',
    { image },
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface IImage {
  image: string;
}

import axios from 'axios';
axios.defaults.withCredentials = true;

export async function postImage(
  imageFile: FormData,
): Promise<{ image: string } | void> {
  const response = await axios.post<{ image: string }>(
    'https://fessport-server.com/imgUpload',
    imageFile,
  );
  return response.data;
}

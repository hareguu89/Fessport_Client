import axios from 'axios';

// ----------- Get Participants list
export async function getParticData(
  boardId: string,
): Promise<ParticDataRes[] | void> {
  const response = await axios.get<ParticDataRes[]>(
    'https://fessport-server.com/participant/list',
    {
      withCredentials: true,
    },
  );
  return response.data;
}

export interface ParticDataRes {
  id: string;
  image: string;
  nickName: string;
}

// ------------- Post Participants -------------
export async function postParticData(
  param: ParticRequest,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    'https://fessport-server.com/participant/create',
    param.postParticData,
    {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${param.accessToken}`,
      },
    },
  );
  return response.data;
}

export interface ParticRequest {
  postParticData: ParticiInfo;
  accessToken: string;
}

interface ParticiInfo {
  boardId: string;
}

export interface Imessage {
  message: string;
}

// ------------- Delete Participants -------------

export async function deleteParticData(
  param: ParticRequest,
): Promise<Imessage | void> {
  const response = await axios.post<Imessage>(
    'https://fessport-server.com/participants/delete',
    param.postParticData,
    {
      withCredentials: true,
      headers: {
        Authorization: `bearer ${param.accessToken}`,
      },
    },
  );
  return response.data;
}

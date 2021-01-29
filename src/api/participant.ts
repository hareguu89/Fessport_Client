import axios from 'axios';

// ----------- Get Participants list
export async function getParticData(
  boardId: string,
): Promise<ParticDataRes[] | void> {
  const response = await axios.get<ParticDataRes[]>('/participant/list', {
    withCredentials: true,
  });
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
    '/participant/create',
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
    '/participants/delete',
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

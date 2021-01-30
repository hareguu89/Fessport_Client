import axios from 'axios';

// ---------------- signin -----------------

export async function SigninApi(
  param: SigninPayload,
): Promise<LoginInfo | void> {
  const response = await axios.post<LoginInfo>(
    'https://fessport-server.com/login',
    param.userInfo,
    { withCredentials: true },
  );
  return response.data;
}

export interface SigninPayload {
  userInfo: Info;
}

interface Info {
  email: string;
  password: string;
}

export interface LoginInfo {
  message: string;
}
// ---------------- signup -----------------

export async function SignupApi(
  param: SignupPayload,
): Promise<SignupInfo | void> {
  const response = await axios.post<SignupInfo>(
    'https://fessport-server.com/signup',
    param.userInfo,
    { withCredentials: true },
  );
  return response.data;
}

export interface SignupPayload {
  userInfo: {
    nickname: string;
    password: string;
    email: string;
  };
}

export interface SignupInfo {
  message: string;
}

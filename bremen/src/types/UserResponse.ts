interface LoginResponse {
  status: number;
  message: string;
  item: {
    profileImage: string;
    nickname: string;
    refreshToken: string;
    accessToken: string;
    id: number;
    name: string;
    username: string;
  };
}

interface ICheck {
  status: number;
  message: string;
  data: string;
}

interface ISignUpResponse {
  status: number;
  message: string;
  item: {
    username: string;
    nickname: string;
    introduce: null | string;
    profileImage: null | string;
    followerCnt: number;
    followCnt: number;
    follow: boolean;
  };
}
export type {LoginResponse, ICheck, ISignUpResponse};

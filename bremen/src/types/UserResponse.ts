interface LoginResponse {
  status: number;
  message: string;
  data: {
    profileImage: string;
    nickname: string;
    refreshToken: string;
    accessToken: string;
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
  data: {
    username: string;
    nickname: string;
    introduce: null | string;
    profileImage: null | string;
    followerCnt: number;
    followCnt: number;
  };
}
export type {LoginResponse, ICheck, ISignUpResponse};

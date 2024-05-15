import axios from 'axios';
import useUserInfoStore from '@/stores/UserInfo';

const getAccessToken = async () => {
  const { zustandToken } = useUserInfoStore.getState(); // Zustand의 상태만 가져옵니다.
  return zustandToken;
};

const apiMulti = axios.create({
  baseURL: 'https://k10a104.p.ssafy.io/api/v1',
  withCredentials: true,
});

apiMulti.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken();

    if (accessToken && accessToken !== '') {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
      config.headers['Content-Type'] = 'multipart/form-data';
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiMulti;

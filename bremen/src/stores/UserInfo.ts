import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IUserInfo {
  zustandUserImage: string;
  setZustandUserImage: (newImage: string) => void;
  zustandUserNickname: string;
  setZustandUserNickname: (newNickname: string) => void;
}

const useUserInfoStore = create<IUserInfo>()(
  persist(
    set => ({
      zustandUserImage: '/basicProfile.png',
      setZustandUserImage: (newImage: string) =>
        set({zustandUserImage: newImage}),
      zustandUserNickname: '',
      setZustandUserNickname: (newNickname: string) =>
        set({zustandUserNickname: newNickname}),
    }),
    {
      name: 'userInfo',
    },
  ),
);

export default useUserInfoStore;
export type {IUserInfo};

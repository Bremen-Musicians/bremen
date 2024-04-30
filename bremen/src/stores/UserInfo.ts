import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IUserInfo {
  zustandUserImage: string;
  setZustandUserImage: (newImage: string) => void;
  zustandUserNickname: string;
  setZustandUserNickname: (newNickname: string) => void;
  zustandToken: string;
  setZustandToken: (newToken: string) => void;
  zustandRFToken: string;
  setZustandRFToken: (newRFToken: string) => void;
}

const useUserInfoStore = create<IUserInfo>()(
  persist(
    set => ({
      zustandUserImage: '',
      setZustandUserImage: (newImage: string) =>
        set({zustandUserImage: newImage}),
      zustandUserNickname: '',
      setZustandUserNickname: (newNickname: string) =>
        set({zustandUserNickname: newNickname}),
      zustandToken: '',
      setZustandToken: (newToken: string) => set({zustandToken: newToken}),
      zustandRFToken: '',
      setZustandRFToken: (newRFToken: string) =>
        set({zustandRFToken: newRFToken}),
    }),
    {
      name: 'userInfo',
    },
  ),
);

export default useUserInfoStore;
export type {IUserInfo};

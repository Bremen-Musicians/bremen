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
  zustandEmail: string;
  setZustandEmail: (newEmail: string) => void;
  zustandUserId: number;
  setZustandUserId: (newId: number) => void;
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
      zustandEmail: '',
      setZustandEmail: (newEmail: string) => set({zustandEmail: newEmail}),
      zustandUserId: 0,
      setZustandUserId: (newId: number) => set({zustandUserId: newId}),
    }),
    {
      name: 'userInfo',
    },
  ),
);

export default useUserInfoStore;
export type {IUserInfo};

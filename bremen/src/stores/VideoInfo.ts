import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IVideoInfo {
  zustandVideoUrl: string;
  setZustandVideoUrl: (newVideo: string) => void;
}

const useVideoInfoStore = create<IVideoInfo>()(
  persist(
    set => ({
      zustandVideoUrl: '',
      setZustandVideoUrl: (newVideo: string) =>
        set({zustandVideoUrl: newVideo}),
    }),
    {
      name: 'videoInfo',
    },
  ),
);

export default useVideoInfoStore;
export type {IVideoInfo};

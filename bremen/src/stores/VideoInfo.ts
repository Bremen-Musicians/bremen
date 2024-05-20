import {create} from 'zustand';
import {persist} from 'zustand/middleware';

interface IVideoInfo {
  zustandVideoUrl: string;
  setZustandVideoUrl: (newVideo: string) => void;
  zustandMusicId: number;
  setZustandMusicId: (newMusic: number) => void;
  zustandInstrumentId: number;
  setZustandInstrumentId: (newId: number) => void;
  zustandVideoId: number;
  setZustandVideoId: (newNumber: number) => void;
}

const useVideoInfoStore = create<IVideoInfo>()(
  persist(
    set => ({
      zustandVideoUrl: '',
      setZustandVideoUrl: (newVideo: string) =>
        set({zustandVideoUrl: newVideo}),
      zustandMusicId: 0,
      setZustandMusicId: (newMusic: number) => set({zustandMusicId: newMusic}),
      zustandInstrumentId: 0,
      setZustandInstrumentId: (newId: number) =>
        set({zustandInstrumentId: newId}),
      zustandVideoId: 0,
      setZustandVideoId: (newNumber: number) =>
        set({zustandVideoId: newNumber}),
    }),
    {
      name: 'videoInfo',
    },
  ),
);

export default useVideoInfoStore;
export type {IVideoInfo};

interface EnsembleVideoItem {
  id: number;
  musicTitle: string;
  startTime: string;
  endTime: string;
}

interface VideoItem {
  id: number;
  musicTitle: string;
  challengeImage: string;
}
export interface ApiResponse<T> {
  items: T[];
}
export type {EnsembleVideoItem, VideoItem};

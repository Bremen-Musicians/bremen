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

export type {EnsembleVideoItem, VideoItem};

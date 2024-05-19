interface VideoResponse {
  status: number;
  message: string;
  item: {
    id: number;
    videoUrl: string;
    imageUrl: string;
    createTime: string;
    music: {
      id: number;
      title: string;
      composer: string | null;
      singer: string | null;
    };
    instrument: {
      id: number;
      name: string;
    };
    ensembleVideo: null | VideoResponse;
    isEnsemble: boolean;
    isHighlight: boolean;
  };
}

export type {VideoResponse};

interface IArticleSearch {
  id: number;
  title: string;
  content: string;
  hitCnt: number;
  likeCnt: number;
  createTime: string;
  userId: number;
  username: string;
  nickname: string;
  videoId: number;
  videoUrl: string;
  imageUrl: string;
  hashtags: string[] | null;
  like: boolean;
}

interface IArticleResult extends IArticleSearch {
  status: number;
  message: string;
  items: IArticleSearch[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      empty: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
}

export type {IArticleResult, IArticleSearch};

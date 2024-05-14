interface IPageable {
  pageNumber: number,
  pageSize: number,
  sort: {
    sorted: boolean,
    empty: boolean,
    unsorted: boolean,
  }
  offset: number,
  paged: boolean,
  unpaged: boolean,
}

interface IMainResponse {
  status: number,
  message: string,
  items: IArticleList[],
  pageable: IPageable,
  size: number,
}

interface IArticleList {
  id: number,
  title: string,
  content: string,
  hitCnt: number,
  likeCnt: number,
  createdTime: string,
  userId: number,
  username: string,
  nickname: string,
  videoId: number,
  videoUrl: string,
  imageUrl: string,
  hashtags: string[],
  like: boolean,
}

export type {IPageable, IMainResponse, IArticleList};
interface IPagination {
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
}

interface AlarmContent {
  id: number;
  content: string;
  type: string;
  createTime: string;
}
interface IAlarmResponse extends AlarmContent, IPagination {
  status: number;
  message: string;
  items: AlarmContent[];
  pageable: IPagination;
  size: number;
}

export type {IPagination, AlarmContent, IAlarmResponse};

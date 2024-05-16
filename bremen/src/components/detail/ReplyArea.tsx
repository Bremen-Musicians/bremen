import {useEffect, useState} from 'react';
import styles from '@/components/detail/ReplyArea.module.scss';
import api from '@/api/api';
import ReplyHighlight from './ReplyHighlight';
import Replies from './Replies';
import Footer from '../Common/Footer';
import ReplyHighlightEmpty from './ReplyHighlightEmpty';

interface IReply {
  id: number; // 댓글의 고유 id
  groupCnt: number; // 대댓글이 총 몇개 있는지 알려줌
  content: string;
  writerNickname: string;
  profile: string;
  createTime: string;
  children: IReply[]; // 대댓글 목록
  deleted: boolean;
  updated: boolean;
}

interface IPageable {
  pageNumber: number;
  pageSize: number;
  sort: ISort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface ISort {
  sorted: boolean;
  empty: boolean;
  unsorted: boolean;
}

interface IReplyResponse {
  status: number;
  message: string;
  items: IReply[];
  pageable: IPageable;
  size: number;
}

export default function ReplyArea() {
  const [openReply, setOpenReply] = useState(false);
  const [replyList, setReplyList] = useState<IReply[]>([]);
  const [profileImgH, setProfileImgH] = useState<string>('');
  const [contentH, setContentH] = useState<string>('');
  const [deletedH, setDeletedH] = useState<boolean>(false);

  const replyHandler = () => {
    setOpenReply(!openReply);
  };

  // 댓글 목록 받는 api 호출 함수
  const replyAPI = async (articleId: number) => {
    await api
      .get<IReplyResponse>(`/comments?id=${articleId}`)
      .then(response => {
        const replyData = response.data.items;
        setReplyList(replyData);

        if (replyData.length > 0) {
          setProfileImgH(replyData[replyData.length - 1].profile);
          setContentH(replyData[replyData.length - 1].content);
          setDeletedH(replyData[replyData.length - 1].deleted);
        }
      });
  };

  // 처음 페이지 로딩
  useEffect(() => {
    // eslint-disable-next-line no-console
    replyAPI(2).catch(error => console.error(error));
  }, []);

  return (
    <div>
      {openReply ? (
        <Replies replyList={replyList} replyHandler={replyHandler} />
      ) : (
        <>
          {contentH === '' ? (
            <ReplyHighlightEmpty replyHandler={replyHandler} />
          ) : (
            <>
              <ReplyHighlight
                profileImgH={profileImgH}
                contentH={contentH}
                deletedH={deletedH}
                replyCnt={replyList.length}
                replyHandler={replyHandler}
              />
              <div className={styles.pagebottom} />
              <Footer />
            </>
          )}
        </>
      )}
    </div>
  );
}

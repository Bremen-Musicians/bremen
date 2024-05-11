import styles from '@/components/detail/ReplyArea.module.scss';
import {useEffect, useState} from 'react';
import ReplyHighlight from './ReplyHighlight';
import Replies from './Replies';
import Footer from '../Common/Footer';
import api from '@/api/api';
import ReplyHighlightEmpty from './ReplyHighlightEmpty';

interface IReply {
  id: number, // 댓글의 고유 id
  groupCnt: number, // 대댓글이 총 몇개 있는지 알려줌
  content: string,
  writerNickname: string,
  profile: string,
  createTime: string,
  children: IReply[], // 대댓글 목록
  deleted: boolean,
  updated: boolean,
}

interface IReplyResponse {
  status: number;
  message: string;
  item: IReply[];
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
    await api.get<IReplyResponse>(`/comments?id=${articleId}`).then((response) => {
      const replyData = response.data.item;
      setReplyList(replyData);
      console.log(replyData.length);

      if (replyData.length > 0) {
        setProfileImgH(replyData[replyData.length -1].profile);
        setContentH(replyData[replyData.length -1].content);
        setDeletedH(replyData[replyData.length -1].deleted);
      }
    })
  }
  
  // 처음 페이지 로딩
  useEffect(() => {
    replyAPI(2);
  }, [])

  return (
    <div>
      {openReply ? (
        <Replies replyList={replyList} replyHandler={replyHandler} />
      ) : (
        <>
        {
          contentH === '' 
          ? (<ReplyHighlightEmpty replyHandler={replyHandler}/>) 
          : (
            <>
              <ReplyHighlight profileImgH={profileImgH} contentH={contentH} deletedH={deletedH} replyCnt={replyList.length} replyHandler={replyHandler} />
              <div className={styles.pagebottom} />
              <Footer />
            </>
          )
        }
        </>
      )}
    </div>
  );
}

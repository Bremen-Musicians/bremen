'use client';

import {useEffect, useState} from 'react';
import Reply from '@/components/Detail/Reply';
import styles from '@/components/detail/Replies.module.scss';
import ReReplies from './ReReplies';
import { RxCross2 } from "react-icons/rx";
import api from '@/api/api';

interface IReply {
  id: number, // 댓글의 고유 id
  groupCnt: number, // 대댓글이 총 몇개 있는지 알려줌
  content: string,
  writerNickname: string,
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

export default function Replies({replyHandler}: {replyHandler: () => void}) {
  const [openReReply, setOpenReReply] = useState(false);
  const [replyList, setReplyList] = useState<IReply[]>();

  const handleReReply = () => {
    setOpenReReply(!openReReply);
  };

  // 댓글 목록 받는 api 호출 함수
  const replyAPI = (articleId: number) => {
    api.get<IReplyResponse>(`/comments?id=${articleId}`).then((response) => {
      const replyData = response.data.item;
      setReplyList(replyData);
    })
  }
  
  // 처음 페이지 로딩
  useEffect(() => {
    replyAPI(2);
  }, [])


  return (
    <>
      <div className={styles.title}>
        {openReReply ? (
          <>
          {/* 특정 댓글에 대한 답글 목록 */}
            <p>답글</p>
            <p onClick={handleReReply}><RxCross2 /></p>
          </>
        ) : (
          <>
          {/* 댓글목록 */}
            <p>댓글</p>
            <p onClick={replyHandler}><RxCross2 /></p>
          </>
        )}
      </div>

      {openReReply ? (
        <ReReplies />
      ) : (
        <div className={styles.replylist}>
          {replyList && replyList.map((reply, key) => <Reply reply={reply} key={key} reReplyHandler={handleReReply}/>)}
        </div>
      )}

      {!openReReply && (
        <>
          <div className={styles.replyinput}>
            <input type="text"></input>
            <div>등록</div>
          </div>
          <div className={styles.pagebottom} />
        </>
      )}
    </>
  );
}

'use client';

import {useState} from 'react';
import Reply from '@/components/Detail/Reply';
import styles from '@/components/detail/Replies.module.scss';
import ReReplies from './ReReplies';
import { RxCross2 } from "react-icons/rx";

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

export default function Replies({replyList, replyHandler}: {replyList: IReply[], replyHandler: () => void}) {
  const [openReReply, setOpenReReply] = useState(false);
  const [openedReply, setOpenedReply] = useState<IReply>();
  
  const handleReReply = (reply: IReply) => {
    setOpenedReply(reply);
    setOpenReReply(true);
  };

  const closeReReply = () => {
    setOpenReReply(false);
  }

  return (
    <>
      <div className={styles.title}>
        {openReReply ? (
          <>
          {/* 특정 댓글에 대한 답글 목록 */}
            <p>답글</p>
            <p onClick={closeReReply}><RxCross2 /></p>
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
        <ReReplies reply={openedReply!} />
      ) : (
        <div className={styles.replylist}>
          {replyList && replyList.map((reply, key) => <Reply reply={reply} key={reply.id} reReplyHandler={handleReReply}/>)}
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

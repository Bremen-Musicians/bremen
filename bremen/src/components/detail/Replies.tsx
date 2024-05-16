'use client';

import {useEffect, useState} from 'react';
import Reply from '@/components/detail/Reply';
import styles from '@/components/detail/Replies.module.scss';
import ReReplies from './ReReplies';
import { RxCross2 } from "react-icons/rx";
import api from '@/api/api';

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

export default function Replies({replyHandler}: {replyHandler: () => void}) {
  const [openReReply, setOpenReReply] = useState(false);
  const [openedReply, setOpenedReply] = useState<IReply>();
  const [replyList, setReplyList] = useState<IReply[]>([]);
  const [input, setInput] = useState<string>('');
  
  // 대댓글 창 열기
  const handleReReply = (reply: IReply) => {
    setOpenedReply(reply);
    setOpenReReply(true);
  };

  // 대댓글 창 닫기
  const closeReReply = () => {
    setOpenReReply(false);
  }

  // 댓글 목록 조회
  const getReply = () => {
    api.get(`/comments?id=2`).then((response) => {
      const replyData = response.data.items;
      setReplyList(replyData);
    })
  }

  // 댓글 작성
  const postReply = () => {
    api.post(`/comments`, {
      content: input,
      articleId: 2,
    }).then(() => {
      // 입력창 초기화 및 댓글 목록 재조회
      setInput('');
      getReply();
    })
  }

  // 댓글 수정
  const modifyReply = (id: number, content: string) => {
    api.patch(`/comments`, {
      id: id, // 댓글 id
      content: content, // 수정된 댓글 내용
    })
  }

  // 댓글 삭제
  const deleteReply = (id: number) => {
    api.delete(`/comments?id=${id}`).then(() => {
      alert('댓글이 삭제되었습니다.');
      getReply();
    });
  }

  // 초기 댓글 조회
  useEffect(() => {
    getReply();
  }, []);

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
          {replyList && replyList.map((reply, key) => <Reply reply={reply} key={reply.id} deleteReply={deleteReply} reReplyHandler={handleReReply}/>)}
        </div>
      )}

      {!openReReply && (
        <>
          <div className={styles.replyinput}>
            <input
              type="text"
              placeholder='댓글 입력...'
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => (e.key === 'Enter' ? postReply() : null)}
            />
            <div onClick={postReply}>등록</div>
          </div>
          <div className={styles.pagebottom} />
        </>
      )}
    </>
  );
}

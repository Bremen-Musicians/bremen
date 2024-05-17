/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import styles from '@/components/detail/Reply.module.scss';
import {useEffect, useState} from 'react';
import useUserInfoStore from '@/stores/UserInfo';
import api from '@/api/api';
import ProfileImage from '../Common/ProfileImage';

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

interface ReplyProps {
  reply: IReply;
  key: number;
  deleteReply: (id: number) => void;
  reReplyHandler: (reply: IReply) => void;
}

export default function Reply({
  reply,
  deleteReply,
  reReplyHandler,
}: ReplyProps) {
  const {zustandUserNickname} = useUserInfoStore.getState();
  const [myReply, setMyReply] = useState<boolean>(false);
  const [modifyStatus, setModifyStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (zustandUserNickname === reply.writerNickname) {
      setMyReply(true);
    }
  }, []);

  // 댓글 수정 창 띄우기
  const clickModify = () => {
    setInput(reply.content);
    setModifyStatus(true);
  };

  // 댓글 수정 창 닫기
  // const cancleModify = () => {
  //   setModifyStatus(false);
  // };

  // 댓글 수정 api
  const modifyReply = (id: number, content: string) => {
    api
      .patch(`/comments`, {
        id: reply.id, // 댓글 id
        content, // 수정된 댓글 내용
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('댓글이 수정되었습니다.');
        setModifyStatus(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  return (
    <div className={styles.reply}>
      <div className={styles.profileimg}>
        <ProfileImage
          userNickname={reply.writerNickname}
          profileImage={reply.profile}
        />
      </div>
      {modifyStatus ? (
        <div className={styles.modify}>
          <input
            type="text"
            placeholder="댓글 입력..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' ? modifyReply(reply.id, input) : null
            }
          />
        </div>
      ) : (
        <div>
          <div className={styles.replytop}>
            {/* 댓글 단 사람 */}
            <div className={styles.replier}>
              {reply.writerNickname} | {moment(reply.createTime).fromNow()}
            </div>

            {/* 내가 단 댓글이면 보일 것 */}
            {myReply && (
              <div className={styles.modifydelete}>
                <span onClick={clickModify}>수정</span> |{' '}
                <span onClick={() => deleteReply(reply.id)}>삭제</span>
              </div>
            )}
          </div>
          {/* 댓글 내용 */}
          <div>{reply.content}</div>
          {/* 답글 버튼 */}
          <p className={styles.rereplybtn}>
            {reply.groupCnt > 0 ? (
              <span onClick={() => reReplyHandler(reply)}>
                답글 {reply.groupCnt}개
              </span>
            ) : (
              <span onClick={() => reReplyHandler(reply)}>답글 달기</span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

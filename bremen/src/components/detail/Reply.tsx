import moment from 'moment';
import styles from '@/components/detail/Reply.module.scss';
import ProfileImage from '../Common/ProfileImage';
import { useEffect, useState } from 'react';
import useUserInfoStore from '@/stores/UserInfo';

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
  reply: IReply,
  key: number,
  deleteReply: (id: number) => void
  reReplyHandler: (reply: IReply) => void,
}

export default function Reply({reply, deleteReply, reReplyHandler}: ReplyProps) {
  const [myReply, setMyReply] = useState<boolean>(false);
  const { zustandUserNickname } = useUserInfoStore.getState();

  useEffect(() => {
    if (zustandUserNickname === reply.writerNickname) {
      setMyReply(true);
    }
  }, [])

  return (
    <div className={styles.reply}>
      <div className={styles.profileimg}>
        <ProfileImage
          userNickname={reply.writerNickname}
          profileImage={reply.profile}
        />
      </div>
      <div>
        <div className={styles.replytop}>
          {/* 댓글 단 사람 */}
          <div className={styles.replier}>{reply.writerNickname} | {moment(reply.createTime).fromNow()}</div>
          
          {/* 내가 단 댓글이면 보일 것 */}
          {
            myReply && (
              <div className={styles.modifydelete}>
                <span>수정</span> | <span onClick={() => deleteReply(reply.id)}>삭제</span>
              </div>
            )
          }
        </div>
        {/* 댓글 내용 */}
        <div>
          {reply.content}
        </div>
        {/* 댓글 내용 */}
        <div>{reply.content}</div>
        {/* 답글 버튼 */}
        <p className={styles.rereplybtn} >
          {
            reply.groupCnt > 0
            ? <span onClick={() => reReplyHandler(reply)}>답글 {reply.groupCnt}개</span>
            : <span onClick={() => reReplyHandler(reply)}>답글 달기</span>
          }
        </p>
      </div>
    </div>
  );
}

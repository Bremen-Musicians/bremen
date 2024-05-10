import styles from '@/components/detail/Reply.module.scss';
import moment from 'moment';

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

interface ReplyProps {
  reply: IReply,
  key: number,
  reReplyHandler: () => void,
}

export default function Reply({reply, key, reReplyHandler}: ReplyProps) {
  return (
    <div className={styles.reply}>
      <div className={styles.profileimg} />
      <div>
        {/* 댓글 단 사람 */}
        <div className={styles.replier}>{reply.writerNickname} | {moment(reply.createTime).fromNow()}</div>
        {/* 댓글 내용 */}
        <div>
          {reply.content}
        </div>
        {/* 답글 버튼 */}
        <p className={styles.rereplybtn} onClick={reReplyHandler}>
          {reply.groupCnt > 0 ? <span>답글 {reply.groupCnt}개</span> : <span>답글 달기</span>}
        </p>
      </div>
    </div>
  );
}

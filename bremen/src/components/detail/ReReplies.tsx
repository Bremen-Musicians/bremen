import styles from '@/components/detail/ReReplies.module.scss';
import ReReply from '@/components/detail/ReReply';
import moment from 'moment';
import ProfileImage from '../Common/ProfileImage';

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

export default function ReReplies({reply}: {reply: IReply}) {
  return (
    <>
      <div className={styles.rereplylist}>
        {/* 원본 댓글 */}
        <div className={styles.reply}>
          <div className={styles.profileimg}>
            <ProfileImage userNickname={reply.writerNickname} profileImage={reply.profile} />
          </div>
          <div>
            {/* 댓글 단 사람 */}
            <div className={styles.replier}>{reply.writerNickname} | {moment(reply.createTime).fromNow()}</div>
            {/* 댓글 내용 */}
            <div>
              {reply.content}
            </div>
          </div>
        </div>

        {/* 답댓글 리스트 */}
        {reply.children.map((rereply, key) => <ReReply rereply={rereply} />)}
      </div>
      <div className={styles.rereplyinput}>
        <input type="text"></input>
        <div>등록</div>
      </div>
      <div className={styles.pagebottom} />
    </>
  );
}

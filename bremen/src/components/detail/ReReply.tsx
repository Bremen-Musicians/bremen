import moment from 'moment';
import styles from '@/components/detail/ReReply.module.scss';
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

export default function ReReply({rereply}: {rereply: IReply}) {
  return (
    <div className={styles.rereply}>
      <div className={styles.profileimg}>
        <ProfileImage
          userNickname={rereply.writerNickname}
          profileImage={rereply.profile}
        />
      </div>
      <div>
        {/* 답댓글 단 사람 */}
        <div className={styles.rereplier}>
          {rereply.writerNickname} | {moment(rereply.createTime).fromNow()}
        </div>
        {/* 답댓글 내용 */}
        <div>{rereply.content}</div>
      </div>
    </div>
  );
}

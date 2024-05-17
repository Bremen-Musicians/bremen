/* eslint-disable @next/next/no-img-element */
import styles from '@/components/detail/ReplyHighlight.module.scss';
import Video from '@/components/Common/Video';
import ProfileImage from '../Common/ProfileImage';

export default function replyHighlight({
  profileImgH,
  contentH,
  deletedH,
  replyCnt,
  replyHandler,
}: {
  profileImgH: string;
  contentH: string;
  deletedH: boolean;
  replyCnt: number;
  replyHandler: () => void;
}) {
  return (
    <>
      <div className={styles.cell} onClick={replyHandler}>
        <div className={styles.title}>
          <p>댓글</p>
          <p>{replyCnt}</p>
        </div>
        <div className={styles.reply}>
          <div className={styles.profileimg}>
            {!deletedH && (
              <ProfileImage userNickname="" profileImage={profileImgH} />
            )}
          </div>
          <div>{deletedH ? '(삭제된 댓글입니다)' : contentH}</div>
        </div>
      </div>
      <div className={styles.videolist}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </>
  );
}

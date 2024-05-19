/* eslint-disable @next/next/no-img-element */
import styles from '@/components/detail/ReplyHighlight.module.scss';
// import Video from '@/components/Common/Video';
import useUserInfoStore from '@/stores/UserInfo';
import ProfileImage from '../Common/ProfileImage';

export default function ReplyHighlightEmpty({
  replyHandler,
}: {
  replyHandler: () => void;
}) {
  const {zustandUserImage, zustandUserNickname} = useUserInfoStore.getState();
  return (
    <>
      <div className={styles.cell} onClick={replyHandler}>
        <div className={styles.title}>
          <p>댓글</p>
        </div>
        <div className={styles.reply}>
          <div className={styles.profileimg}>
            {/* <img src={myProfileImage} alt="myProfileImage" /> */}
            <ProfileImage
              profileImage={zustandUserImage}
              userNickname={zustandUserNickname}
            />
          </div>
          <div>댓글 입력 ...</div>
        </div>
      </div>
      <div className={styles.videolist}>
        {/* <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video /> */}
      </div>
    </>
  );
}

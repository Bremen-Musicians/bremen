import ProfileImage from '@/components/Common/ProfileImage';
import styles from '@/components/MyPage/Profile/MyInfo.module.scss';

interface IUser {
  username: string;
  nickname: string;
  introduce: string;
  profileImage: string;
  followerCnt: number;
  followCnt: number;
  follow: boolean;
}

export default function MyInfo({me}: {me: IUser}) {
  return (
    <>
      <div className={styles.myprofile}>
        {/* 프사 */}
        <div className={styles.profileimg}>
          <ProfileImage
            userNickname={me.nickname}
            profileImage={me.profileImage}
          />
        </div>

        {/* 연주, 팔로워, 팔로잉 */}
        <div className={styles.counts}>
          <div>
            <span className={styles.bold}>6</span>
            <span>연주</span>
          </div>
          <div>
            <span className={styles.bold}>{me.followerCnt}</span>
            <span>팔로워</span>
          </div>
          <div>
            <span className={styles.bold}>{me.followCnt}</span>
            <span>팔로잉</span>
          </div>
        </div>
      </div>

      <div className={styles.myname}>
        {/* 닉네임 */}
        <div>
          <span className={styles.nick}>{me.nickname}</span>
        </div>

        {/* 소개 */}
        <div>
          <span>{me.introduce}</span>
        </div>
      </div>
    </>
  );
}

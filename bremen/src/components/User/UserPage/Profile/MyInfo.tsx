import ProfileImage from '@/components/Common/ProfileImage';
import styles from './MyInfo.module.scss';

interface IUser {
  username: string;
  nickname: string;
  introduce: string;
  profileImage: string;
  followerCnt: number;
  followCnt: number;
  follow: boolean;
}

export default function MyInfo({
  user,
  articleCnt,
}: {
  user: IUser;
  articleCnt: number;
}) {
  return (
    <>
      <div className={styles.myprofile}>
        {/* 프사 */}
        <div className={styles.profileimg}>
          <ProfileImage
            userNickname={user.nickname}
            profileImage={user.profileImage}
          />
        </div>

        {/* 연주, 팔로워, 팔로잉 */}
        <div className={styles.counts}>
          <div>
            <span className={styles.bold}>{articleCnt}</span>
            <span>연주</span>
          </div>
          <div>
            <span className={styles.bold}>{user.followerCnt}</span>
            <span>팔로워</span>
          </div>
          <div>
            <span className={styles.bold}>{user.followCnt}</span>
            <span>팔로잉</span>
          </div>
        </div>
      </div>

      <div className={styles.myname}>
        {/* 닉네임 */}
        <div>
          <span className={styles.nick}>{user.nickname}</span>
        </div>

        {/* 소개 */}
        <div>
          <span>{user.introduce}</span>
        </div>
      </div>
    </>
  );
}

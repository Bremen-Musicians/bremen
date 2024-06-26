/* eslint-disable no-console */
import {useRouter} from 'next/navigation';
import useUserInfoStore from '@/stores/UserInfo';
import styles from './ProfileImage.module.scss';

interface IProfileImage {
  userNickname: string;
  profileImage: string;
}

export default function ProfileImage({
  userNickname,
  profileImage,
}: IProfileImage) {
  const router = useRouter();
  const {zustandUserNickname} = useUserInfoStore();

  const moveToProfile = () => {
    // 전역으로 관리하는 내 정보랑 비교해 userNickname와
    // 내 nickname(zustandUserNickname)이 같으면 /mypage로 보내야 한다.
    if (zustandUserNickname !== '' && userNickname === zustandUserNickname) {
      router.push('/mypage');
    } else {
      router.push(`/user/${userNickname}`);
    }
    console.log('프로필 사진으로 페이지 이동!');
  };

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className={styles.profileImage}
      src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${profileImage}`}
      alt="profileImage"
      loading="lazy"
      onClick={moveToProfile}
    />
  );
}

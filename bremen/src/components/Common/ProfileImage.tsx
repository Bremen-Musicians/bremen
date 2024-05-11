import {useRouter} from 'next/navigation';
import Image from 'next/image';
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
  };

  return (
    <img
      className={styles.profileImage}
      src={profileImage}
      alt="profileImage"
      onClick={() => moveToProfile}
    />
  );
}

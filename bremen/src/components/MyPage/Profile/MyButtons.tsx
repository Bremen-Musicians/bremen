import {useRouter} from 'next/navigation';
import styles from '@/components/MyPage/Profile/MyButtons.module.scss';

export default function MyButtons() {
  const router = useRouter();

  // 프로필 수정
  const editProfile = () => {
    router.push('/mypage/edit');
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.editbutton} onClick={editProfile}>
        수정
      </div>
      <div className={styles.messagebutton}>로그아웃</div>
    </div>
  );
}

'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/MyPage/Profile/MyButtons.module.scss';

export default function MyButtons() {
  const router = useRouter();
  const editProfile = () => {
    router.push('/mypage/edit');
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.editbutton} onClick={editProfile}>
        수정
      </div>
      <div className={styles.messagebutton}>메시지</div>
    </div>
  );
}

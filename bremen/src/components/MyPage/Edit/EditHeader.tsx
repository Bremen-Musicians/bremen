'use client';

import {FaArrowLeft} from 'react-icons/fa6';
import styles from '@/components/MyPage/Profile/MyPageHeader.module.scss';
import {useRouter} from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.mypageHeader}>
      <FaArrowLeft onClick={goBack} />
      <span>프로필 수정</span>
    </div>
  );
}

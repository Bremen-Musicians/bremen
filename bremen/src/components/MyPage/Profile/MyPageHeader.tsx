import {FaArrowLeft} from 'react-icons/fa6';
import styles from '@/components/MyPage/Profile/MyPageHeader.module.scss';
import {useRouter} from 'next/navigation';

export default function Header({nickname}: {nickname: string}) {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  return (
    <div className={styles.mypageHeader}>
      <FaArrowLeft onClick={goBack} />
      <span>{nickname}</span>
    </div>
  );
}

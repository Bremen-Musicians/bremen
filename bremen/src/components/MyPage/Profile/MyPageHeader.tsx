import {FaArrowLeft} from 'react-icons/fa6';
import styles from '@/components/MyPage/Profile/MyPageHeader.module.scss';

export default function Header({nickname}: {nickname: string}) {
  return (
    <div className={styles.mypageHeader}>
      <FaArrowLeft />
      <span>{nickname}</span>
    </div>
  );
}

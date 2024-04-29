import {FaArrowLeft} from 'react-icons/fa6';
import styles from '@/components/MyPage/Profile/MyPageHeader.module.scss';

export default function Header() {
  return (
    <div className={styles.mypageHeader}>
      <FaArrowLeft />
      <span>닉네임</span>
    </div>
  );
}

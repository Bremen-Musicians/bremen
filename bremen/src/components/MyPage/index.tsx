import styles from '@/components/MyPage/index.module.scss';
import MyPageHeader from '@/components/MyPage/Profile/MyPageHeader';
import MyInfo from './Profile/MyInfo';
// import Tabs from './Plays/Tabs';

export default function index() {
  return (
    <div>
      <MyPageHeader />
      <MyInfo />
      <div className={styles.buttons}>
        <div className={styles.editbutton}>수정</div>
        <div className={styles.messagebutton}>메시지</div>
      </div>
      {/* <Tabs /> */}
    </div>
  );
}

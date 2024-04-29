import styles from '@/components/MyPage/Profile/MyButtons.module.scss';

export default function MyButtons() {
  return (
    <div className={styles.buttons}>
      <div className={styles.editbutton}>팔로우</div>
      <div className={styles.messagebutton}>메시지</div>
    </div>
  );
}

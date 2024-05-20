import styles from '@/components/User/UserPage/Profile/MyButtons.module.scss';

export default function MyButtons({
  follow,
  handleFollow,
}: {
  follow: boolean;
  handleFollow: () => void;
}) {
  return (
    <div className={styles.buttons}>
      {follow ? (
        <div onClick={handleFollow} className={styles.messagebutton}>
          언팔로우
        </div>
      ) : (
        <div onClick={handleFollow} className={styles.editbutton}>
          팔로우
        </div>
      )}
    </div>
  );
}

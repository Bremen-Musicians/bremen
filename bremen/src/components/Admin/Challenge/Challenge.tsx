import styles from './Challenge.module.scss';
import FindSong from './FindSong';
import FindDate from './FindDate';

export default function Challenge() {
  return (
    <div className={styles.challengepage}>
      <FindSong />
      <FindDate />
    </div>
  );
}

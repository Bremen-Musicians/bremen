import styles from './Challenge.module.scss';
import FindSong from './FindSong';
import FindDate from './FindDate';
import IntroChallenge from './IntroChallenge';

export default function Challenge() {
  return (
    <div className={styles.challengepage}>
      <FindSong />
      <FindDate />
      <IntroChallenge />
    </div>
  );
}

import styles from './FindDate.module.scss';

export default function FindSong() {
  return (
    <>
      <div className={styles.findsongarea}>
        <span className={styles.date}>챌린지 기간 : </span>
        <div className={styles.searchbox}>
          <input type="text"></input>
        </div>
        <span className={styles.wave}>~</span>
        <div className={styles.searchbox}>
          <input type="text"></input>
        </div>
      </div>
      <span className={styles.ex}>
        입력예시 : 2024.5.6 06:00 ~ 2024.5.12 23:59
      </span>
    </>
  );
}

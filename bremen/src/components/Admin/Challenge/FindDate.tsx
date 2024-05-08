import styles from './FindDate.module.scss';

export default function FindSong() {
  return (
    <>
      <div className={styles.finddatearea}>
        <span className={styles.date}>챌린지 기간 : </span>
        <div className={styles.searchbox}>
          <input type="text" id="startTime"></input>
        </div>
        <span className={styles.wave}>~</span>
        <div className={styles.searchbox}>
          <input type="text" id="endTime"></input>
        </div>
      </div>
      <span className={styles.ex}>
        날짜/시간 입력예시 : 2024-05-06T06:00:00Z
      </span>
    </>
  );
}

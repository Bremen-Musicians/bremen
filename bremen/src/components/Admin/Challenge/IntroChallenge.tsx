import styles from './IntroChallenge.module.scss';

export default function IntroChallenge() {
  return (
    <div className={styles.fileuploadarea}>
      {/* 파일 업로드 */}
      <div className={styles.fileupload}>
        <span className={styles.filetitle}>[메인]</span>
        <input
          className={styles.file}
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          id="main"
        />
      </div>

      <div className={styles.fileupload}>
        <span className={styles.filetitle}>[챌린지]</span>
        <input
          className={styles.file}
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          id="challenge"
        />
      </div>
    </div>
  );
}

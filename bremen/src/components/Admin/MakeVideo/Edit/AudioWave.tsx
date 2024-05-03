import styles from './AudioWave.module.scss';

export default function AudioWave({video}: {video: string}) {
  return (
    <div className={styles.temp}>
      <span>{video}</span>
    </div>
  );
}

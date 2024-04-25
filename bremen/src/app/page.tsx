import '@/styles/reset.css';
import styles from '@/app/page.module.scss';
import Video from '@/components/Common/Video';

export default function Home() {
  return (
    <>
      <div className={styles.challenge}>챌린지광고</div>
      <div className={styles.shortstitle}>쇼츠</div>
      <div className={styles.videolist}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </>
  );
}

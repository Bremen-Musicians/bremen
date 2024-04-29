import '@/styles/reset.css';
import styles from '@/app/page.module.scss';
import Video from '@/components/Common/Video';
import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.challenge}>챌린지광고</div>
        <div className={styles.videocontainer}>
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
          <div className={styles.videomargin}></div>
        </div>
      </div>
      <Header />
      <Footer />
    </>
  );
}

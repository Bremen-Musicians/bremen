import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/Common/Footer.module.scss';
import FootProfile from '@/components/Common/FooterProfile';

const Footer = () => {
  return (
    <div className={styles.firstContainer}>
      <div className={styles.shape}>
        <div className={styles.oval} />
        <div className={styles.Container}>
          <div className={styles.home}>
            <Link href="/">
              <Image
                style={{width: '8vmin', height: '8vmin'}}
                src={'/footer/home.png'}
                alt="홈"
                width={200}
                height={200}
              />
              <div>홈</div>
            </Link>
          </div>
          <div className={styles.search}>
            <Link href="/search">
              <Image
                style={{width: '8vmin', height: '8vmin'}}
                src={'/footer/search.png'}
                alt="검색"
                width={200}
                height={200}
              />
              <div>검색</div>
            </Link>
          </div>
          <div className={styles.upload}>
            <Link href="/upload">
              <Image
                priority={true}
                style={{width: '8vmin', height: 'auto'}}
                src={'/footer/upload.png'}
                alt="업로드"
                width={200}
                height={200}
              />
              <div>업로드</div>
            </Link>
          </div>
          <div className={styles.challenge}>
            <Link href="/challenge">
              <Image
                src={'/footer/challenge.png'}
                alt="챌린지"
                width={200}
                height={200}
                style={{width: '8vmin', height: '8vmin'}}
              />
              <div>챌린지</div>
            </Link>
          </div>
          <div className={styles.mypage}>
            <Link href="/mypage">
              <div className={styles.image}>
                <FootProfile />
                <div>마이페이지</div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

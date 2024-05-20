import Image from 'next/image';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import styles from '@/components/Common/Footer.module.scss';
import home from '../../../public/footer/home.png';
import search from '../../../public/footer/search.png';
import upload from '../../../public/footer/upload.png';
import challenge from '../../../public/footer/challenge.png';
import loading from '../../../public/loading.gif';

const DynamicFooterProfile = dynamic(
  () => import('@/components/Common/FooterProfile'),
  {
    loading: () => (
      <Image
        src={loading}
        width={200}
        height={200}
        alt="로딩"
        style={{width: '8vmin', height: 'auto'}}
      />
    ),
    ssr: false,
  },
);

const Footer = () => {
  return (
    <div className={styles.firstContainer}>
      <div className={styles.shape}>
        <div className={styles.Container}>
          <div className={styles.home}>
            <Link href="/">
              <Image
                style={{width: '8vmin', height: '8vmin'}}
                src={home}
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
                src={search}
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
                src={upload}
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
                src={challenge}
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
                <DynamicFooterProfile />
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

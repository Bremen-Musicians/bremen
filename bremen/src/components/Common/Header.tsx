import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/Common/Header.module.scss';
import FootProfile from '@/components/Common/FooterProfile';

const islogin = false; // 이 값을 변경하여 테스트해보세요

const Header = () => {
  return (
    <div className={styles.firstContainer}>
      <div className={styles.Container}>
        <div className={styles.leftContainer}>
          <div className={styles.home}>
            <Link href="/" className={styles.home}>
              <Image
                className={styles.img}
                src="/header/mainLogo.png"
                alt="mainLogo"
                width={100}
                height={100}
              />
              <div>
                <br />
                Bremen
                <br />
                musicians
              </div>
            </Link>
          </div>
          <div className={styles.search}>
            <Link href="/search">
              <div>검색</div>
            </Link>
          </div>
          <div className={styles.upload}>
            <Link href="/upload">
              <div>업로드</div>
            </Link>
          </div>
          <div className={styles.challenge}>
            <Link href="/challenge">
              <div>챌린지</div>
            </Link>
          </div>
        </div>
        <div className={styles.rightContainer}>
          {islogin ? (
            <div className={styles.mypage}>
              <Link href="/mypage">
                <div className={styles.img}>
                  <FootProfile />
                </div>
              </Link>
            </div>
          ) : (
            <div className={styles.login}>
              <Link href="/user/login">로그인</Link>
            </div>
          )}
          <div className={styles.bell}>
            <Link href="/alarm" className={styles.bell}>
              <Image
                className={styles.img}
                src="/header/bell.png"
                alt="bell"
                width={100}
                height={100}
              />
            </Link>
          </div>
          <div className={styles.message}>
            <Link href="/" className={styles.message}>
              <Image
                className={styles.img}
                src="/header/message.png"
                alt="message"
                width={100}
                height={100}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

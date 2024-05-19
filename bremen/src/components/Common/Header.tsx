'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/Common/Header.module.scss';
import FootProfile from '@/components/Common/FooterProfile';
import useUserInfoStore from '@/stores/UserInfo';
import mainLogo from '../../../public/header/mainLogo.png';
import bell from '../../../public/header/bell.png';

const Header = () => {
  const {zustandToken, zustandUserId} = useUserInfoStore();
  const islogin = Boolean(zustandToken && zustandUserId);

  return (
    <div className={styles.firstContainer}>
      <div className={styles.Container}>
        <div className={styles.leftContainer}>
          <div className={styles.home}>
            <Link href="/" className={styles.home}>
              <Image
                className={styles.img}
                src={mainLogo}
                alt="mainLogo"
                width={50}
                height={50}
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
          {islogin ? (
            <div className={styles.bell}>
              <Link href="/alarm" className={styles.bell}>
                <Image
                  className={styles.img}
                  src={bell}
                  alt="bell"
                  width={30}
                  height={30}
                />
              </Link>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;

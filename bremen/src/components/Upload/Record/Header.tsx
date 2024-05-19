import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import styles from '@/components/Upload/Record/Header.module.scss';
import goBack from '../../../../public/Icon/goBack.png';
import mainLogo from '../../../../public/header/mainLogo.png';

const Header = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <Image
        loading="lazy"
        className={styles.goBack}
        src={goBack}
        width={100}
        height={100}
        alt="뒤로가기"
        onClick={handleGoBack}
      />
      <Link href="/">
        <div className={styles.logo}>
          <Image
            loading="lazy"
            className={styles.image}
            src={mainLogo}
            width={100}
            height={100}
            alt="로고"
          />
          <div className={styles.name}>
            Bremen
            <br /> Musicians
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Header;

import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import styles from '@/components/Upload/Record/Header.module.scss';

const Header = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <div className={styles.container}>
      <Image
        className={styles.goBack}
        src="/Icon/goBack.png"
        width={100}
        height={100}
        alt="뒤로가기"
        onClick={handleGoBack}
      />
      <Link href="/">
        <div className={styles.logo}>
          <Image
            className={styles.image}
            src="/header/mainLogo.png"
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

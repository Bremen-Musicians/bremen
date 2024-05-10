import Image from 'next/image';
import styles from '@/app/search/page.module.scss';
import SearchBar from '@/components/Search/SearchBar';
import bremenStand2 from '../../../public/bremenstand2.png';

export default function Page() {
  return (
    <>
      <div className={styles.topImageContainer}>
        <Image
          className={styles.topImage}
          src={bremenStand2}
          alt="bremen"
          width={150}
          height={150}
        />
      </div>
      <div>
        <SearchBar initialValue="" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>노래 제목, 아티스트 명으로 검색하세요</div>
      </div>
    </>
  );
}

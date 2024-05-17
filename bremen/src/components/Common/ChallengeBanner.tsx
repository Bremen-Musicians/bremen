/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */

import styles from '@/components/Common/ChallengeBanner.module.scss';

interface ChallengeBannerProps {
  image: string;
}
const ChallengeBanner: React.FC<ChallengeBannerProps> = ({image}) => {
  return (
    <>
      <div className={styles.challenge}>
        <img
          src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${image}`}
          alt={image}
          className={styles.thumbnail}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    </>
  );
};

export default ChallengeBanner;

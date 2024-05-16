'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/Common/Video.module.scss';

export default function Video({id, title, videoUrl}: {id: number, title: string, videoUrl: string}) {
  const router = useRouter();
  const viewVideo = () => {
    router.push(`/detail/${id}`);
  };

  return (
    <div className={styles.cell} onClick={viewVideo}>
      <div className={styles.video}>
        <p className={styles.videotitle}>
          {title}
        </p>
      </div>
    </div>
  );
}

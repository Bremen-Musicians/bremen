'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/Common/Video.module.scss';

export default function Video({id, title}: {id: number, title: string}) {
  const router = useRouter();
  const viewVideo = () => {
    router.push(`/detail/2`);
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

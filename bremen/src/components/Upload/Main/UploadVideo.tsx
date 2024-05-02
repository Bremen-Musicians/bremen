'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/Upload/Main/UploadVideo.module.scss';

export default function Video() {
  const router = useRouter();
  const viewVideo = () => {
    router.push('/upload/editsolo');
  };

  return (
    <div className={styles.cell} onClick={viewVideo}>
      <div className={styles.video}>
        <p className={styles.videotitle}>
          [Bass] 대학생 베이스 커버 연주 어쩌구 저쩌구 두줄에서 잘린다
        </p>
      </div>
    </div>
  );
}

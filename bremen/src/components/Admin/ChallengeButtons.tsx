'use client';

import {useRouter} from 'next/navigation';
import styles from './ChallengeButtons.module.scss';

export default function ChallengeButtons() {
  const router = useRouter();
  const clickAdminBtn = (btn: number) => {
    if (btn === 0) {
      // 챌린지 정보 등록 버튼 클릭
      router.push('/admin/challenge');
    } else if (btn === 1) {
      // 챌린지 결과 생성 버튼 클릭
      router.push('/admin/makevideo/1');
    }
  };

  return (
    <div className={styles.adminbuttons}>
      <div onClick={() => clickAdminBtn(0)} className={styles.adminbutton}>
        챌린지 정보 등록
      </div>
      <div onClick={() => clickAdminBtn(1)} className={styles.adminbutton}>
        챌린지 결과 생성
      </div>
    </div>
  );
}

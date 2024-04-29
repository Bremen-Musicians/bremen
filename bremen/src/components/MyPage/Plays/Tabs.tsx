'use client';

import {useState} from 'react';
import styles from '@/components/MyPage/Plays/Tabs.module.scss';
import Plays from './Plays';

export default function Tabs() {
  const [isSolo, setSolo] = useState(true);
  const handleTab = (tab: number) => {
    if (tab === 0) {
      // 왼쪽 탭을 눌러 솔로 영상만 조회
      setSolo(true);
    } else if (tab === 1) {
      // 오른쪽 탭을 눌러 합주 영상만 조회
      setSolo(false);
    }
  };

  return (
    <>
      {/* <div className={styles.line} /> */}
      <div className={styles.tabs}>
        <div className={styles.tab} onClick={() => handleTab(0)}>
          독주
        </div>
        <div className={styles.tab} onClick={() => handleTab(1)}>
          합주
        </div>
      </div>
      {isSolo ? <Plays tab="독주" /> : <Plays tab="합주" />}
    </>
  );
}

'use client';

import styles from './Challenge.module.scss';
import FindSong from './FindSong';
import FindDate from './FindDate';
import IntroChallenge from './IntroChallenge';

export default function Challenge() {
  const submit = () => {
    // eslint-disable-next-line no-console
    console.log('제출!');
  };

  return (
    <div className={styles.page}>
      <span className={styles.title}>챌린지 정보 등록</span>
      <div className={styles.challengepage}>
        <FindSong />
        <FindDate />
        <IntroChallenge />

        {/* 등록 */}
        <div onClick={submit} className={styles.submitbutton}>
          등록
        </div>
      </div>
    </div>
  );
}

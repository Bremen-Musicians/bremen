'use client';

import styles from './Challenge.module.scss';
import FindSong from './FindSong';
import FindDate from './FindDate';
import IntroChallenge from './IntroChallenge';

export default function Challenge() {
  const submit = () => {
    console.log('제출!');
  };

  return (
    <div className={styles.challengepage}>
      <FindSong />
      <FindDate />
      <IntroChallenge />

      {/* 등록 */}
      <div onClick={submit} className={styles.submitbutton}>
        등록
      </div>
    </div>
  );
}

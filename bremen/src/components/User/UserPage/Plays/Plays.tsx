import styles from '@/components/MyPage/Plays/Plays.module.scss';
import Play from './Play';

export default function Plays({tab}: {tab: string}) {
  return (
    <>
      <span>{tab}</span>
      <div className={styles.myvideolist}>
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
        <Play />
      </div>
    </>
  );
}

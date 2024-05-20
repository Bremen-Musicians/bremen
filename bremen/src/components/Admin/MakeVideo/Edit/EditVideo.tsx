import {useRouter} from 'next/navigation';
import styles from './EditVideo.module.scss';
import SelectedVideo from './SelectedVideo';

export default function MakeVideo() {
  const router = useRouter();
  const goNextStep = () => {
    router.push('/admin/makevideo/3');
  };

  return (
    <div className={styles.page}>
      <span className={styles.title}>지난 주 챌린지 합주 생성</span>

      {/* Edit Area */}
      <div className={styles.editarea}>
        {/* 비디오 */}
        <div className={styles.video}></div>

        {/* 음량조절 */}
        <div className={styles.volume}>
          <span>음량</span>
          <div className={styles.range}></div>
        </div>

        {/* 가위 */}
        <div className={styles.cut}>
          <div className={styles.cutbtn}></div>
        </div>
      </div>

      <div className={styles.list}>
        <SelectedVideo instrument="바이올린" video="asdfalskdj" />
        <SelectedVideo instrument="비올라" video="asdfalskdj" />
        <SelectedVideo instrument="더블베이스" video="asdfalskdj" />
        <SelectedVideo instrument="첼로" video="asdfalskdj" />
        <SelectedVideo instrument="플룻" video="asdfalskdj" />
        <SelectedVideo instrument="바이올린" video="asdfalskdj" />
        <SelectedVideo instrument="비올라" video="asdfalskdj" />
        <SelectedVideo instrument="더블베이스" video="asdfalskdj" />
        <SelectedVideo instrument="첼로" video="asdfalskdj" />
        <SelectedVideo instrument="플룻" video="asdfalskdj" />
      </div>

      <div onClick={goNextStep} className={styles.nextbtn}>
        다음
      </div>
    </div>
  );
}

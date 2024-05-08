import {useRouter} from 'next/navigation';
import styles from './SelectVideo.module.scss';
import ChallengeVideo from './ChallengeVideo';

export default function SelectVideo() {
  const router = useRouter();
  const goNextStep = () => {
    router.push('/admin/makevideo/2');
  };

  return (
    <div className={styles.page}>
      <span className={styles.title}>지난 주 챌린지 합주 생성</span>
      <div className={styles.list}>
        <ChallengeVideo />
        <ChallengeVideo />
        <ChallengeVideo />
        <ChallengeVideo />
        <ChallengeVideo />
      </div>

      {/* 다음 버튼 */}
      <div onClick={goNextStep} className={styles.nextbtn}>
        다음
      </div>
    </div>
  );
}

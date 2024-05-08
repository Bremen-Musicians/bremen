import {useRouter} from 'next/navigation';
import styles from './IntroVideo.module.scss';
import Participants from './Participants';

export default function IntroVideo() {
  const router = useRouter();
  const goNextStep = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.page}>
      <span className={styles.pagetitle}>지난 주 챌린지 합주 생성</span>
      <div className={styles.introarea}>
        {/* 비디오 */}
        <div className={styles.video}></div>

        {/* 제목 입력창 */}
        <div className={styles.title}>
          <span>제목</span>
          <div className={styles.videotitle}>
            <input type="text"></input>
          </div>
        </div>

        {/* 합주 참여자 목록 */}
        <div className={styles.title}>
          <span>합주 참여자</span>
          <div className={styles.participantslist}>
            <Participants instruments="기타" userNickName="기타등등" />
            <Participants instruments="바이올린" userNickName="비올라칭구" />
            <Participants instruments="드럼" userNickName="두둥탁둥탁" />
          </div>
        </div>

        {/* 상세 설명 */}
        <div className={styles.title}>
          <span>상세 설명</span>
          <div className={styles.contents}>
            <textarea />
          </div>
        </div>
      </div>

      {/* 다음 버튼 */}
      <div onClick={goNextStep} className={styles.nextbtn}>
        업로드
      </div>
    </div>
  );
}

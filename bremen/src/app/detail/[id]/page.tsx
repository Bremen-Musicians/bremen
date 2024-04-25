'use client';

import Footer from '@/components/Common/Footer';
import styles from '@/app/detail/[id]/page.module.scss';
import ReplyArea from '@/components/detail/ReplyArea';

export default function Page() {
  return (
    <>
      {/* 영상 재생 영역 */}
      <div className={styles.video}></div>

      {/* 영상 설명 영역 */}
      <div>
        {/* 영상 제목 */}
        <div className={styles.title}>
          <p>
            [Bass] 대학생 베이스 커버 연주 어쩌구 저쩌구 두줄에서 잘린다 제목이
            너무길어 정말길어서 잘리는걸 봐야겠어
          </p>
        </div>

        {/* 영상 추가 정보(조회수, 올린 시간 및 날짜) */}
        <div className={styles.discript}>
          <p>조회수 2,352,309회</p>
          <p>8시간 전</p>
        </div>

        {/* 영상 게시자 정보 */}
        <div className={styles.userinfo}>
          <div className={styles.profileimg} />
          <p>우주최강베이시스트</p>
          <p>12</p>
          <p>팔로우</p>
        </div>

        {/* 좋아요 버튼 및 태그 */}
        <div></div>
      </div>

      {/* 댓글 영역 */}
      {/* 
        댓글 창이 닫혀 있을 때에는 ReplyHighlight component가 활성화 : 아래에 연관 동영상 목록을 제공
        댓글 창이 열려 있을 때에는 Replies component가 활성화
         -> 여기서 한 depth 더 들어가면 하나의 댓글과 답댓글을 확인할 수 있는 component가 활성화
      */}
      <ReplyArea />

      <Footer />
    </>
  );
}

import styles from '@/components/detail/Reply.module.scss';

export default function Reply() {
  return (
    <div className={styles.reply}>
      <div className={styles.profileimg} />
      <div>
        {/* 댓글 단 사람 */}
        <div className={styles.replier}>닉네임 | 3시간 전</div>
        {/* 댓글 내용 */}
        <div>
          정말 완벽한 연주입니다! 어떻게 이렇게 멋있으실 수 있을까요 저도
          ㅇㅇ님처럼 멋있게 베이스 연주를 할 수 있었으면 좋겠습니다. 그날까지
          열심히 연습할게요 화이팅!
        </div>
        {/* 답글 버튼 */}
        <p>답글 달기</p>
      </div>
    </div>
  );
}

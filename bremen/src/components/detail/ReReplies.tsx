import styles from '@/components/detail/ReReplies.module.scss';
import ReReply from '@/components/detail/ReReply';

export default function ReReplies() {
  return (
    <div>
      {/* 원본 댓글 */}
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
        </div>
      </div>

      {/* 답댓글 리스트 */}
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
      <ReReply />
    </div>
  );
}

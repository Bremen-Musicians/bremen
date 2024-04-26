import styles from '@/components/detail/ReReply.module.scss';

export default function ReReply() {
  return (
    <div className={styles.rereply}>
      <div className={styles.profileimg} />
      <div>
        {/* 답댓글 단 사람 */}
        <div className={styles.rereplier}>답댓글단사람 | 3시간 전</div>
        {/* 답댓글 내용 */}
        <div>
          저도 집에 가고 싶습니다! 그래도 오늘은 금요일입니다. 내일은 늦게
          일어날 수 있는 날이지요.
        </div>
      </div>
    </div>
  );
}

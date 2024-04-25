import styles from '@/components/detail/ReplyHighlight.module.scss';
import Video from '@/components/Common/Video';

export default function replyHighlight({
  replyHandler,
}: {
  replyHandler: () => void;
}) {
  return (
    <>
      <div className={styles.cell} onClick={replyHandler}>
        <div className={styles.title}>
          <p>댓글</p>
          <p>40</p>
        </div>
        <div className={styles.reply}>
          <div className={styles.profileimg}></div>
          <div>너무 멋진 연주네요~~~!~! 항상 좋은 연주 감사합니다</div>
        </div>
      </div>
      <div className={styles.videolist}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
    </>
  );
}

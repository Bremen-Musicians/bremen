import Reply from '@/components/detail/Reply';
import styles from '@/components/detail/Replies.module.scss';

export default function Replies({replyHandler}: {replyHandler: () => void}) {
  return (
    <div className={styles.replylist}>
      <div className={styles.title}>
        <p>댓글</p>
        <p onClick={replyHandler}>X</p>
      </div>
      <div>
        <Reply />
        <Reply />
        <Reply />
        <Reply />
        <Reply />
        <Reply />
        <Reply />
      </div>
    </div>
  );
}

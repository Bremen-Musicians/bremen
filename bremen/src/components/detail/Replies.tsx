import {useState} from 'react';
import Reply from '@/components/detail/Reply';
import styles from '@/components/detail/Replies.module.scss';
import ReReplies from './ReReplies';

export default function Replies({replyHandler}: {replyHandler: () => void}) {
  const [openReReply, setOpenReReply] = useState(false);
  const handleReReply = () => {
    setOpenReReply(!openReReply);
  };

  return (
    <>
      <div className={styles.replylist}>
        <div className={styles.title}>
          {openReReply ? (
            <>
              <p>답글</p>
              <p onClick={handleReReply}>X</p>
            </>
          ) : (
            <>
              <p>댓글</p>
              <p onClick={replyHandler}>X</p>
            </>
          )}
        </div>

        {openReReply ? (
          <ReReplies />
        ) : (
          <>
            <Reply reReplyHandler={handleReReply} />
            <Reply reReplyHandler={handleReReply} />
            <Reply reReplyHandler={handleReReply} />
            <Reply reReplyHandler={handleReReply} />
            <Reply reReplyHandler={handleReReply} />
            <Reply reReplyHandler={handleReReply} />
          </>
        )}
      </div>
      {!openReReply && (
        <>
          <div className={styles.replyinput}>
            <input type="text"></input>
            <div>등록</div>
          </div>
          <div className={styles.pagebottom} />
        </>
      )}
    </>
  );
}

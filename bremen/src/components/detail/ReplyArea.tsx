import styles from '@/components/detail/ReplyArea.module.scss';
import {useState} from 'react';
import ReplyHighlight from './ReplyHighlight';
import Replies from './Replies';
import Footer from '../Common/Footer';

export default function ReplyArea() {
  const [openReply, setOpenReply] = useState(false);
  const handleReply = () => {
    setOpenReply(!openReply);
  };

  return (
    <div>
      {openReply ? (
        <Replies replyHandler={handleReply} />
      ) : (
        <>
          <ReplyHighlight replyHandler={handleReply} />
          <div className={styles.pagebottom} />
          <Footer />
        </>
      )}
    </div>
  );
}

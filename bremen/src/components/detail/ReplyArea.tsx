import {useState} from 'react';
import ReplyHighlight from './ReplyHighlight';
import Replies from './Replies';

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
        <ReplyHighlight replyHandler={handleReply} />
      )}
    </div>
  );
}

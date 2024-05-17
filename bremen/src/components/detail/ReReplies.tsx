import moment from 'moment';
import styles from '@/components/detail/ReReplies.module.scss';
import ReReply from '@/components/detail/ReReply';
import api from '@/api/api';
import {useState} from 'react';
import ProfileImage from '../Common/ProfileImage';

interface IReply {
  id: number; // 댓글의 고유 id
  groupCnt: number; // 대댓글이 총 몇개 있는지 알려줌
  content: string;
  writerNickname: string;
  profile: string;
  createTime: string;
  children: IReply[]; // 대댓글 목록
  deleted: boolean;
  updated: boolean;
}

export default function ReReplies({reply}: {reply: IReply}) {
  const [input, setInput] = useState<string>('');

  const postReReply = () => {
    api
      .post(`/comments`, {
        groupId: reply.id,
        content: input,
        articleId: 2,
      })
      .then(() => {
        setInput('');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  return (
    <>
      <div className={styles.rereplylist}>
        {/* 원본 댓글 */}
        <div className={styles.reply}>
          <div className={styles.profileimg}>
            <ProfileImage
              userNickname={reply.writerNickname}
              profileImage={reply.profile}
            />
          </div>
          <div>
            {/* 댓글 단 사람 */}
            <div className={styles.replier}>
              {reply.writerNickname} | {moment(reply.createTime).fromNow()}
            </div>
            {/* 댓글 내용 */}
            <div>{reply.content}</div>
          </div>
        </div>

        {/* 답댓글 리스트 */}
        {reply.children &&
          reply.children.map((rereply, key) => (
            <ReReply rereply={rereply} key={key} />
          ))}
      </div>
      <div className={styles.rereplyinput}>
        <input
          type="text"
          placeholder="답글 입력..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => (e.key === 'Enter' ? postReReply() : null)}
        />
        <div>등록</div>
      </div>
      <div className={styles.pagebottom} />
    </>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import styles from '@/components/detail/ReReply.module.scss';
import useUserInfoStore from '@/stores/UserInfo';
import {useEffect, useState} from 'react';
import api from '@/api/api';
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

export default function ReReply({
  rereply,
  deleteReply,
  getReply,
}: {
  rereply: IReply;
  deleteReply: (id: number) => void;
  getReply: () => void;
}) {
  const {zustandUserNickname} = useUserInfoStore.getState();
  const [myReply, setMyReply] = useState<boolean>(false);
  const [modifyStatus, setModifyStatus] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');

  useEffect(() => {
    if (zustandUserNickname === rereply.writerNickname) {
      setMyReply(true);
    }
  }, []);

  // 댓글 수정 창 띄우기
  const clickModify = () => {
    setInput(rereply.content);
    setModifyStatus(true);
  };

  // 댓글 수정 창 닫기
  const cancleModify = () => {
    setModifyStatus(false);
  };

  // 댓글 수정 api
  const modifyReply = (id: number, content: string) => {
    api
      .patch(`/comments`, {
        id: rereply.id, // 댓글 id
        content, // 수정된 댓글 내용
      })
      .then(() => {
        // eslint-disable-next-line no-alert
        alert('댓글이 수정되었습니다.');
        getReply();
        setModifyStatus(false);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  return (
    <div className={styles.rereply}>
      <div className={styles.profileimg}>
        <ProfileImage
          userNickname={rereply.writerNickname}
          profileImage={rereply.profile}
        />
      </div>

      {modifyStatus ? (
        <div className={styles.modify}>
          <input
            type="text"
            placeholder="답글 입력..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e =>
              e.key === 'Enter' ? modifyReply(rereply.id, input) : null
            }
          />

          <div className={styles.btn}>
            <span onClick={cancleModify}>닫기</span> |{' '}
            <span onClick={() => modifyReply(rereply.id, input)}>수정</span>
          </div>
        </div>
      ) : (
        <div>
          <div className={styles.replytop}>
            {/* 답댓글 단 사람 */}
            <div className={styles.rereplier}>
              {rereply.writerNickname} | {moment(rereply.createTime).fromNow()}
            </div>

            {/* 내가 단 댓글이면 보일 것 */}
            {myReply && (
              <div className={styles.modifydelete}>
                <span onClick={clickModify}>수정</span> |{' '}
                <span onClick={() => deleteReply(rereply.id)}>삭제</span>
              </div>
            )}
          </div>

          {/* 답댓글 내용 */}
          <div>{rereply.content}</div>
        </div>
      )}
    </div>
  );
}

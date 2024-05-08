'use client';

import {useEffect, useState} from 'react';
import Tag from '@/components/Common/Tag';
import {api} from '@/api/api';
import ReplyArea from './ReplyArea';
import styles from './index.module.scss';

interface IPost {
  title: string;
  content: string;
  hitCnt: number;
  likeCnt: number;
  createTime: string;
  username: string; // 이메일
  nickname: string;
  videoId: number;
  videoUrl: string;
  imageUrl: string;
  like: boolean;
}

interface IPostResponse {
  status: number;
  message: string;
  data: IPost;
}

export default function Page() {
  const [post, setPost] = useState<IPost>();
  const [isLiked, setLiked] = useState(false);
  const [didMount, setDidMount] = useState(false);
  const toggleLiked = () => {
    setLiked(!isLiked);
  };

  useEffect(() => {
    setDidMount(true);
    return () => {};
  });

  useEffect(() => {
    // 2번 게시글 조회(임시)
    if (didMount) {
      api
        .get<IPostResponse>(`/articles?id=2`)
        .then(response => {
          const postData = response.data.data;
          setPost(postData);
          setLiked(postData.like);
        })
        .catch(error => {
          console.error('에러!', error);
        });
    }
  }, [didMount]);

  return (
    <>
      {/* 영상 재생 영역 */}
      <div className={styles.video}></div>

      {/* 영상 설명 영역 */}
      <div>
        {/* 영상 제목 */}
        <div className={styles.title}>
          <p>
            {/* [Bass] 대학생 베이스 커버 연주 어쩌구 저쩌구 두줄에서 잘린다 제목이
            너무길어 정말길어서 잘리는걸 봐야겠어 */}
            {post?.title}
          </p>
        </div>

        {/* 영상 추가 정보(조회수, 올린 시간 및 날짜) */}
        <div className={styles.discript}>
          <p>조회수 {post?.hitCnt}회</p>
          <p>{post?.createTime}</p>
        </div>

        {/* 영상 게시자 정보 */}
        <div className={styles.userinfo}>
          <div className={styles.profileimg} />
          <p>{post?.nickname}</p>
          <p>12</p>
          <p>팔로우</p>
        </div>

        {/* 좋아요 버튼 및 태그 */}
        <div className={styles.taglist}>
          {isLiked ? (
            <div className={styles.liked} onClick={toggleLiked}>
              따봉 4
            </div>
          ) : (
            <div className={styles.disliked} onClick={toggleLiked}>
              따봉 3
            </div>
          )}
          <Tag />
          <Tag />
          <Tag />
          <Tag />
          <Tag />
        </div>
      </div>

      {/* 댓글 영역 */}
      {/* 
        댓글 창이 닫혀 있을 때에는 ReplyHighlight component가 활성화 : 아래에 연관 동영상 목록을 제공
        댓글 창이 열려 있을 때에는 Replies component가 활성화
         -> 여기서 한 depth 더 들어가면 하나의 댓글과 답댓글을 확인할 수 있는 component가 활성화
      */}
      <ReplyArea />
    </>
  );
}

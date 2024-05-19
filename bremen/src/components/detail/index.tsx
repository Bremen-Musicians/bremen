'use client';

/* eslint-disable no-console */

import {useEffect, useState} from 'react';
import moment from 'moment';
import {useParams} from 'next/navigation';
import {MdThumbUp} from 'react-icons/md';
import 'moment/locale/ko';
import api from '@/api/api';
import Tag from '@/components/Common/Tag';
import ReplyArea from './ReplyArea';
import styles from './index.module.scss';

interface IPost {
  id: number;
  title: string;
  content: string;
  hitCnt: number;
  likeCnt: number;
  createTime: string;
  userId: number;
  username: string; // 이메일
  nickname: string;
  videoId: number;
  videoUrl: string;
  imageUrl: string;
  hashtags: string[]; // 해시태그
  like: boolean;
}

interface IPostResponse {
  status: number;
  message: string;
  item: IPost;
}

export default function Page() {
  const param = useParams();
  const articleId = param.id;
  const [post, setPost] = useState<IPost>();
  const [isLiked, setLiked] = useState(false);
  const [didMount, setDidMount] = useState(false);

  // 게시글 전체 정보 받기
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setDidMount(true);
    return () => {};
  });

  useEffect(() => {
    // 2번 게시글 조회(임시)
    if (didMount) {
      const searchArticle: string =
        typeof articleId === 'string' ? articleId : articleId[0];
      api
        .get<IPostResponse>(`/articles/detail?id=${searchArticle}`)
        .then(response => {
          const postData = response.data.item;
          setPost(postData);
          setLiked(postData.like);
        })
        .catch(error => {
          console.error('에러!', error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didMount]);
  // 게시글 전체 정보 받기 끝

  // 게시글 좋아요 누르기
  const clickLikeBtn = () => {
    const searchArticle: string =
      typeof articleId === 'string' ? articleId : articleId[0];
    api
      .post(`/articles/like?articleId=${searchArticle}`, {liked: !isLiked})
      .then(response => {
        if (response.status < 300) {
          setPost(prevPost => {
            if (!prevPost) {
              // 이전 상태가 없는 경우에 대한 처리
              return prevPost;
            }

            // 이전 상태가 있는 경우
            const updatedPost = {...prevPost};

            if (isLiked) {
              updatedPost.likeCnt -= 1;
            } else {
              updatedPost.likeCnt += 1;
            }

            return updatedPost;
          });

          setLiked(!isLiked);
        } else {
          console.error('좋아요 업데이트 실패:', response.status);
        }
      })
      .catch(error => {
        console.error('좋아요 업데이트 실패:', error);
      });
  };

  return (
    <>
      {/* 영상 재생 영역 */}
      <div className={styles.video}>
        <video
          src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${post?.videoUrl}`}
          controls
        ></video>
      </div>

      {/* 영상 설명 영역 */}
      <div>
        {/* 영상 제목 */}
        <div className={styles.title}>
          <p>{post?.title}</p>
        </div>

        {/* 영상 추가 정보(조회수, 올린 시간 및 날짜) */}
        <div className={styles.discript}>
          <p>조회수 {post?.hitCnt}회</p>
          <p>{moment(post?.createTime).fromNow()}</p>
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
            <div className={styles.liked} onClick={clickLikeBtn}>
              <MdThumbUp />
              <span>{post && post.likeCnt}</span>
            </div>
          ) : (
            <div className={styles.disliked} onClick={clickLikeBtn}>
              <MdThumbUp />
              <span>{post && post.likeCnt}</span>
            </div>
          )}
          {post?.hashtags &&
            post.hashtags.map((hashtag, key) => (
              <Tag tag={hashtag} key={key} />
            ))}
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

'use client';

import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import api from '@/api/api';
import {IMainResponse, IArticleList} from '@/types/ArticleListResponse';
import {useInView} from 'react-intersection-observer';
import Video from '@/components/Common/Video';
import UserPageHeader from './Profile/MyPageHeader';
import UserInfo from './Profile/MyInfo';
import UserButtons from './Profile/MyButtons';
import styles from './UserPage.module.scss';

interface IUser {
  username: string;
  nickname: string;
  introduce: string;
  profileImage: string;
  followerCnt: number;
  followCnt: number;
  follow: boolean;
}

interface IUserResponse {
  status: number;
  message: string;
  item: IUser;
}

interface IFollowResponse {
  status: number;
  message: string;
  item: string;
}

export default function UserPage() {
  const param = useParams();
  const [user, setUser] = useState<IUser>();
  const [size, setSize] = useState<number>(0);
  const [userArticles, setUserArticles] = useState<IArticleList[]>([]);
  const [page, setPage] = useState<number>(0);
  const [ref, inView] = useInView();

  const getArticles = () => {
    api
      .get<IMainResponse>(
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        `/articles?nickname=${param.nickname}&page=${page}&size=12`,
      )
      .then(response => {
        const listData: IArticleList[] = response.data.items;
        setUserArticles(prevList => [...prevList, ...listData]);
        setSize(response.data.size);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  // 페이지 하단 감지
  useEffect(() => {
    if (inView) {
      getArticles();
      setPage(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  // 유저 정보 불러오기
  const getUserInfo = () => {
    // eslint-disable-next-line no-console
    api
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get<IUserResponse>(`/users?nickname=${param.nickname}`)
      .then(response => {
        setUser(response.data.item);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  const handleFollow = () => {
    if (user) {
      api
        .get<IFollowResponse>(`/users/follow?nickname=${user.nickname}`)
        .then(() => {
          getUserInfo();
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error, '에러!');
        });
    }
  };

  // 처음 페이지 방문 시
  useEffect(() => {
    getUserInfo();
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user && (
        <>
          <UserPageHeader nickname={user.nickname} />
          <UserInfo user={user} articleCnt={size} />
          <UserButtons follow={user.follow} handleFollow={handleFollow} />
          {userArticles.length !== 0 ? (
            userArticles.map((video, key) => (
              <Video
                key={key}
                id={video.id}
                title={video.title}
                videoUrl={video.videoUrl}
                thumbnail={video.imageUrl}
                ref={null}
              />
            ))
          ) : (
            <div className={styles.nocontent}>
              <span>작성된 게시글이 없습니다</span>
            </div>
          )}
          <div ref={ref}></div>
        </>
      )}
    </div>
  );
}

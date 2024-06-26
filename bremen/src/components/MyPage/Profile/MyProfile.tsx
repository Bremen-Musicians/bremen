'use client';

import {useEffect, useState} from 'react';
import {useInView} from 'react-intersection-observer';
import MyPageHeader from '@/components/MyPage/Profile/MyPageHeader';
import api from '@/api/api';
import useUserInfoStore from '@/stores/UserInfo';
import Video from '@/components/Common/Video';
import {IMainResponse, IArticleList} from '@/types/ArticleListResponse';
import MyInfo from './MyInfo';
import MyButtons from './MyButtons';
import styles from './MyProfile.module.scss';

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

export default function MyProfile() {
  const {zustandUserNickname} = useUserInfoStore.getState();
  const [me, setMe] = useState<IUser>();
  const [size, setSize] = useState<number>(0);
  const [myArticles, setMyArticles] = useState<IArticleList[]>([]);
  const [page, setPage] = useState<number>(0);
  const [ref, inView] = useInView();

  // 목록 불러오기
  const getArticles = () => {
    api
      .get<IMainResponse>(
        `/articles?nickname=${zustandUserNickname}&page=${page}&size=12`,
      )
      .then(response => {
        const listData: IArticleList[] = response.data.items;
        setMyArticles(prevList => [...prevList, ...listData]);
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

  // 처음 페이지 방문 시
  useEffect(() => {
    api
      .get<IUserResponse>(`/users?nickname=${zustandUserNickname}`)
      .then(response => {
        setMe(response.data.item);

        getArticles();
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zustandUserNickname]);

  return (
    <div>
      {me && (
        <>
          <MyPageHeader nickname={me.nickname} />
          <MyInfo me={me} articleCnt={size} />
          <MyButtons />
          {myArticles.length !== 0 ? (
            <div className={styles.content}>
              {myArticles.map((video, key) => (
                <Video
                  key={key}
                  id={video.id}
                  title={video.title}
                  videoUrl={video.videoUrl}
                  thumbnail={video.imageUrl}
                  ref={null}
                />
              ))}
            </div>
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

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

'use client';

import '@/styles/reset.css';
import styles from '@/components/Main/index.module.scss';
import Video from '@/components/Common/Video';
import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import {useEffect, useState} from 'react';
import api from '@/api/api';
import {IMainResponse, IArticleList} from '@/types/ArticleListResponse';
import {useInView} from 'react-intersection-observer';

export default function Home() {
  const [order] = useState<string>('POPULAR');
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<IArticleList[]>([]);
  const [ref, inView] = useInView();

  const feedAPI = () => {
    api
      .get<IMainResponse>(`/articles/feed?order=${order}&page=${page}&size=12`)
      .then(response => {
        const listData = response.data.items;
        setList(prevList => [...prevList, ...listData]);
      })
      .catch(error => {
        console.error('에러!', error);
      });
  };

  // 페이지 하단 감지
  useEffect(() => {
    if (inView) {
      feedAPI();
      setPage(page + 1);
      console.log(page);
    }
  }, [inView]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.challenge}>챌린지광고</div>
        <div className={styles.videocontainer}>
          <div className={styles.shortstitle}>쇼츠</div>
          <div className={styles.videolist}>
            {list.map((video, key) => (
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
          <div ref={ref} className={styles.videomargin}></div>
        </div>
      </div>
      <Header />
      <Footer />
    </>
  );
}

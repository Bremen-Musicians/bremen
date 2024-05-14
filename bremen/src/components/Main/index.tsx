'use client';

import '@/styles/reset.css';
import styles from '@/components/Main/index.module.scss';
import Video from '@/components/Common/Video';
import Footer from '@/components/Common/Footer';
import Header from '@/components/Common/Header';
import { useEffect, useState } from 'react';
import api from '@/api/api';
import {IMainResponse, IArticleList} from '@/types/ArticleListResponse'

export default function Home() {
  const [order, setOrder] = useState<string>('POPULAR');
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(10);
  const [list, setList] = useState<IArticleList[]>([]);
  // const [ref, inView] = useInView();

  useEffect(() => {
    api.get<IMainResponse>(`/articles/feed?order=${order}&page=${page}&size=${size}&sort=string`).then((response) => {
      const listData = response.data.items;
      setList(listData);
    }).catch(error => {
      console.error('에러!', error);
    })
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.challenge}>챌린지광고</div>
        <div className={styles.videocontainer}>
          <div className={styles.shortstitle}>쇼츠</div>
          <div className={styles.videolist}>
            {list.map((video, key) => <Video id={video.id} title={video.title} />)}
          </div>
          <div className={styles.videomargin}></div>
        </div>
      </div>
      <Header />
      <Footer />
    </>
  );
}

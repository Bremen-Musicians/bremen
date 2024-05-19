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
import Link from 'next/link';
import ChallengeBanner from '../Common/ChallengeBanner';

export default function Home() {
  const [order] = useState<string>('POPULAR');
  const [page, setPage] = useState<number>(0);
  const [list, setList] = useState<IArticleList[]>([]);
  const [ref, inView] = useInView();
  const [challengeImage, setChallengeImage] = useState<string>();

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
  interface ChallengeData {
    item: {
      mainImage: string;
    };
  }
  const fetchLatestChallenge = async () => {
    try {
      const url = '/challenges/latest';
      const response = await api.get<ChallengeData>(url);
      console.log('최신 챌린지:', response.data);
      console.log('이미지', response.data.item.mainImage);
      setChallengeImage(response.data.item.mainImage);
    } catch (error) {
      console.error('최신 챌린지를 불러오는 중 오류가 발생했습니다:', error);
    }
  };
  // 페이지 하단 감지
  useEffect(() => {
    fetchLatestChallenge().catch(error => console.error(error));
    if (inView) {
      feedAPI();
      setPage(page + 1);
      console.log(page);
    }
  }, [inView]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.topMargin}></div>
        <Link href="/challenge" className={styles.challenge}>
          <ChallengeBanner image={challengeImage || ''} />
        </Link>
        <div className={styles.videocontainer}>
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

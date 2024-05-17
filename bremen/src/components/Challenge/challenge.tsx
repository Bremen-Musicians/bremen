import React, { useState, useEffect } from 'react';
import Header from '@/components/Common/Header';
import api from '@/api/api';
import styles from '@/components/Challenge/Challenge.module.scss';
import { EnsembleVideoItem, VideoItem } from '@/types/Challenge';
import Slider from './slider';

const instruments = ['전체', '기타', '베이스', '드럼', '키보드', '보컬(여)'];

const Challenge: React.FC = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [envideos, setEnVideos] = useState<EnsembleVideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<VideoItem[]>([]); // 현재 인덱스 상태 추가

  useEffect(() => {
    const fetchEnsembleVideos = async () => {
      try {
        const response = await api.get('/challenges/ensembles');
        console.log(response.data);
        const mappedEnVideos = response.data.items.map((item: EnsembleVideoItem) => ({
          id: item.id,
          musicTitle: item.musicTitle,
          startTime: formatDate(item.startTime),
          endTime: formatDate(item.endTime),
        }));
        setEnVideos(mappedEnVideos);
      } catch (error) {
        console.error('지난 챌린지 영상을 가져오는 중 에러 발생:', error);
      }
    };
    fetchEnsembleVideos();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setShowHeader(window.innerWidth >= 450);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const showPreviousVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNextVideo = () => {
    if (currentIndex < envideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
  };

  return (
    <div className={styles.container}>
      {showHeader && <Header />}
      <div className={styles.challengeHeader}>지난 챌린지 선정영상</div>
      <div className={styles.ensembleVideos}>
        <Slider />
        {/* 이전 버튼 */}
        <button className={styles.navButton} onClick={showPreviousVideo}>
          {'<'}
        </button>
        {/* envideos를 한 줄에 표시 */}
        <div key={envideos[currentIndex]?.id} className={styles.video}>
          <div className={styles.title}>{envideos[currentIndex]?.musicTitle}</div>
          <div className={styles.time}>
            <div className={styles.title}>{envideos[currentIndex]?.startTime}</div>
            <div className={styles.title}>{envideos[currentIndex]?.endTime}</div>
          </div>
        </div>
        {/* 다음 버튼 */}
        <button className={styles.navButton} onClick={showNextVideo}>
          {'>'}
        </button>
      </div>
      <div className={styles.currentChallenge}>
        <h2>이 주의 챌린지</h2>
        <p>작은 것들을 위한 시 - BTS</p>
        <p>24.04.22 15:00 ~ 24.04.29 14:30</p>
        <p>개발자가 좋아해서 선정한 곡</p>
        <p>악기별 1위 커피 기프티콘 제공</p>
        <p>많은 참여 부탁</p>
      </div>
      <div className={styles.videoSection}>
        <h3>현재 악기별 인기 챌린지 동영상</h3>
        <div className={styles.instruments}>
          {instruments.map((instrument, index) => (
            <button key={index}>{instrument}</button>
          ))}
        </div>
        <div className={styles.videos}>
          {/* videos 부분은 기존과 동일 */}
        </div>
      </div>
    </div>
  );
};

export default Challenge;

// C:\pjt3\S10P31A104\bremen\src\components\Challenge\challenge.tsx

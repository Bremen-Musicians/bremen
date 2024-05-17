import React, { useState, useEffect } from 'react';
import Header from '@/components/Common/Header';
import api from '@/api/api';
import styles from '@/components/Challenge/Challenge.module.scss';
import { EnsembleVideoItem, VideoItem } from '@/types/Challenge';


const instruments = ['전체', '기타', '베이스', '드럼', '키보드', '보컬(여)'];

const Challenge: React.FC = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [envideos, setEnVideos] = useState<EnsembleVideoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  useEffect(() => {
    const fetchEnsembleVideos = async () => {
      try {
        const response = await api.get('/challenges/ensembles');
        const mappedEnVideos = response.data.items.map((item: EnsembleVideoItem) => ({
          id: item.id,
          musicTitle: item.musicTitle,
          challengeImage: item.challengeImage,
        }));
        setEnVideos(mappedEnVideos);
      } catch (error) {
        console.error('지난 챌린지 영상을 가져오는 중 에러 발생:', error);
      }
    };
    fetchEnsembleVideos();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/challenges/latest');
        const mappedVideos = response.data.items.map((item: VideoItem) => ({
          id: item.id,
          musicTitle: item.musicTitle,
          challengeImage: item.challengeImage,
        }));
        setVideos(mappedVideos);
      } catch (error) {
        console.error('악기별 챌린지 영상을 가져오는 중 에러 발생:', error);
      }
    };
    fetchVideos();
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

  return (
    <div className={styles.container}>
      {showHeader && <Header />}
      <div className={styles.challengeHeader}>지난 챌린지 선정영상</div>
      <div className={styles.ensembleVideos}>
        {/* envideos를 한 줄에 표시 */}
        {envideos.map(video => (
          <div key={video.id} className={styles.video}>
            <img src={video.challengeImage} alt={video.musicTitle} className={styles.roundedImage}/>
            <div className={styles.title}>{video.musicTitle}</div>
          </div>
        ))}
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
          {videos.length === 0 ? (
            <div className={styles.noVideos}>현재 챌린지 영상이 없습니다.</div>
          ) : (
            videos.map(video => (
              <div key={video.id} className={styles.video}>
                <img src={video.challengeImage} alt={video.musicTitle} />
                <div className={styles.title}>{video.musicTitle}</div>
                <div className={styles.username}>닉네임</div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Challenge;

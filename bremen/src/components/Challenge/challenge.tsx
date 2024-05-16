import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/Challenge/Challenge.module.scss';
import Header from '@/components/Common/Header';
import Video from '@/components/Common/Video';
import Image from 'next/image';
import api from '@/api/api';

interface ensembleVideoItem {
  id: number;
  musicTitle: string;
  challengeImage: string;
}

interface VideoItem {
  id: number;
  musicTitle: string;
  challengeImage: string;
}

const instruments = ['전체','바이올린', '비올라', '첼로', '하프', '플룻', '클라리넷', '트럼펫', '마림바', '피아노', '드럼', '통기타', '베이스기타', '일렉기타', '보컬'];

const Page: React.FC = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [envideos, setEnVideos] = useState<ensembleVideoItem[]>([]);
  const [videos, setVideos] = useState<VideoItem[]>([]);

  // 이전 챌린지 영상 가져오기
  useEffect(() => {
    const fetchEnsembleVideos = async () => {
      try {
        const response = await api.get('/challenges/ensembles');
        console.log('지난 챌린지 영상 데이터:', response.data);
        // Alarm 인터페이스에 맞게 데이터 매핑
        const mappedEnVideos = response.data.items.map((item: any, index: number) => ({
          id: index, // 인덱스를 사용하여 유일한 id 생성
          musicTitle: item.musicTitle,
          challengeImage: item.challengeImage,
        }));
        setEnVideos(mappedEnVideos); // 알림 데이터를 상태로 설정
      } catch (error) {
        console.error('지난 챌린지 영상을 가져오는 중 에러 발생:', error);
      }
    };

    fetchEnsembleVideos();
  }, []);


  // 진행 챌린지 악기별 1위 가져오기
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/challenges/latest');
        console.log('악기별 챌린지 영상 데이터:', response.data);
        // Alarm 인터페이스에 맞게 데이터 매핑
        const mappedVideos = response.data.items.map((item: any, index: number) => ({
          id: index, // 인덱스를 사용하여 유일한 id 생성
          musicTitle: item.musicTitle,
          challengeImage: item.challengeImage,
          profile: item.profilename
        }));
        setVideos(mappedVideos); // 알림 데이터를 상태로 설정
      } catch (error) {
        console.error('악기별 챌린지 영상을 가져오는 중 에러 발생:', error);
      }
    };

    fetchVideos();
  }, []);


  // 너비 450px 이상일때 헤더 보이게 설정
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
    <>
      {showHeader && <Header />}
      <div className={styles.container}>
        <div className={styles.challengeheader1}>
          지난 챌린지 1위
        </div>
        <div
          className={styles.ensembleVideoList}
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
          {envideos.length === 0 ? (
            <div className={styles.noEnsembleVideos}>이전에 선정된 챌린지 영상이 없습니다.</div>
          ) : (
            envideos.map((video: ensembleVideoItem) => (
              <div key={video.id} className={styles.ensembleVideo}>
                <div className={styles.enMusicTitle}>{video.musicTitle}</div>
                <div className={styles.enChallengeImage}>
                  {video.challengeImage}
                </div>
              </div>
            ))
          )}
        </div>
        <div className={styles.firstchallengelist}>
          <button className={styles.deleteAllButton}>
            챌린지 광고
          </button>
        </div>
        <div className={styles.challengeheader2}>
          현재 악기별 인기 챌린지 동영상
        </div>
        <div className={styles.instrumentBoxes}>
          {instruments.map(instrument => (
            <div key={instrument} className={styles.instrumentBox}>
              {instrument}
            </div>
          ))}
        </div>
        <div className={styles.videocontainer}>
          <div className={styles.videolist}>
          {videos.length === 0 ? (
            <div className={styles.noVideos}>현재 챌린지 영상이 없습니다.</div>
          ) : (
            videos.map((video: VideoItem) => (
              <div key={video.id} className={styles.video}>
                <div className={styles.MusicTitle}>{video.musicTitle}</div>
                <div className={styles.ChallengeImage}>
                  {video.challengeImage}
                </div>
              </div>
            ))
          )}
          </div>
          <div className={styles.videomargin}></div>
        </div>
      </div>
    </>
  );
};

export default Page;

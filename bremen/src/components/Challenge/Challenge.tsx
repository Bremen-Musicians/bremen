/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import React, {useState, useEffect} from 'react';
import Header from '@/components/Common/Header';
import api from '@/api/api';
import styles from '@/components/Challenge/Challenge.module.scss';
import {EnsembleVideoItem, ApiResponse} from '@/types/Challenge';
import Video from '@/components/Common/Video';
import {useInView} from 'react-intersection-observer';

const instruments = [
  {id: '1', name: '그 외'},
  {id: '2', name: '바이올린'},
  {id: '3', name: '비올라'},
  {id: '4', name: '첼로'},
  {id: '5', name: '하프'},
  {id: '6', name: '플룻'},
  {id: '7', name: '클라리넷'},
  {id: '8', name: '트럼펫'},
  {id: '9', name: '마림바'},
  {id: '10', name: '피아노'},
  {id: '11', name: '드럼'},
  {id: '12', name: '통기타'},
  {id: '13', name: '베이스기타'},
  {id: '14', name: '일렉기타'},
  {id: '15', name: '보컬'},
];

interface VideoData {
  id: number;
  title: string;
  video: {
    videoUrl: string;
    imageUrl: string;
  };
}
interface ChallengeData {
  item: {
    challengeImage: string;
  };
}
interface ChallengeResults {
  items: VideoData[];
  data: {
    items: VideoData[];
  };
}

const Challenge: React.FC = () => {
  const [enVideos, setEnVideos] = useState<EnsembleVideoItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [challengeImage, setChallengeImage] = useState<string>();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [selectedInstrumentId, setSelectedInstrumentId] = useState<
    string | null
  >(null);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const [hasMore, setHasMore] = useState<boolean>(true);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  const fetchLatestChallenge = async () => {
    try {
      const url = '/challenges/latest';
      const response = await api.get<ChallengeData>(url);
      console.log('최신 챌린지:', response.data);
      console.log('이미지', response.data.item.challengeImage);
      setChallengeImage(response.data.item.challengeImage);
    } catch (error) {
      console.error('최신 챌린지를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  const fetchChallengeVideos = async (instrumentId?: string | null) => {
    try {
      const url = instrumentId
        ? `/challenges?instrumentId=${instrumentId}&page=${page}&size=12&sort=string`
        : `/challenges?page=${page}&size=12&sort=string`;
      const response = await api.get<ChallengeResults>(url);
      console.log('성공?:', response.data);
      if (page === 0) {
        setVideos(response.data.items);
      } else {
        setVideos(prevVideos => [...prevVideos, ...response.data.items]);
      }
      setHasMore(response.data.items.length > 0);
    } catch (error) {
      console.error('챌린지 비디오를 불러오는 중 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    const fetchEnsembleVideos = async () => {
      try {
        const response = await api.get<ApiResponse<EnsembleVideoItem>>(
          '/challenges/ensembles',
        );
        console.log(response.data);
        const mappedEnVideos = response.data.items.map(item => ({
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

    fetchEnsembleVideos().catch(error => console.error(error));
    fetchLatestChallenge().catch(error => console.error(error));
    fetchChallengeVideos().catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (selectedInstrumentId !== null) {
      fetchChallengeVideos(selectedInstrumentId).catch(error =>
        console.error(error),
      );
    } else {
      fetchChallengeVideos().catch(error => console.error(error));
    }
  }, [page, selectedInstrumentId]);

  useEffect(() => {
    if (inView && hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  }, [inView, hasMore]);

  const showPreviousVideo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const showNextVideo = () => {
    if (currentIndex < enVideos.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleButtonClick = (id: string | null, name: string) => {
    console.log(`Button clicked: ID = ${id}, Name = ${name}`);
    setSelectedInstrumentId(id);
    setPage(0); // Reset page to 0 when instrument changes
    setHasMore(true); // Reset hasMore when instrument changes
  };

  return (
    <>
      <Header />
      <div className={styles.headerMargin}></div>
      <div className={styles.challengeHeader}>지난 챌린지 선정영상</div>
      <div className={styles.ensembleVideos}>
        <button
          className={styles.navButton}
          onClick={showNextVideo}
          disabled={currentIndex === enVideos.length - 1}
        >
          {'◀'}
        </button>
        {enVideos.length > 0 && (
          <div key={enVideos[currentIndex].id} className={styles.video}>
            <div className={styles.title}>
              {enVideos[currentIndex].musicTitle}
            </div>
            <div className={styles.time}>
              <div>
                {enVideos[currentIndex].startTime} ~{' '}
                {enVideos[currentIndex].endTime}
              </div>
            </div>
          </div>
        )}
        <button
          className={styles.navButton}
          onClick={showPreviousVideo}
          disabled={currentIndex === 0}
        >
          {'▶'}
        </button>
      </div>
      <div className={styles.currentChallenge}>
        <img
          src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${challengeImage}`}
          alt={challengeImage}
          className={styles.thumbnail}
          style={{width: '100%', height: '100%'}}
        />
      </div>
      <div className={styles.videoSection}>
        <h3>현재 악기별 인기 챌린지 동영상</h3>
        <div className={styles.instruments}>
          <button onClick={() => handleButtonClick(null, '전체')}>전체</button>
          {instruments
            .slice()
            .reverse()
            .map(instrument => (
              <button
                key={instrument.id}
                onClick={() =>
                  handleButtonClick(instrument.id, instrument.name)
                }
              >
                {instrument.name}
              </button>
            ))}
        </div>
        <div className={styles.videolist}>
          {videos.length > 0 ? (
            videos.map((video, index) => (
              <Video
                key={index}
                id={video.id}
                title={video.title}
                videoUrl={video.video.videoUrl}
                thumbnail={video.video.imageUrl}
              />
            ))
          ) : (
            <div className={styles.noVideosContainer}>
              <div className={styles.noVideos}>동영상이 없습니다</div>
            </div>
          )}
        </div>
        <div ref={ref} className={styles.videomargin}></div>{' '}
        {/* 여백에 ref 추가 */}
      </div>
      <div className={styles.bottomMargin}>ㅇ</div>
    </>
  );
};

export default Challenge;

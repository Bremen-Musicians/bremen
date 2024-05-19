/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import {useRef, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {useInView} from 'react-intersection-observer';
import {LuMusic4} from 'react-icons/lu';
import useUserInfoStore from '@/stores/UserInfo';
import api from '@/api/api';
import Video from '@/components/Common/Video';
import Header from '@/components/Common/Header';
import styles from '@/components/Upload/Main/index.module.scss';
import VideoInfo from '@/stores/VideoInfo';
import ModalForm from '@/components/Common/ModalForm';
import FindSongModal from '@/components/Admin/Challenge/FindSongModal';
import {instruments} from '@/constants/instruments';
import {VideoResponse} from '@/types/Video';

interface SongData {
  title: string;
  artist: string;
  id: number;
}

interface IMainResponse {
  status: number;
  message: string;
  item: IArticleList[];
  size: number;
}

interface IArticleList {
  id: number;
  title: string;
  content: string;
  hitCnt: number;
  likeCnt: number;
  createdTime: string;
  userId: number;
  username: string;
  nickname: string;
  videoId: number;
  videoUrl: string;
  imageUrl: string;
  hashtags: string[];
  like: boolean;
}

const Form = () => {
  const [isMusicId, setIsMusicId] = useState<number>(0);
  const [isInstrumentId, setIsInstrumentId] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const {zustandUserNickname} = useUserInfoStore.getState();
  const [myArticles, setMyArticles] = useState<IArticleList[]>([]);
  const [page, setPage] = useState<number>(0);
  const [ref, inView] = useInView();
  const {
    setZustandVideoId,
    setZustandVideoUrl,
    setZustandInstrumentId,
    setZustandMusicId,
    // zustandVideoUrl,
    // zustandMusicId,
    // zustandInstrumentId,
  } = VideoInfo();
  const {zustandToken} = useUserInfoStore();
  const router = useRouter();

  const closeModal = () => {
    setOpenModal(false);
  };

  const saveMovieFile = () => {
    if (
      videoRef.current &&
      videoRef.current.files &&
      videoRef.current.files[0]
    ) {
      const file = videoRef.current.files[0];
      const reader = new FileReader();
      // const videoUrl = URL.createObjectURL(file);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const formData = new FormData();
        formData.append('video', file);
        // formData.append('thumbnail', '');
        const videoInfo = {
          isEnsemble: false,
          musicId: `${isMusicId}`,
          instrumentId: `${isInstrumentId}`,
        };
        const boundary = `----WebKitFormBoundary${crypto.randomUUID()}`;
        formData.append(
          'videoInfo',
          new Blob([JSON.stringify(videoInfo)], {
            type: 'application/json',
          }),
        );
        axios
          .post<VideoResponse>(
            `https://k10a104.p.ssafy.io/api/v1/videos`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${zustandToken}`,
                'Content-Type': `multipart/form-data; boundary=${boundary}`,
              },
            },
          )
          .then(response => {
            // eslint-disable-next-line no-console
            setZustandVideoUrl(response.data.item.videoUrl);
            setZustandVideoId(response.data.item.id);
            console.log('파일O요청, axios, boundary: ', response);
            router.push('/upload/explanationsolo');
          })
          .catch(Error => {
            // eslint-disable-next-line no-console
            console.error('axios, boundary: ', Error);
          });
      };
    }
  };

  const handleClick = () => {
    router.push('upload/record');
  };

  const handleUploadClick = () => {
    saveMovieFile();
    // router.push('/upload/explanationsolo');
  };

  const registSong = (songData: SongData) => {
    setZustandMusicId(songData.id);
    setIsMusicId(songData.id); // Pass the song ID to the outer component
  };

  const handleButtonClick = () => {
    setZustandInstrumentId(selectedValue);
    setIsInstrumentId(selectedValue);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(Number(e.target.value));
  };

  const handleModalClick = () => {
    setOpenModal(true);
  };

  const getArticles = () => {
    api
      .get<IMainResponse>(
        `/articles?nickname=${zustandUserNickname}&page=${page}&size=12`,
      )
      .then(response => {
        const listData: IArticleList[] = response.data.item;
        if (listData.length > 0) {
          setMyArticles(prevList => [...prevList, ...listData]);
        }
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  useEffect(() => {
    if (inView) {
      getArticles();
      setPage(page + 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  useEffect(() => {
    getArticles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zustandUserNickname]);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <button className={styles.buttonContainer} onClick={handleModalClick}>
            <div>
              <LuMusic4 height={58} width={58} className={styles.icon} />
              <div className={styles.detail}>곡, 악기 선택</div>
            </div>
          </button>
          <button
            disabled={isMusicId === 0 || isInstrumentId === 0}
            className={styles.buttonContainer}
            onClick={handleClick}
          >
            <div>
              <img
                loading="lazy"
                className={styles.buttonImg}
                src="/Icon/camera.png"
                height={58}
                width={58}
                alt="버튼이미지"
              />
              <div className={styles.detail}>녹화하기</div>
            </div>
          </button>

          <ModalForm isOpen={openModal} onClose={closeModal}>
            <div style={{display: 'flex', flexDirection: 'column'}}>
              <div className={styles.instrument}>
                악기 선택
                <div>
                  <select onChange={handleChange}>
                    {instruments.map((instrument, index) => {
                      return (
                        <option key={index} value={instrument.number}>
                          {instrument.name}
                        </option>
                      );
                    })}
                  </select>
                  <button
                    className={styles.instrumentButton}
                    onClick={handleButtonClick}
                    style={{cursor: 'pointer'}}
                  >
                    확인
                  </button>
                </div>
              </div>
              <FindSongModal registSong={registSong} closeModal={closeModal} />
            </div>
          </ModalForm>
          <form method="POST" encType="multipart/form-data">
            <input
              type="file"
              accept="video/*"
              id="musicVideo"
              onChange={saveMovieFile}
              ref={videoRef}
              hidden
            />
            <label className={styles.changeLabel} htmlFor="musicVideo">
              <div
                className={
                  isMusicId === 0 || isInstrumentId === 0
                    ? styles.buttonDis
                    : styles.buttonContainer
                }
                onClick={handleUploadClick}
              >
                <div>
                  <img
                    loading="lazy"
                    className={styles.buttonImg}
                    src="/Icon/filePlus.png"
                    height={58}
                    width={58}
                    alt="버튼이미지"
                  />
                  <div className={styles.detail}>파일업로드</div>
                </div>
              </div>
            </label>
          </form>
        </div>
        <div className={styles.videos}>
          <div className={styles.text}>
            내 독주 동영상
            <div className={styles.desc}>
              내 기존 동영상을 이용해 편집할 수 있습니다.
            </div>
          </div>
          {myArticles &&
            myArticles.map((video, key) => (
              <Video
                key={key}
                id={video.id}
                title={video.title}
                videoUrl={video.videoUrl}
                thumbnail={video.imageUrl}
                ref={null}
              />
            ))}
          <div ref={ref}></div>
        </div>
      </div>
      <Header />
    </div>
  );
};
export default Form;

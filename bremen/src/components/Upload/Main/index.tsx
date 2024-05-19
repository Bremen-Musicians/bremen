/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import {useRef, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import Header from '@/components/Common/Header';
import styles from '@/components/Upload/Main/index.module.scss';
import UploadVideo from '@/components/Upload/Main/UploadVideo';
import VideoInfo from '@/stores/VideoInfo';
import ModalForm from '@/components/Common/ModalForm';
import FindSongModal from '@/components/Admin/Challenge/FindSongModal';
import useUserInfoStore from '@/stores/UserInfo';
import {instruments} from '@/constants/instruments';
import {VideoResponse} from '@/types/Video';

interface SongData {
  title: string;
  artist: string;
  id: number;
}

const Form = () => {
  const [isMusicId, setIsMusicId] = useState<number>(0);
  const [isInstrumentId, setIsInstrumentId] = useState<number>(0);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const videoRef = useRef<HTMLInputElement>(null);
  const {
    setZustandVideoId,
    setZustandVideoUrl,
    setZustandInstrumentId,
    setZustandMusicId,
    zustandVideoUrl,
  } = VideoInfo();
  const {zustandToken} = useUserInfoStore();
  const router = useRouter();

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    if (isMusicId !== 0 && isInstrumentId !== 0 && zustandVideoUrl !== '') {
      console.log('1번 유즈이펙트');
      router.push('/upload/explanationsolo');
    } else if (
      isMusicId !== 0 &&
      isInstrumentId !== 0 &&
      zustandVideoUrl === ''
    ) {
      console.log('2번 유즈이펙트');
      router.push('/upload/record');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMusicId, isInstrumentId, zustandVideoUrl]);
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
            setZustandVideoId(response.data.item.id);
            setZustandVideoUrl(response.data.item.videoUrl);
            console.log('파일O요청, axios, boundary: ', response);
          })
          .catch(Error => {
            // eslint-disable-next-line no-console
            console.error('axios, boundary: ', Error);
          });
      };
    }
  };

  const stepByStep = async () => {
    setOpenModal(true); // 모달 열기

    // 특정 조건을 만족할 때까지 기다리는 함수
    const waitForConditions = () => {
      return new Promise<void>(resolve => {
        const checkConditions = () => {
          if (isMusicId !== 0 && isInstrumentId !== 0) {
            setOpenModal(false); // 모달 닫기
            resolve();
          } else {
            requestAnimationFrame(checkConditions); // 다음 프레임에서 다시 확인
          }
        };
        checkConditions();
      });
    };

    await waitForConditions(); // 조건 만족을 기다림
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await saveMovieFile(); // 파일 저장

    router.push('upload/explanationsolo'); // 라우터 이동
  };

  const toUpload = async () => {
    setOpenModal(true);

    const waitForConditions = () => {
      return new Promise<void>(resolve => {
        const checkConditions = () => {
          if (isMusicId !== 0 && isInstrumentId !== 0) {
            setOpenModal(false);
            resolve();
          } else {
            requestAnimationFrame(checkConditions);
          }
        };
        checkConditions();
      });
    };
    await waitForConditions();
    router.push('/upload/record');
  };

  const handleClick = () => {
    toUpload().catch(error => console.error(error));
  };

  const handleUploadClick = () => {
    stepByStep().catch(error => console.error(error));
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

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <div className={styles.buttonContainer} onClick={handleClick}>
            <div>
              <img
                className={styles.buttonImg}
                src="/Icon/camera.png"
                height={58}
                width={58}
                alt="버튼이미지"
              />
              <div className={styles.detail}>녹화하기</div>
            </div>
          </div>
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
                className={styles.buttonContainer}
                onClick={handleUploadClick}
              >
                <div>
                  <img
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
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
          <UploadVideo />
        </div>
      </div>
      <Header />
    </div>
  );
};
export default Form;

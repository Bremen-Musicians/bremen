'use client';

import {useRef} from 'react';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Common/Header';
import styles from '@/components/Upload/Main/index.module.scss';
import UploadVideo from '@/components/Upload/Main/UploadVideo';
import VideoInfo from '@/stores/VideoInfo';

const Form = () => {
  const videoRef = useRef<HTMLInputElement>(null);
  const {setZustandVideoUrl} = VideoInfo();
  const router = useRouter();

  const saveMovieFile = () => {
    if (
      videoRef.current &&
      videoRef.current.files &&
      videoRef.current.files[0]
    ) {
      const file = videoRef.current.files[0];
      const reader = new FileReader();
      const videoUrl = URL.createObjectURL(file);
      setZustandVideoUrl(videoUrl);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const formData = new FormData();
        formData.append('videoUrl', file);
      };
    }
  };

  const handleClick = () => {
    // TODO: 모달열기 -> 곡 선택(useState로 관리) -> 선택 시 녹화페이지로 보내기
    router.push('/upload/record');
  };

  const handleUploadClick = () => {
    // TODO: 모달열기 -> 곡 router.push('/upload/editsolo');선택(useState로 관리) -> 곡 선택 시 파일 등록 -> 서버전송 -> 독주 편집 페이지로 이동
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.buttonGroup}>
          <div className={styles.buttonContainer} onClick={handleClick}>
            <div>
              <Image
                className={styles.buttonImg}
                src="/Icon/camera.png"
                height={58}
                width={58}
                alt="버튼이미지"
              />
              <div className={styles.detail}>녹화하기</div>
            </div>
          </div>
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
                  <Image
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

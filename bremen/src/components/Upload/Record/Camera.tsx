/* eslint-disable no-console */

'use client';

// TODO: 녹화 시작 -> 중지/종료
// TODO: 중지 -> 재시작/종료
// TODO: 녹화 중지, 재시작, 녹화된 영상 보여주기 기능 추가
// TODO: 영상 주소 위로 올리기
import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Video from '@/components/Upload/Record/Video';
import Header from '@/components/Upload/Record/Header';
// import Metronome from '@/components/Upload/Record/Metronome';
import styles from '@/components/Upload/Record/Camera.module.scss';
// import Tempo from '@/components/Upload/Record/Tempo';

const DynamicMetronome = dynamic(
  () => import('@/components/Upload/Record/Metronome'),
  {ssr: false}, // 서버사이드 렌더링 비활성화
);

const Camera = () => {
  const videoOutput = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [recordedMediaUrl, setRecordedMediaUrl] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // const [mediaData, setMediaData] = useState<BlobPart[]>([]);

  useEffect(() => {
    // 권한 받기
    const constraints = {audio: true, video: true};
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(mediaStream => {
        if (videoOutput.current) {
          // srcObject 속성에 카메라 영상 표시
          videoOutput.current.srcObject = mediaStream;
          videoOutput.current.onloadedmetadata = () => {
            videoOutput.current
              ?.play()
              .catch(error => console.error('playing error: ', error));
          };
        }
      })
      .catch(error => console.error(error));
  }, [isRecording]);

  const startRecording = () => {
    if (isRecording) return;
    const mediaStream = videoOutput.current?.srcObject as MediaStream;
    const mediaData: BlobPart[] = [];
    const newMediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: 'video/webm; codecs=h264,vp9,opus',
    });
    newMediaRecorder.ondataavailable = event => {
      if (event.data && event.data.size > 0) {
        mediaData.push(event.data);
      }
    };

    newMediaRecorder.onstop = () => {
      const blob = new Blob(mediaData, {type: 'video/webm'});
      const url = URL.createObjectURL(blob);
      setRecordedMediaUrl(url);
    };
    newMediaRecorder.start();
    setMediaRecorder(newMediaRecorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.pause();
      setIsPaused(true);
    }
  };
  const restartRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.resume();
      setIsPaused(false);
    }
  };

  const finishRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      // 초기화
      setIsPaused(false);
      // setMediaRecorder(null);
      setIsRecording(false);
    }
  };
  const downloadRecording = () => {
    if (recordedMediaUrl) {
      const link = document.createElement('a');
      document.body.appendChild(link);
      link.href = recordedMediaUrl;
      link.download = 'video.webm';
      link.click();
      document.body.removeChild(link);
      // 저장 시 재 다운로드 막기
      setRecordedMediaUrl(null);
    }
  };

  const handleGoNext = () => {
    // TODO: router로 보내기
  };

  return (
    <div>
      <Header />
      <div className={styles.videoContainer}>
        <Video
          ref={videoOutput}
          isUrl={recordedMediaUrl}
          isRecording={isRecording}
        />
        <DynamicMetronome />
        {!isRecording && (
          <div onClick={startRecording}>
            <Image
              src="/Icon/videoStart.png"
              width={200}
              height={200}
              alt="녹화 시작"
              className={styles.start}
            />
          </div>
        )}
        {isRecording && (
          <div className={styles.isStarted}>
            {isPaused ? (
              <div onClick={restartRecording}>
                <Image
                  src="/Icon/videoRestart.png"
                  width={200}
                  height={200}
                  alt="녹화 재시작"
                  className={styles.restart}
                />
              </div>
            ) : (
              <div onClick={stopRecording}>
                <Image
                  src="/Icon/videoStop.png"
                  width={200}
                  height={200}
                  alt="녹화 중지"
                  className={styles.stop}
                />
              </div>
            )}
            <div onClick={finishRecording}>
              <Image
                src="/Icon/videoFinish.png"
                width={200}
                height={200}
                alt="녹화 종료"
                className={styles.finish}
              />
            </div>
          </div>
        )}

        <button
          onClick={downloadRecording}
          disabled={recordedMediaUrl === null}
          className={styles.download}
        >
          녹화 다운로드
        </button>
        <button onClick={handleGoNext}>다음</button>
      </div>
    </div>
  );
};
export default Camera;

/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */

'use client';

import {useState, useEffect, ChangeEvent} from 'react';

import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import VideoFilePicker from '@/components/Upload/VideoFilePicker';
import SlideBar from '@/components/Upload/SlideBar';
import * as helpers from '@/utils/helpers';

const FF = createFFmpeg({
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
  log: true,
});

(async function basic() {
  await FF.load();
})().catch(error => console.error(error));

/**
 * 1. 쌓기
 * 2. 자르기
 * 3. 볼륨 조절
 * 4. 자르기
 * 5. 오디오 추출
 */

// TODO: 테스트는 로컬에서 올려서 사용하기
// TODO: 주스탠드 만들기
/** 썸네일 제작 */
const MakeThumbnail = () => {
  const [inputVideoUrl, setInputVideoUrl] = useState<string>(''); // 인풋 비디오 url, 나중에는 주스탠드에서 가져오기
  const [videoTrimDuration, setVideoTrimDuration] = useState<number>(0);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
  const [thumbNails, setThumbNails] = useState<string[]>([]); // 선택할 썸네일들
  const [thumbnailTime, setThumbnailTime] = useState<number>(0); // 썸네일 시간
  const [selectedTumbNail, setSelectedThumbNail] = useState<string>(''); // 썸네일 선택
  const [isThumbnail, setIsThumbnail] = useState<boolean>(false); // 썸네일 선택 중

  /** 파일 인풋 -> url 넣기 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setInputVideoUrl(url);
    }
  };

  /** 선택할 썸네일들 만들기 */
  const getThumbnails = async (videoTime: number) => {
    if (!FF.isLoaded()) await FF.load();
    setThumbnailIsProcessing(true);
    const MAX_NUMBER_OF_IMAGES = 15;
    const NUMBER_OF_IMAGES = videoTime < MAX_NUMBER_OF_IMAGES ? videoTime : 15;
    const offset =
      videoTime === MAX_NUMBER_OF_IMAGES ? 1 : videoTime / NUMBER_OF_IMAGES;

    const arrayOfImageURIs = [];
    const videoData = await fetchFile(inputVideoUrl);
    console.log('videoData', videoData);
    FF.FS('writeFile', 'bremen', videoData);

    for (let i = 0; i < NUMBER_OF_IMAGES; i += 1) {
      const startTimeInSecs = helpers.toTimeString(
        Math.round(i * offset),
        true,
      );

      try {
        await FF.run(
          '-ss',
          startTimeInSecs,
          '-i',
          'bremen',
          '-t',
          '00:00:1.000',
          '-vf',
          `scale=150:-1`,
          `img${i}.png`,
        );
        const data = FF.FS('readFile', `img${i}.png`);

        const blob = new Blob([data.buffer], {type: 'image/png'});
        const dataURI = URL.createObjectURL(blob);
        FF.FS('unlink', `img${i}.png`);
        arrayOfImageURIs.push(dataURI);
      } catch (error) {
        console.log({message: error});
      }
    }
    setThumbnailIsProcessing(false);

    return arrayOfImageURIs;
  };

  useEffect(() => {
    const fetchVideoDurationAndThumbnails = async () => {
      try {
        const videoDuration = await helpers.getVideoDuration(inputVideoUrl);
        setVideoTrimDuration(videoDuration);

        const tempThumbNails = await getThumbnails(videoDuration);
        setThumbNails(tempThumbNails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVideoDurationAndThumbnails().catch(error => console.error(error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVideoUrl]);

  /** 숫자-> 00:00:00 형식의 시간으로 바꾸기 */
  function formatTime(seconds: number) {
    const pad = (num: number) => String(num).padStart(2, '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
  }

  /** 썸네일 선택 */
  const selectThumbnail = async () => {
    if (!FF.isLoaded()) await FF.load();

    const videoData = await fetchFile(inputVideoUrl);
    console.log('videoData', videoData);
    FF.FS('writeFile', 'bremen', videoData);

    try {
      const time = formatTime(
        thumbnailTime > 0 ? thumbnailTime : videoTrimDuration / 2,
      );
      await FF.run(
        '-ss',
        `${time}`,
        '-i',
        'bremen',
        '-vf',
        `scale=150:-1`,
        '-vframes',
        '1',
        `img.png`,
      );
      const data = FF.FS('readFile', `img.png`);

      const blob = new Blob([data.buffer], {type: 'image/png'});
      const dataUrl = URL.createObjectURL(blob);
      // FF.FS('unlink', `img${i}.png`);
      setSelectedThumbNail(dataUrl);
      // arrayOfImageURIs.push(dataURI);
    } catch (error) {
      console.log({message: error});
    }
  };

  const handleClick = () => {
    setIsThumbnail(true);
  };

  const handleStore = () => {
    selectThumbnail().catch(error => console.error(error));
    setIsThumbnail(false);
  };
  return (
    <div>
      썸네일:
      <img src={selectedTumbNail} />
      <div onClick={handleClick}>
        <img src="/Icon/plus.png" />
      </div>
      <div onClick={handleStore}> 저장</div>
      <br />
      {isThumbnail && (
        <SlideBar
          duration={videoTrimDuration}
          thumbNails={thumbNails}
          setThumbnailTime={setThumbnailTime}
          max={videoTrimDuration}
          loading={thumbnailIsProcessing}
        />
      )}
      <VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoUrl}>
        <video
          src={inputVideoUrl || ''}
          autoPlay
          controls
          muted
          width="450"
        ></video>
      </VideoFilePicker>
    </div>
  );
};

export default MakeThumbnail;

/* eslint-disable no-console */

'use client';

import {useState, useEffect, ChangeEvent} from 'react';

import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import VideoTrim from '@/components/Upload/VideoTrim';
import OutputVideo from '@/components/Upload/OutputVideo';
import VideoFilePicker from '@/components/Upload/VideoFilePicker';
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
/** 하이라이트 제작 */
const MakeHighlight = () => {
  const [inputVideoUrl, setInputVideoUrl] = useState<string>(''); // 인풋 비디오 url, 나중에는 주스탠드에서 가져오기
  const [videoTrimmedUrl, setVideoTrimmedUrl] = useState<string>(''); // 자른 후
  const [trimIsProcessing, setTrimIsProcessing] = useState<boolean>(false);
  const [rStart, setRstart] = useState<number>(0);
  const [rEnd, setRend] = useState<number>(10);
  const [videoTrimDuration, setVideoTrimDuration] = useState<number>(0);
  const [thumbnailIsProcessing, setThumbnailIsProcessing] = useState(false);
  const [thumbNails, setThumbNails] = useState<string[]>([]);

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

  /** 자르기 최대 100초 */
  const handleTrim = async () => {
    setTrimIsProcessing(true);

    const startTime = ((rStart / 100) * videoTrimDuration).toFixed(2);
    const offset = (
      (rEnd / 100) * videoTrimDuration -
      Number(startTime)
    ).toFixed(2);
    const highlightOffset = Number(offset) > 100 ? 100 : Number(offset);

    try {
      const videoData = await fetchFile(inputVideoUrl);
      FF.FS('writeFile', 'input.mp4', videoData);
      await FF.run(
        '-ss',
        helpers.toTimeString(Number(startTime), true),
        '-i',
        'input.mp4',
        '-t',
        helpers.toTimeString(Number(highlightOffset), true),
        '-c',
        'copy',
        'output.mp4',
      );
      const data = FF.FS('readFile', 'output.mp4');
      const videoBlob = new Blob([data], {type: 'video/mp4'});
      const dataUrl = URL.createObjectURL(videoBlob);
      setVideoTrimmedUrl(dataUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setTrimIsProcessing(false);
    }
  };

  /** 자르기 비동기여서 바로 못 넣-> 자르기 유발 함수 */
  const handleTrimClick = () => {
    handleTrim().catch(error => {
      console.error('Error during handleTrim execution:', error);
    });
  };

  /** 바꾼 길이 */
  const handleUpdateRange = (func: (value: number) => void) => {
    return ({target: {value}}: React.ChangeEvent<HTMLInputElement>) => {
      func(Number(value));
    };
  };

  return (
    <div>
      {videoTrimmedUrl && <video src={videoTrimmedUrl} controls />}
      <br />
      <VideoTrim
        rEnd={rEnd}
        rStart={rStart}
        handleUpdaterStart={handleUpdateRange(setRstart)}
        handleUpdaterEnd={handleUpdateRange(setRend)}
        loading={thumbnailIsProcessing}
        duration={videoTrimDuration}
        control={
          <div className="u-center">
            <button
              onClick={handleTrimClick}
              className="btn btn_b"
              disabled={trimIsProcessing}
            >
              {trimIsProcessing ? 'trimming...' : 'trim selected'}
            </button>
          </div>
        }
        thumbNails={thumbNails}
      />
      <VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoUrl}>
        <video
          src={inputVideoUrl || ''}
          autoPlay
          controls
          muted
          width="450"
        ></video>
      </VideoFilePicker>
      <OutputVideo
        videoSrc={videoTrimmedUrl}
        handleDownload={() => helpers.download(videoTrimmedUrl)}
      />
    </div>
  );
};

export default MakeHighlight;

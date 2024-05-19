/* eslint-disable no-console */

'use client';

import {useState, ChangeEvent} from 'react';

import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
import VideoFilePicker from '@/components/Upload/VideoFilePicker';

const FF = createFFmpeg({
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
  log: true,
});

(async function basic() {
  await FF.load();
})().catch(error => console.error(error));

// TODO: 테스트는 로컬에서 올려서 사용하기
// TODO: 주스탠드 만들기

/** 오디오 추출 */
const ExtractAudio = () => {
  const [inputVideoUrl, setInputVideoUrl] = useState<string>(''); // 인풋 비디오 url, 나중에는 주스탠드에서 가져오기
  const [audioUrl, setAudioUrl] = useState<string>('');

  /** 파일 인풋 -> url 넣기 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setInputVideoUrl(url);
    }
  };

  /** 오디오 추출하기 */
  const makeAudio = async () => {
    if (!FF.isLoaded()) await FF.load();
    const videoData = await fetchFile(inputVideoUrl);
    FF.FS('writeFile', 'input.mp4', videoData);

    try {
      await FF.run(
        '-y',
        '-i',
        'input.mp4',
        '-vn',
        '-acodec',
        'libmp3lame',
        '-ar',
        '44.1k',
        '-ac',
        '2',
        '-ab',
        '128k',
        'audioOutput.mp3',
      );
      const data = FF.FS('readFile', 'audioOutput.mp3');

      const blob = new Blob([data.buffer], {type: 'audio/mp3'});
      const dataUrl = URL.createObjectURL(blob);
      setAudioUrl(dataUrl);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = () => {
    makeAudio().catch(error => console.error(error));
  };

  return (
    <div>
      <button onClick={handleClick}>오디오 추출</button>
      <VideoFilePicker handleChange={handleChange} showVideo={!!inputVideoUrl}>
        <video
          src={inputVideoUrl || ''}
          autoPlay
          controls
          muted
          width="450"
        ></video>
      </VideoFilePicker>
      <audio src={audioUrl} controls />
    </div>
  );
};
export default ExtractAudio;

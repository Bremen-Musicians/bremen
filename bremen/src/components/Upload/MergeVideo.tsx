// /* eslint-disable no-console */

// 'use client';

// import {useState, ChangeEvent} from 'react';

// import {createFFmpeg, fetchFile} from '@ffmpeg/ffmpeg';
// import OutputVideo from '@/components/Upload/OutputVideo';
// import VideoFilePicker from '@/components/Upload/VideoFilePicker';
// import * as helpers from '@/utils/helpers';

// const FF = createFFmpeg({
//   corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
//   log: true,
// });

// (async function basic() {
//   await FF.load();
// })().catch(error => console.error(error));

// // TODO: 테스트는 로컬에서 올려서 사용하기
// // TODO: 주스탠드 만들기
// /** 동영상 합성 */
// const MergeVideo = () => {
//   const [inputVideoUrlList, setInputVideoUrlList] = useState<string[]>([]); // 인풋 비디오 url, 나중에는 주스탠드에서 가져오기
//   const [mergedUrl, setMergedUrl] = useState<string>(''); // 합성 후

//   /** 파일 인풋 -> url 넣기 */
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       const url = URL.createObjectURL(file);
//       // 기존 배열에 없으면 추가
//       setInputVideoUrlList(prevList => [...prevList, url]);
//     }
//   };

//   // 동영상 화면 분할로 합치기
//   const merge = async () => {
//     try {
//       if (inputVideoUrlList.length === 0) return;
//       // 입력 비디오 파일을 FFmpeg 가상 파일 시스템에 작성
//       for (let i = 0; i < inputVideoUrlList.length; i += 1) {
//         const videoData = await fetchFile(inputVideoUrlList[i]);
//         FF.FS('writeFile', `video${i}.mp4`, videoData);
//       }

//       // FFmpeg 명령어 실행
//       //   const overlayFilters = `${
//       //     inputVideoUrlList
//       //       .map(
//       //         (_, index) =>
//       //           `[${index}:v]trim=duration=${durations[index]},setpts=PTS-STARTPTS,scale=-1:${index === 0 ? 720 : 360}[v${index}];`,
//       //       )
//       //       .join('') +
//       //     inputVideoUrlList.map((_, index) => `[v${index}]`).join('')
//       //   }xstack=inputs=${inputVideoUrlList.length}:layout=0_0|w0_0|w0+w1_0|w0_h1|w0+w1_h1[v]`;

//       // 중복 삭제
//       // const filterOptions = ['-vf', 'mpdecimate', '-vsync', 'vfr'];

//       //   const overlayFilters = `${
//       //     inputVideoUrlList
//       //       .map(
//       //         (_, index) =>
//       //           `[${index}]scale=iw*min(${inputVideoUrlList.length}\\,2)/2:ih*min(${Math.ceil(
//       //             inputVideoUrlList.length / 2,
//       //           )}\\,2)[v${index}];`,
//       //       )
//       //       .join('') +
//       //     inputVideoUrlList.map((_, index) => `[v${index}]`).join('')
//       //   }xstack=inputs=${inputVideoUrlList.length}:layout=${inputVideoUrlList
//       //     .map((_, index) => index)
//       //     .join('|')}[v]`;

//       const overlayFilters = `${
//         inputVideoUrlList
//           .map(
//             (_, index) =>
//               `[${index}]deduplicate=drop_cmp=dav1d[dup${index}];[dup${index}]scale=iw*min(${inputVideoUrlList.length}\\,2)/2:ih*min(${Math.ceil(inputVideoUrlList.length / 2)}\\,2)[v${index}];`,
//           )
//           .join('') +
//         inputVideoUrlList.map((_, index) => `[v${index}]`).join('')
//       }xstack=inputs=${inputVideoUrlList.length}:layout=${inputVideoUrlList
//         .map((_, index) => index)
//         .join('|')}[v]`;

//       //   const commandArray = [
//       //     // ...inputVideoUrlList.map((_, index) => '-i', `video${index}.mp4`),
//       //     // '-filter_complex',
//       //     // overlayFilters,
//       //     // '-map',
//       //     // '[v]',
//       //     // 'output.mp4',
//       //     ...inputVideoUrlList.flatMap((_, index) => ['-i', `video${index}.mp4`]),
//       //     ...filterOptions,
//       //     '-map',
//       //     '[v]',
//       //     'output.mp4',
//       //   ];

//       const commandArray = [
//         ...inputVideoUrlList.flatMap((_, index) => ['-i', `video${index}.mp4`]),
//         '-filter_complex',
//         overlayFilters,
//         '-map',
//         '[v]',
//         '-vsync',
//         'vfr', // 이 옵션을 추가합니다.
//         'merged.mp4',
//       ];

//       console.log('command', commandArray);
//       await FF.run(...commandArray);

//       // 결과 비디오 파일 읽기 및 Blob URL 생성
//       const data = FF.FS('readFile', 'merged.mp4');
//       const videoBlob = new Blob([data], {type: 'video/mp4'});
//       const mergedVideoUrl = URL.createObjectURL(videoBlob);

//       // 병합된 비디오 URL을 상태에 저장
//       setMergedUrl(mergedVideoUrl);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const handleMerge = () => {
//     merge().catch(Err => console.error(Err));
//   };

//   //   await ffmpeg.exec([...overlay]);

//   //   const data = await ffmpeg.readFile('output.mp4');

//   //   const videoBlob = new Blob([data], {type: 'video/mp4'});
//   //   const url = URL.createObjectURL(videoBlob);
//   //   // const url = toBlobURL(new Blob([data.buffer], {type: 'video/mp4'}));

//   //   console.log(url);
//   //   setVideoUrl(url);
//   // };

//   // useEffect(() => {
//   //   mergeVideos().catch(error => console.error(error));
//   // }, []);
//   return (
//     <div>
//       <button onClick={handleMerge}>합치기</button>
//       결과:
//       <OutputVideo
//         videoSrc={mergedUrl}
//         handleDownload={() => helpers.download(mergedUrl)}
//       />
//       <br />
//       <VideoFilePicker
//         handleChange={handleChange}
//         showVideo={!!inputVideoUrlList}
//       >
//         {inputVideoUrlList.map((item, index) => (
//           <video key={index} src={item} autoPlay controls muted width="450" />
//         ))}
//       </VideoFilePicker>
//     </div>
//   );
// };

// export default MergeVideo;

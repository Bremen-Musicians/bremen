// import SoundWaveMusic from '@/components/Upload/SoundWaveMusic';
// import MergeVideo from '@/components/Upload/MergeVideo';
import ExtractAudio from '@/components/Upload/ExtractAudio';

export default function Page() {
  return (
    <div style={{color: 'white'}}>
      독주 편집
      {/* <SoundWaveMusic /> */}
      합성
      {/* <MergeVideo /> */}
      동영상
      <ExtractAudio />
    </div>
  );
}

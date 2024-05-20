import {HiMiniSpeakerWave, HiMiniSpeakerXMark} from 'react-icons/hi2';

import {useState} from 'react';
import AudioWave from './AudioWave';
import styles from './SelectedVideo.module.scss';

interface ISelectedVideo {
  instrument: string;
  video: string;
}

export default function SelectedVideo({instrument, video}: ISelectedVideo) {
  const [isMuted, setMuted] = useState(false);
  const handleMute = () => {
    setMuted(!isMuted);
  };

  return (
    <div>
      {/* 악기 이름 */}
      <div className={styles.instrument}>
        <span>{instrument}</span>
      </div>

      <div className={styles.editarea}>
        {/* 오디오 */}
        <div>
          <AudioWave video={video} />
        </div>

        {/* 음소거 버튼 */}
        <div className={styles.icon}>
          {isMuted ? (
            <HiMiniSpeakerXMark onClick={() => handleMute()} />
          ) : (
            <HiMiniSpeakerWave onClick={() => handleMute()} />
          )}
        </div>
      </div>
    </div>
  );
}

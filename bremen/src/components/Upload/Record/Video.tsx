import {forwardRef, Ref} from 'react';
import styles from '@/components/Upload/Record/Video.module.scss';

interface VideoProps {
  isUrl: string | null;
  isRecording: boolean;
}

const Video = forwardRef<HTMLVideoElement, VideoProps>(
  ({isUrl, isRecording}, ref: Ref<HTMLVideoElement>) => {
    return (
      <div className={styles.container}>
        {isUrl && !isRecording ? (
          <>
            <video ref={ref} muted={true} className={styles.unseen} />
            <video src={isUrl} controls={true} className={styles.recorded} />
          </>
        ) : (
          <video ref={ref} muted={true} className={styles.recording} />
        )}
      </div>
    );
  },
);

Video.displayName = 'Video';
export default Video;

'use client';

import useStore from '@/hooks/useStore';
import useVideoInfoStore, {IVideoInfo} from '@/stores/VideoInfo';
import styles from '@/components/Upload/Explanation/Video.module.scss';

const Video = () => {
  const videoUrl = useStore<IVideoInfo, string>(
    useVideoInfoStore,
    state => state.zustandVideoUrl,
  );
  return (
    <div>
      <video src={videoUrl} controls muted className={styles.video} />
    </div>
  );
};
export default Video;

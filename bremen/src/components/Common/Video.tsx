/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */

'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/Common/Video.module.scss';
import {useState, useRef, Ref} from 'react';

export default function Video({
  id,
  title,
  videoUrl,
  thumbnail,
  ref,
}: {
  id: number;
  title: string;
  videoUrl: string;
  thumbnail: string;
  ref?: Ref<HTMLDivElement>;
}) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const viewVideo = () => {
    router.push(`/detail/${id}`);
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {})
        .catch(() => {
          console.log(ref);
        });
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div
      className={styles.cell}
      onClick={viewVideo}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.video}>
        <div className={styles.videoOverlay}>
          {!hovered && (
            <img
              src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${thumbnail}`}
              alt={title}
              className={styles.thumbnail}
            />
          )}
          {hovered && (
            <video
              ref={videoRef}
              src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${videoUrl}`}
              autoPlay
              muted
            ></video>
          )}
        </div>
        <p className={styles.videotitle}>{title}</p>
      </div>
    </div>
  );
}

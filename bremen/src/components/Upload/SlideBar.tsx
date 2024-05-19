import {useState} from 'react';
import styles from '@/components/Upload/SlideBar.module.scss';

const SlideBar = ({
  setThumbnailTime,
  max,
  duration,
  thumbNails,
  loading,
}: {
  setThumbnailTime: (value: number) => void;
  max: number;
  thumbNails: string[];
  duration: number;
  loading: boolean;
}) => {
  const [page, setPage] = useState<number>(10);
  if (!thumbNails && !loading) {
    return null;
  }

  /** 페이지 이동 */
  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
    setThumbnailTime(pageNumber);
  };

  return (
    <div className={styles.firstContainer}>
      <form className={styles.Container}>
        <div className="image_box">
          {thumbNails.map((imgURL, id) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={imgURL} alt={`sample_video_thumbnail_${id}`} key={id} />
          ))}
          <div className="clip_box">
            <span className="clip_box_des"></span>
            <span className="clip_box_des"></span>
          </div>
        </div>
        <div className={styles.Slider}>
          <div className={styles.SlideBar}></div>
          <input
            className={styles.maxBar}
            id="page"
            type="range"
            step="1"
            value={page}
            onChange={e => handlePageChange(Number(e.target.value))}
            min={0}
            max={max}
          />
        </div>
      </form>
    </div>
  );
};

export default SlideBar;

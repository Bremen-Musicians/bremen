import styles from './SongSelectList.module.scss';

interface Song {
  title: string;
  artist: string;
  isClassic: boolean;
  selectSong: (title: string, artist: string) => void;
}

export default function SongSelectList({
  title,
  artist,
  isClassic,
  selectSong,
}: Song) {
  return (
    <div className={styles.foundsong}>
      {/* 노래제목 */}
      <div className={styles.song}>
        <span onClick={() => selectSong(title, artist)}>{title}</span>
      </div>

      {/* 작곡가 / 가수 */}
      <div className={styles.singer}>
        <span onClick={() => selectSong(title, artist)}>
          {isClassic ? '작곡가 : ' : '가수 : '}
          {artist}
        </span>
      </div>
    </div>
  );
}

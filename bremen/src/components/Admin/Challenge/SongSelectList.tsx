import styles from './SongSelectList.module.scss';

interface Song {
  title: string;
  composer: string | null;
  singer: string | null;
  selectSong: (title: string, artist: string) => void;
}

export default function SongSelectList({
  title,
  composer,
  singer,
  selectSong,
}: Song) {
  // Determine if the song is classical based on the presence of a composer
  const isClassic = composer !== null;
  const artistName = isClassic ? composer : singer; // Choose display between composer and singer

  return (
    <div className={styles.foundsong}>
      {/* Song Title */}
      <div className={styles.song}>
        <span onClick={() => selectSong(title, artistName || '')}>{title}</span>
      </div>

      {/* Composer or Singer */}
      <div className={styles.singer}>
        <span onClick={() => selectSong(title, artistName || '')}>
          {isClassic ? '작곡가: ' : '가수: '}
          {artistName}
        </span>
      </div>
    </div>
  );
}

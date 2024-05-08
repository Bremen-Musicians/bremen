import {IoSearch} from 'react-icons/io5';
import styles from './FindSongModal.module.scss';
import SongSelectList from './SongSelectList';

export default function FindSongModal({
  registSong,
  closeModal,
}: {
  registSong: (title: string) => void;
  closeModal: () => void;
}) {
  const searchSong = () => {
    // console.log('찾기!');
  };

  const selectSong = (title: string, artist: string) => {
    // console.log(`${title} - ${artist}`);
    registSong(`${title} - ${artist}`);
    closeModal();
  };

  return (
    <div>
      {/* 검색창 */}
      <div className={styles.searcharea}>
        <span>곡 검색</span>
        <div className={styles.searchboxarea}>
          <div className={styles.searchbox}>
            <IoSearch />
            <input type="text"></input>
          </div>
          <div className={styles.searchbtn} onClick={searchSong}>
            찾기
          </div>
        </div>
      </div>

      {/* 검색결과 */}
      <div className={styles.resultarea}>
        <SongSelectList
          title="Suite Nr. 3 D-Dur BWV 1068, Air"
          artist="Johann Sebastian Bach"
          isClassic={true}
          selectSong={selectSong}
        />
        <SongSelectList
          title="밤양갱"
          artist="비비 (BIBI)"
          isClassic={false}
          selectSong={selectSong}
        />
        <SongSelectList
          title="Love wins all"
          artist="아이유"
          isClassic={false}
          selectSong={selectSong}
        />
        <SongSelectList
          title="To. X"
          artist="태연 (TAEYEON)"
          isClassic={false}
          selectSong={selectSong}
        />
        <SongSelectList
          title="Suite Nr. 3 D-Dur BWV 1068, Air"
          artist="Johann Sebastian Bach"
          isClassic={true}
          selectSong={selectSong}
        />
        <SongSelectList
          title="9와 4분의 3의 승강장에서 너를 기다려"
          artist="투바투"
          isClassic={false}
          selectSong={selectSong}
        />
        <SongSelectList
          title="Love wins all"
          artist="아이유"
          isClassic={false}
          selectSong={selectSong}
        />
        <SongSelectList
          title="To. X"
          artist="태연 (TAEYEON)"
          isClassic={false}
          selectSong={selectSong}
        />
      </div>
    </div>
  );
}

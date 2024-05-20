/* eslint-disable no-console */
import {IoSearch} from 'react-icons/io5';
import {useState} from 'react';
import api from '@/api/api';
import styles from './FindSongModal.module.scss';
import SongSelectList from './SongSelectList';

// Define an interface for the structure of each song
interface Song {
  id: number;
  title: string;
  composer: string | null;
  singer: string | null;
}

interface ISong extends Song {
  status: number;
  message: string;
  items: Song[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  size: number;
}

export default function FindSongModal({
  registSong,
  closeModal,
}: {
  // Update the type here to expect an object containing song details
  registSong: (songData: {title: string; artist: string; id: number}) => void;
  closeModal: () => void;
}) {
  const [keyword, setKeyword] = useState('');
  const [songs, setSongs] = useState<Song[]>([]);

  const searchSong = () => {
    const url = `/musics/search?title=${keyword}&page=0&size=10`;
    api
      .get<ISong>(url)
      .then(response => {
        console.log(url);
        console.log(response.data.items);
        setSongs(response.data.items);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const selectSong = (song: Song) => {
    // Include the song ID in the data sent to the outer component
    registSong({
      title: song.title,
      artist: song.singer || '', // Fallback to an empty string if singer is null
      id: song.id,
    });
    closeModal();
  };

  return (
    <div>
      <div className={styles.searcharea}>
        <span>곡 검색</span>
        <div className={styles.searchboxarea}>
          <div className={styles.searchbox}>
            <IoSearch />
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
            ></input>
          </div>
          <div className={styles.searchbtn} onClick={searchSong}>
            찾기
          </div>
        </div>
      </div>

      <div className={styles.resultarea}>
        {songs.map(song => (
          <SongSelectList
            key={song.id}
            title={song.title}
            composer={song.composer}
            singer={song.singer}
            selectSong={() => selectSong(song)} // Pass the whole song object to selectSong
          />
        ))}
      </div>
    </div>
  );
}

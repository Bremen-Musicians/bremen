'use client';

import { useState } from 'react';
import ModalForm from '@/components/Common/ModalForm';
import styles from './FindSong.module.scss';
import FindSongModal from './FindSongModal';

interface SongData {
  title: string;
  artist: string;
  id: number;
}

interface FindSongProps {
  onSongSelect: (id: number) => void; // Function that takes an ID and does not return anything
}

export default function FindSong({ onSongSelect }: FindSongProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState<SongData | null>(null);

  const clickSearchBox = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const registSong = (songData: SongData) => {
    setSelectedSong(songData);
    onSongSelect(songData.id); // Pass the song ID to the outer component
  };

  return (
    <>
      <div className={styles.findsongarea}>
        <div className={styles.song}>챌린지 곡:</div>
        <div onClick={clickSearchBox} className={styles.searchbox}>
          <input type="text" value={selectedSong ? `${selectedSong.title} - ${selectedSong.artist}` : ''} readOnly></input>
        </div>
      </div>
      <ModalForm isOpen={openModal} onClose={closeModal}>
        <FindSongModal registSong={registSong} closeModal={closeModal} />
      </ModalForm>
    </>
  );
}

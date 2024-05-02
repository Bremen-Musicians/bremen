'use client';

import {useState} from 'react';
import ModalForm from '@/components/Common/ModalForm';
import styles from './FindSong.module.scss';
import FindSongModal from './FindSongModal';

export default function FindSong() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedSong, setSelectedSong] = useState('');

  const clickSearchBox = () => {
    setOpenModal(true);
  };
  const closeModal = () => {
    setOpenModal(false);
  };
  const registSong = (selected: string) => {
    setSelectedSong(selected);
  };

  return (
    <>
      <div className={styles.findsongarea}>
        <span className={styles.song}>챌린지 곡 : </span>
        <div onClick={clickSearchBox} className={styles.searchbox}>
          <input type="text" value={selectedSong} readOnly></input>
        </div>
      </div>
      <div>
        <ModalForm isOpen={openModal} onClose={closeModal}>
          <FindSongModal registSong={registSong} closeModal={closeModal} />
        </ModalForm>
      </div>
    </>
  );
}

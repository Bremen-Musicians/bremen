'use client';

import React, { useState } from 'react';
import FindSong from './FindSong';
import FindDate from './FindDate';
import IntroChallenge from './IntroChallenge';
import styles from './Challenge.module.scss';
import api from '@/api/apiMulti';
import { useRouter } from 'next/navigation';

export default function Challenge() {
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [songId, setSongId] = useState<number | null>(null);
  const [isDateValid, setIsDateValid] = useState(true);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [challengeImage, setChallengeImage] = useState<File | null>(null);
  const router = useRouter();

  const handleSongId = (id: number): void => {
    setSongId(id);
  };

  const handleStartDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(0, 0, 0, 0);
    }
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    if (date) {
      date.setHours(23, 59, 59, 999);
    }
    setEndDate(date);
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsDateValid(isValid);
  };

  const handleFileUpload = (file: File, id: string) => {
    if (id === 'main') {
      setMainImage(file);
    } else if (id === 'challenge') {
      setChallengeImage(file);
    }
  };

  const submit = () => {
    const formatDateTime = (date: Date | null): string | null => {
      return date ? date.toISOString() : null;
    };

    const formattedStartDate = formatDateTime(startDate);
    const formattedEndDate = formatDateTime(endDate);

    if (songId !== null && isDateValid && mainImage && challengeImage) {
      const url = `/challenges`;
      const formData = new FormData();

      // challengeInfo JSON 객체를 String으로 변환
      const challengeInfo = JSON.stringify({
        musicId: songId,
        startTime: formattedStartDate,
        endTime: formattedEndDate
      });

      // FormData에 challengeInfo를 추가
      formData.append('challengeInfo', new Blob([challengeInfo], { type: 'application/json' }));
      formData.append('mainImage', mainImage);
      formData.append('challengeImage', challengeImage);

      // API 요청
      api.post(url, formData, {
        headers: {
          // 'Content-Type': 'multipart/form-data'은 자동 설정됨
        }
      })
      .then(response => {
        alert('등록되었습니다');
        router.back(); // 성공 후 이전 페이지로 돌아가기
      })
      .catch(error => {
        console.error('Failed to create challenge:', error);
      });
    } else {
      console.log('실패! songId 또는 날짜가 유효하지 않습니다.');
    }
  };

  return (
    <div className={styles.page}>
      <span className={styles.title}>챌린지 정보 등록</span>
      <div className={styles.challengepage}>
        <FindSong onSongSelect={handleSongId} />
        <FindDate onStartDateChange={handleStartDateChange} onEndDateChange={handleEndDateChange} onValidationChange={handleValidationChange} />
        {!songId && <div className={styles.warning}>노래를 선택해 주세요.</div>}
        {!isDateValid && <div className={styles.warning}>종료일은 시작일 이후가 되어야 합니다.</div>}
        <IntroChallenge onFileUpload={handleFileUpload} />
        <div className={styles.imagePreview}>
          {mainImage && <img src={URL.createObjectURL(mainImage)} alt="Main" style={{ width: '100px', height: '125px' }} />}
          {challengeImage && <img src={URL.createObjectURL(challengeImage)} alt="Challenge" style={{ width: '100px', height: '125px' }} />}
        </div>
        <div onClick={submit} className={styles.submitbutton}>등록</div>
      </div>
    </div>
  );
}

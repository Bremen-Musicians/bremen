import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '@/components/Alarm/Alarm.module.scss';
import Header from '@/components/Common/Header';
import Image from 'next/image';
import api from '@/api/api';
import 'moment/locale/ko';

interface Alarm {
  id: number;
  page: number;
  content: string;
  type: string;
  createTime: string;
}

const Page = () => {
  const [alarmList, setAlarmList] = useState<Alarm[]>([]);
  const [showHeader, setShowHeader] = useState(false);

  const handleDeleteAlarm = async (id: number) => {
    try {
      // 클라이언트에서 삭제
      const newAlarmList = alarmList.filter(alarm => alarm.id !== id);
      setAlarmList(newAlarmList);
  
      // 서버에 삭제 요청
      await api.delete(`/notification?id=${id}`);
      console.log('알림 삭제 성공');
    } catch (error) {
      console.error('알림 삭제 중 에러 발생:', error);
    }
  };
  

  const handleDeleteAll = () => {
    setAlarmList([]);
  };

  const calculateElapsedTime = (date: string) => {
    const now = new Date();
    const diff = Math.round((now.getTime() - new Date(date).getTime()) / (1000 * 60)); // 경과 시간을 분 단위로 계산

    if (diff < 60) {
      return `${diff}분 전`;
    }
    if (diff >= 60 && diff < 1440) {
      return `${Math.floor(diff / 60)}시간 전`;
    }
    return `${Math.floor(diff / 1440)}일 전`;
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setShowHeader(window.innerWidth >= 450);
    }

    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setShowHeader(window.innerWidth >= 450);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/notification');
        console.log('알림 데이터:', response.data);
        // Alarm 인터페이스에 맞게 데이터 매핑
        const mappedAlarms = response.data.items.map((item: any) => ({
          id: item.id, // 인덱스를 사용하여 유일한 id 생성
          page: response.data.pageable.pageNumber,
          content: item.content,
          type: item.type,
          createTime: item.createTime,
        }));
        setAlarmList(mappedAlarms); // 알림 데이터를 상태로 설정
      } catch (error) {
        console.error('알림 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchNotifications();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {showHeader && <Header />}
      <div className={styles.container}>
        <div className={styles.alarmtitle}>
          <Link href="/alarm" className={styles.alarmtext}>
            알림
          </Link> 
        </div>
        <div className={styles.deleteAllButtonBlock}>
          <button className={styles.deleteAllButton} onClick={handleDeleteAll}>
            전체 삭제
          </button>
        </div>
        <div
          className={styles.alarms}
          style={{ maxHeight: '300px', overflowY: 'auto' }}
        >
          {alarmList.length === 0 ? (
            <div className={styles.noAlarms}>현재 받은 알림이 없습니다.</div>
          ) : (
            alarmList.map((alarm: Alarm) => (
              <div key={alarm.id} className={styles.alarm}>
                <div className={styles.message}>{alarm.content}</div>
                <div className={styles.date}>
                  {calculateElapsedTime(alarm.createTime)} {/* 수정된 부분 */}
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteAlarm(alarm.id)}
                >
                  <Image src={'/Icon/minus.png'} alt="삭제" width={20} height={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Page;

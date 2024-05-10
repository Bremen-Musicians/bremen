import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import styles from '@/components/Alarm/Alarm.module.scss';
import Header from '@/components/Common/Header';
import Image from 'next/image';

const alarms = [
  {
    id: 1,
    type: 'follow',
    message: '우주최강베이시스트님이 회원님을 팔로우했습니다.',
    page: '우주최강베이시스트님의 페이지로 이동',
    date: new Date('2024-05-08T08:30:00'), // 예시로 고정된 날짜와 시간을 사용
  },
  {
    id: 2,
    type: 'follow',
    message: '우주최강회원님이 회원님을 팔로우했습니다.',
    page: '우주최강베이시스트님의 페이지로 이동',
    date: new Date('2024-05-08T08:20:00'), // 예시로 고정된 날짜와 시간을 사용
  },
  {
    id: 3,
    type: 'follow',
    message: '우원님이 회원님을 팔로우했습니다.',
    page: '우원님의 페이지로 이동',
    date: new Date('2024-05-07T08:10:00'), // 예시로 고정된 날짜와 시간을 사용
  },
  {
    id: 4,
    type: 'follow',
    message: '우원님이 회원님을 팔로우했습니다.',
    page: '우원님의 페이지로 이동',
    date: new Date('2024-05-07T08:10:00'), // 예시로 고정된 날짜와 시간을 사용
  },
  {
    id: 5,
    type: 'follow',
    message: '우원님이 회원님을 팔로우했습니다.',
    page: '우원님의 페이지로 이동',
    date: new Date('2024-05-07T08:10:00'), // 예시로 고정된 날짜와 시간을 사용
  },
];

const Page = () => {
  const [alarmList, setAlarmList] = useState(alarms);
  const [showHeader, setShowHeader] = useState(false); // 초기값 변경

  const handleDeleteAlarm = (id: number) => {
    const newAlarmList = alarmList.filter(alarm => alarm.id !== id);
    setAlarmList(newAlarmList);
  };

  const handleDeleteAll = () => {
    setAlarmList([]);
  };

  useEffect(() => {
    // 클라이언트 사이드에서만 실행되도록 조건 추가
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

  const calculateElapsedTime = (date: Date) => {
    const now = new Date();
    const diff = Math.round((now.getTime() - date.getTime()) / (1000 * 60)); // 경과 시간을 분 단위로 계산

    if (diff < 60) {
      return `${diff}분 전`;
    }
    if (diff >= 60 && diff < 1440) {
      return `${Math.floor(diff / 60)}시간 전`;
    }
    return `${Math.floor(diff / 1440)}일 전`;
  };

  useEffect(() => {
    // 페이지 진입 시 body의 스타일을 변경하여 전체 화면 스크롤을 없앰
    document.body.style.overflow = 'hidden';

    // 컴포넌트가 unmount될 때 스타일 초기화
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <>
      {showHeader && <Header />}
      <div className={styles.container}>
        <div className={styles.alarmtitle}>
          <Link href="/alarm" className={styles.alarmtext}>
            알림
          </Link>
          <div className={styles.chattext}>채팅</div>
        </div>
        <div className={styles.deleteAllButtonBlock}>
          <button className={styles.deleteAllButton} onClick={handleDeleteAll}>
            전체 삭제
          </button>
        </div>
        <div
          className={styles.alarms}
          style={{maxHeight: '300px', overflowY: 'auto'}}
        >
          {alarmList.length === 0 ? (
            <div className={styles.noAlarms}>현재 받은 알림이 없습니다.</div>
          ) : (
            alarmList.map(alarm => (
              <div key={alarm.id} className={styles.alarm}>
                <div className={styles.message}>{alarm.message}</div>
                <div className={styles.date}>
                  {calculateElapsedTime(alarm.date)}
                </div>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteAlarm(alarm.id)}
                >
                  <Image
                    src={'/Icon/minus.png'}
                    alt="삭제"
                    width={20}
                    height={20}
                  />
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

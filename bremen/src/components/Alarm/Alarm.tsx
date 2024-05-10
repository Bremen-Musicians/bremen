import React, {useState} from 'react';
import styles from '@/components/Alarm/Alarm.module.scss';

const alarms = [
  {
    id: 1,
    type: 'follow',
    message: '우주최강베이시스트님이 회원님을 팔로우했습니다.',
  },
  {
    id: 2,
    type: 'video',
    message: '회원님이 업로드한 동영상이 사용되었습니다.',
  },
  {
    id: 3,
    type: 'challenge',
    message: '챌린지 결과가 발표되었습니다.',
  },
];

const Page = () => {
  const [alarmList, setAlarmList] = useState(alarms);

  const handleDeleteAlarm = id => {
    // 클릭한 알람을 제외한 나머지 알람을 유지하여 새로운 알람 목록 설정
    const newAlarmList = alarmList.filter(alarm => alarm.id !== id);
    setAlarmList(newAlarmList);
  };

  const handleDeleteAll = () => {
    // 알림 목록을 빈 배열로 설정하여 모든 알림 삭제
    setAlarmList([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>알림</div>
        <div>채팅</div>
        <button onClick={handleDeleteAll}>전체 삭제</button>
      </div>
      <div className={styles.alarms}>
        {alarmList.length === 0 ? (
          <div className={styles.noAlarms}>현재 받은 알림이 없습니다.</div>
        ) : (
          alarmList.map(alarm => (
            <div key={alarm.id} className={styles.alarm}>
              <div className={styles.message}>{alarm.message}</div>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteAlarm(alarm.id)}
              >
                -
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Page;

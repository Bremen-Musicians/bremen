/* eslint-disable no-console */
import {useState, useEffect} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment';
import 'moment/locale/ko';
import api from '@/api/api';
import styles from '@/components/Alarm/Alarm.module.scss';
import Header from '@/components/Common/Header';
import {AlarmContent} from '@/types/Alarm';

type NotificationItem = {
  id: number;
  content: string;
  type: string;
  createTime: string;
};

type NotificationResponse = {
  items: NotificationItem[];
};

const Page = () => {
  const [alarmList, setAlarmList] = useState<AlarmContent[]>([]);

  const handleDeleteAlarm = (id: number) => {
    api
      .delete(`/notification?id=${id}`)
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          setAlarmList(prevAlarms =>
            prevAlarms.filter(alarm => alarm.id !== id),
          );
        }
      })
      .catch(error => {
        console.error('알림 삭제 중 에러 발생:', error);
      });
  };

  const handleDeleteAll = () => {
    setAlarmList([]);
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get<NotificationResponse>('/notification');
        const mappedAlarms: AlarmContent[] = response.data.items.map(
          (item: NotificationItem) => ({
            id: item.id,
            content: item.content,
            type: item.type,
            createTime: item.createTime,
          }),
        );
        setAlarmList(mappedAlarms);
      } catch (error) {
        console.error('알림 데이터를 가져오는 중 에러 발생:', error);
      }
    };

    fetchNotifications().catch(error => console.error(error));
  }, []);
  return (
    <>
      <Header />
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
        <div className={styles.alarms}>
          {alarmList.length === 0 ? (
            <div className={styles.noAlarms}>현재 받은 알림이 없습니다.</div>
          ) : (
            alarmList.map((alarm: AlarmContent) => (
              <div key={alarm.id} className={styles.alarm}>
                <div className={styles.message}>{alarm.content}</div>
                <div className={styles.date}>
                  {moment(alarm.createTime).fromNow()}
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

// /* eslint-disable no-console */
// import {useState, useEffect} from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import api from '@/api/api';
// import 'moment/locale/ko';
// import styles from '@/components/Alarm/Alarm.module.scss';
// import Header from '@/components/Common/Header';
// import {AlarmContent, IAlarmResponse} from '@/types/Alarm';

// const Page = () => {
//   const [alarmList, setAlarmList] = useState<AlarmContent[]>([]);

//   //TODO: 알람 response 파악 후 정리
//   const handleDeleteAlarm = (id: number) => {
//     try {
//       // const newAlarmList = alarmList.filter(alarm => alarm.id !== id);
//       // setAlarmList(newAlarmList);
//       // 서버에 삭제 요청
//       api.delete(`/notification?id=${id}`)
//       .then((response) => {
//         if(response.status>= 200 && response.status<300){
//           // const index = alarmList.indexOf(id);
//         }
//       })
//       .catch(error => {
//         console.error('알림 삭제 중 에러 발생:', error);
//       });
//       // console.log('알림 삭제 성공');
//     } catch (error) {
//       console.error('알림 삭제 중 에러 발생:', error);
//     }
//   };

//   const handleDeleteAll = () => {
//     setAlarmList([]);
//   };

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setShowHeader(window.innerWidth >= 450);
//     }

//     const handleResize = () => {
//       if (typeof window !== 'undefined') {
//         setShowHeader(window.innerWidth >= 450);

//     };

//     window.addEventListener('resize', handleResize);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchNotifications = async () => {
//       try {
//         const response = await api.get('/notification');
//         // console.log('알림 데이터:', response.data);
//         // Alarm 인터페이스에 맞게 데이터 매핑
//         const mappedAlarms = response.data.items.map(
//           (item: NotificationItem) => ({
//             id: item.id,
//             content: item.content,
//             type: item.type,
//             createTime: item.createTime,
//           }),
//         );
//         setAlarmList(mappedAlarms); // 알림 데이터를 상태로 설정
//       } catch (error) {
//         console.error('알림 데이터를 가져오는 중 에러 발생:', error);
//       }
//     };

//     fetchNotifications();
//   }, []);

//   return (
//     <>
//       <Header />
//       <div className={styles.container}>
//         <div className={styles.alarmtitle}>
//           <Link href="/alarm" className={styles.alarmtext}>
//             알림
//           </Link>
//         </div>
//         <div className={styles.deleteAllButtonBlock}>
//           <button className={styles.deleteAllButton} onClick={handleDeleteAll}>
//             전체 삭제
//           </button>
//         </div>
//         <div className={styles.alarms}>
//           {alarmList.length === 0 ? (
//             <div className={styles.noAlarms}>현재 받은 알림이 없습니다.</div>
//           ) : (
//             alarmList.map((alarm: Alarm) => (
//               <div key={alarm.id} className={styles.alarm}>
//                 <div className={styles.message}>{alarm.content}</div>
//                 <div className={styles.date}>{moment().fromNow()}</div>
//                 <button
//                   className={styles.deleteButton}
//                   onClick={() => handleDeleteAlarm(alarm.id)}
//                 >
//                   <Image
//                     src={'/Icon/minus.png'}
//                     alt="삭제"
//                     width={20}
//                     height={20}
//                   />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;

'use client';

import {useRouter} from 'next/navigation';
import styles from '@/components/MyPage/Profile/MyButtons.module.scss';
import useUserInfoStore from '@/stores/UserInfo';
import api from '@/api/api';

export default function MyButtons() {
  const router = useRouter();
  const {
    zustandRFToken,
    setZustandUserImage,
    setZustandUserNickname,
    setZustandToken,
    setZustandRFToken,
    setZustandUserId,
    setZustandEmail,
  } = useUserInfoStore();

  // 프로필 수정
  const editProfile = () => {
    router.push('/mypage/edit');
  };

  // 로그아웃
  const logout = () => {
    api
      .get(`/users/logout`, {
        headers: {
          'Refresh-Token': `Bearer ${zustandRFToken}`,
        },
      })
      .then(() => {
        // zustand user store 초기화
        setZustandUserImage('');
        setZustandUserNickname('');
        setZustandToken('');
        setZustandRFToken('');
        setZustandUserId(0);
        setZustandEmail('');
        // eslint-disable-next-line no-alert
        alert('로그아웃 되었습니다.');
        router.push('/');
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  return (
    <div className={styles.buttons}>
      <div className={styles.editbutton} onClick={editProfile}>
        수정
      </div>
      <div className={styles.messagebutton} onClick={logout}>
        로그아웃
      </div>
    </div>
  );
}

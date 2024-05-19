'use client';

import MyPageHeader from '@/components/MyPage/Profile/MyPageHeader';
import {useEffect, useState} from 'react';
import api from '@/api/api';
import useUserInfoStore from '@/stores/UserInfo';
import MyInfo from './MyInfo';
import Tabs from '../Plays/Tabs';
import MyButtons from './MyButtons';

interface IUser {
  username: string;
  nickname: string;
  introduce: string;
  profileImage: string;
  followerCnt: number;
  followCnt: number;
  follow: boolean;
}

interface IUserResponse {
  status: number;
  message: string;
  item: IUser;
}

export default function MyProfile() {
  const {zustandUserNickname} = useUserInfoStore.getState();
  const [me, setMe] = useState<IUser>();

  useEffect(() => {
    api
      .get<IUserResponse>(`/users?nickname=${zustandUserNickname}`)
      .then(response => {
        setMe(response.data.item);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  }, [zustandUserNickname]);

  return (
    <div>
      {me && (
        <>
          <MyPageHeader nickname={me.nickname} />
          <MyInfo me={me} />
          <MyButtons />
          <Tabs />
        </>
      )}
    </div>
  );
}

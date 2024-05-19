'use client';

import {useParams} from 'next/navigation';
import {useEffect, useState} from 'react';
import api from '@/api/api';
import UserPageHeader from './Profile/MyPageHeader';
import UserInfo from './Profile/MyInfo';
import UserButtons from './Profile/MyButtons';
import Tabs from './Plays/Tabs';

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

interface IFollowResponse {
  status: number;
  message: string;
  item: string;
}

export default function UserPage() {
  const param = useParams();
  const [user, setUser] = useState<IUser>();

  const getUserInfo = () => {
    // eslint-disable-next-line no-console
    api
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      .get<IUserResponse>(`/users?nickname=${param.nickname}`)
      .then(response => {
        setUser(response.data.item);
      })
      .catch(error => {
        // eslint-disable-next-line no-console
        console.error(error, '에러!');
      });
  };

  const handleFollow = () => {
    if (user) {
      api
        .get<IFollowResponse>(`/users/follow?nickname=${user.nickname}`)
        .then(() => {
          getUserInfo();
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error(error, '에러!');
        });
    }
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      {user && (
        <>
          <UserPageHeader nickname={user.nickname} />
          <UserInfo user={user} />
          <UserButtons follow={user.follow} handleFollow={handleFollow} />
          <Tabs />
        </>
      )}
    </div>
  );
}

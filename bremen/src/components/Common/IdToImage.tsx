'use client';

import {useState, useEffect} from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import styles from '@/components/Common/IdToImage.module.scss';

interface IUserInfo {
  username: string;
  nickname: string;
  introduce: string;
  profileImage: string | null;
  followerCnt: number;
  followCnt: number;
  follow: boolean;
}

interface IResponse {
  status: number;
  message: string;
  item: IUserInfo;
}
const IdToImage = ({id, isLink}: {id: number; isLink: boolean}) => {
  const [userImg, setUserImg] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');

  useEffect(() => {
    /** 서버 연결해서 아이디로 회원 정보 조회(이미지 가져오기) */
    axios
      .get<IResponse>(
        `https://k10a104.p.ssafy.io/api/v1/users?id=${id}`,
      )
      .then(response => {
        const profileImg = response.data.item.profileImage;
        if (profileImg) setUserImg(profileImg);
        setUserNickname(response.data.item.nickname);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.error(error));
  }, [id]);
  return (
    <div>
      {isLink ? (
        <div className={styles.container}>
          <Link href={`/user/${userNickname}`}>
            <div className={styles.image}>
              {userImg && (
                <Image
                  className={styles.imageTag}
                  width={100}
                  height={100}
                  src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${userImg}`}
                  alt={userNickname}
                />
              )}
            </div>
          </Link>
          <div className={styles.name}>{userNickname}</div>
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.image}>
            {userImg && (
              <Image
                width={100}
                height={100}
                className={styles.imageTag}
                src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${userImg}`}
                alt={userNickname}
              />
            )}
          </div>
          <div className={styles.name}>{userNickname}</div>
        </div>
      )}
    </div>
  );
};
export default IdToImage;

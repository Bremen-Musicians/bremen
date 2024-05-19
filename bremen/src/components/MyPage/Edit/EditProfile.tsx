/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import axios from 'axios';
import ImageUp from '@/components/Common/ImageUp';
import ProfileInput from '@/components/User/ProfileInput';
import useUserInfoStore from '@/stores/UserInfo';
import styles from '@/components/User/ProfileIndex.module.scss';
import api from '@/api/api';

// TODO : 기존 프로필 이미지, 소개 내용 불러오기
// TODO : 새 프로필 이미지 전송 시 zustand 업데이트

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

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 10vmin;
  gap: 7vmin;
  @media (min-width: 450px) {
    padding: 6vmin;
    gap: 5vmin;
  }
`;

const Title = styled.div`
  text-align: center;
  color: var(--light-gray-color);
  font-size: 6vmin;
  font-weight: bold;
  margin-bottom: 4vmin;
  @media (min-width: 450px) {
    font-size: 4vmin;
    margin-bottom: 2.5vmin;
  }
`;

const NextButton = styled.button`
  text-align: center;
  border-radius: 10px;
  height: 8vmin;
  width: 16vmin;
  font-size: 16px;
  font-weight: bold;
`;

const EditProfile = () => {
  const [profileContent, setProfileContent] = useState<string>('');
  const {
    zustandToken,
    zustandUserNickname,
    zustandUserImage,
    zustandEmail,
    setZustandUserImage,
  } = useUserInfoStore();
  const [userImg, setUserImg] = useState<string>(zustandUserImage);
  const [userImgFile, setUserImgFile] = useState<File | null>(null);

  const router = useRouter();

  const handleClick = () => {
    const formData = new FormData();

    if (userImgFile) {
      console.log('userImgFile', userImgFile);
      formData.append('profileImage', userImgFile);
    }
    formData.append('nickname', zustandUserNickname);
    formData.append('introduce', profileContent);
    formData.append('profileUrl', '');

    const boundary = `----WebKitFormBoundary${crypto.randomUUID()}`;

    axios
      .patch(`https://k10a104.p.ssafy.io/api/v1/users/profile`, formData, {
        headers: {
          'Content-Type': `multipart/form-data; boundary=${boundary}`,
          Authorization: `Bearer ${zustandToken}`,
        },
      })
      .then(response => {
        // eslint-disable-next-line no-console
        console.log('파일O요청, axios, boundary: ', response);

        // zustand에 유저 이미지 바꿈
        api
          .get<IUserResponse>(`/users?nickname=${zustandUserNickname}`)
          .then(res => {
            console.log(res.data.item.profileImage);
            setZustandUserImage(res.data.item.profileImage);
          })
          .catch(error => {
            console.error(error, '에러!');
          });

        // eslint-disable-next-line no-alert
        alert('프로필 변경이 완료되었습니다.');
        router.push('/mypage');
      })
      .catch(Error => {
        // eslint-disable-next-line no-console
        console.error('axios, boundary: ', Error);
      });
  };

  return (
    <div>
      <Container>
        <div>
          <Title>프로필 이미지</Title>
          <ImageUp
            buttonDetail="사진 등록"
            setUserImg={setUserImg}
            initialImg={zustandUserImage}
            setUserImgFile={setUserImgFile}
          />
        </div>
        <div>
          <Title>프로필 작성</Title>
          <ProfileInput setProfileContent={setProfileContent} />
        </div>
        <NextButton onClick={handleClick}>다음</NextButton>
      </Container>
      <Image
        src="/bremenWalk.png"
        width={300}
        height={300}
        alt="브레멘"
        className={styles.bremen}
      />
    </div>
  );
};
export default EditProfile;

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

// TODO: 서버에서 랜덤이미지 받기
// TODO: 주스탠드 부르기, 저장, 서버 전송
// TODO: 프로필 이미지 컴포넌트 수정, url 가져오기

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

const ProfileIndex = () => {
  const [profileContent, setProfileContent] = useState<string>('');
  const {zustandEmail} = useUserInfoStore();

  const number = Math.floor(Math.random() * 5 + 1);
  const initialImg = `/basicImage/no_image_${number}.png`;
  const [userImg, setUserImg] = useState<string>(initialImg);
  const [userImgFile, setUserImgFile] = useState<File | null>(null);

  const router = useRouter();

  const handleClick = () => {
    // TODO: zustandUserImage, profileContent 보내기
    let sendImage = userImg;
    if (userImg.includes('/basicImage/no_image_')) {
      sendImage = `no_image_${number}.png`;
      const formData = new FormData();
      formData.append('profileUrl', sendImage);
      formData.append('username', zustandEmail);
      formData.append('introduce', profileContent);
      formData.append('profileImage', '');

      const boundary = `----WebKitFormBoundary${crypto.randomUUID()}`;
      axios
        .post(`https://k10a104.p.ssafy.io/api/v1/users/profile`, formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
          },
        })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('파일x요청: ', response, '헤더: ', Headers);
        })
        .catch(Error => {
          // eslint-disable-next-line no-console
          console.error(Error);
        });
    } else {
      const formData = new FormData();

      if (userImgFile) {
        console.log('userImgFile', userImgFile);
        formData.append('profileImage', userImgFile);
      }
      formData.append('username', zustandEmail);
      formData.append('introduce', profileContent);
      formData.append('profileUrl', '');

      const boundary = `----WebKitFormBoundary${crypto.randomUUID()}`;

      axios
        .post(`https://k10a104.p.ssafy.io/api/v1/users/profile`, formData, {
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
          },
        })
        .then(response => {
          // eslint-disable-next-line no-console
          console.log('파일O요청, axios, boundary: ', response);
        })
        .catch(Error => {
          // eslint-disable-next-line no-console
          console.error('axios, boundary: ', Error);
        });
    }

    router.push('/user/login');
  };

  return (
    <div>
      <Container>
        <div>
          <Title>프로필 이미지</Title>
          <ImageUp
            buttonDetail="사진 등록"
            setUserImg={setUserImg}
            initialImg={initialImg}
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
export default ProfileIndex;

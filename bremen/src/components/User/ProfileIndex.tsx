/* eslint-disable @typescript-eslint/no-unused-vars */

'use client';

import {useRouter} from 'next/navigation';
import {useState} from 'react';
import styled from 'styled-components';
import ImageUp from '@/components/Common/ImageUp';
import ProfileInput from '@/components/User/ProfileInput';
import useUserInfoStore from '@/stores/UserInfo';

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
  const [userImg, setUserImg] = useState<string>('');
  const [profileContent, setProfileContent] = useState<string>('');
  const {zustandUserImage, setZustandUserImage} = useUserInfoStore();

  const router = useRouter();

  const handleClick = () => {
    setZustandUserImage(userImg);
    // TODO: zustandUserImage, profileContent 보내기
    if (userImg.includes('no_image_')) {
      // TODO: axios 다른 형태로 보내기
    }
    // axios
    //   .post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`, zustandUserImage, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch(Error => {
    //     console.error(Error);
    //   });
    setZustandUserImage(''); // 초기화
    router.push('/user/login');
  };

  const number = Math.floor(Math.random() * 5 + 1);
  const initialImg = `/basicImage/no_image_${number}.png`;

  return (
    <Container>
      <div>
        <Title>프로필 이미지</Title>
        <ImageUp
          buttonDetail="사진 등록"
          setUserImg={setUserImg}
          initialImg={initialImg}
        />
      </div>
      <div>
        <Title>프로필 작성</Title>
        <ProfileInput setProfileContent={setProfileContent} />
      </div>
      <NextButton onClick={handleClick}>다음</NextButton>
    </Container>
  );
};
export default ProfileIndex;

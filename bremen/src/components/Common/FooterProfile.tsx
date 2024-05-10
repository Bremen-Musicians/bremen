'use client';

import Image from 'next/image';
import styled from 'styled-components';
import useStore from '@/hooks/useStore';
import useUserInfoStore, {IUserInfo} from '@/stores/UserInfo';

const Profile = styled.div`
  width: 7vmin;
  height: 7vmin;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 1vmin;
  margin-bottom: 1vmin;
  display: flex;
  background-color: white;
`;

const FootProfile = () => {
  const userImage = useStore<IUserInfo, string>(
    useUserInfoStore,
    state => state.zustandUserImage,
  );
  const randomNumber = Math.floor(Math.random() * 5 + 1);
  const randomUrl = `/basicImage/no_image_${randomNumber}.png`;
  return (
    <Profile>
      {typeof userImage === 'string' && userImage !== '' ? (
        <Image
          src={userImage}
          width={200}
          height={200}
          style={{width: '100%', height: 'auto'}}
          alt="이미지"
        />
      ) : (
        <Image
          src={randomUrl}
          width={200}
          height={200}
          style={{width: '100%', height: 'auto'}}
          alt="이미지"
        />
      )}
    </Profile>
  );
};

export default FootProfile;

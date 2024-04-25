'use client';

import Image from 'next/image';
import styled from 'styled-components';
import useStore from '@/hooks/useStore';
import useUserInfoStore, {IUserInfo} from '@/stores/UserInfo';

const Profile = styled.div`
  width: 7vmin;
  height: 7vmin;
  background-color: olive;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 1vmin;
  margin-bottom: 1vmin;
`;

const FootProfile = () => {
  const userImage = useStore<IUserInfo, string>(
    useUserInfoStore,
    state => state.zustandUserImage,
  );
  return (
    <Profile>
      {typeof userImage === 'string' ? (
        <Image
          src={userImage}
          width={200}
          height={200}
          style={{width: '100%', height: 'auto'}}
          alt="이미지"
        />
      ) : null}
    </Profile>
  );
};

export default FootProfile;

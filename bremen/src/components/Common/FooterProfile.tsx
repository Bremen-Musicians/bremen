'use client';

import Image from 'next/image';
import styled from 'styled-components';
import useStore from '@/hooks/useStore';
import useUserInfoStore, {IUserInfo} from '@/stores/UserInfo';
import no_image_1 from '../../../public/basicImage/no_image_1.png';
import no_image_2 from '../../../public/basicImage/no_image_2.png';
import no_image_3 from '../../../public/basicImage/no_image_3.png';
import no_image_4 from '../../../public/basicImage/no_image_4.png';
import no_image_5 from '../../../public/basicImage/no_image_5.png';

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
  const randomNumber = Math.floor(Math.random() * 5);
  const images = [no_image_1, no_image_2, no_image_3, no_image_4, no_image_5];
  const randomUrl = images[randomNumber];

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

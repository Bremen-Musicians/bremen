'use client';

import styled from 'styled-components';
import {useState} from 'react';

const Profile = styled.textarea`
  border-radius: 10px;
  width: 76vmin;
  max-width: 456px;
  height: 35vmin;
  max-height: 170px;
  padding: 10px;
  font-size: 4.5vmin;
  @media (min-width: 450px) {
    height: 20vmin;
    font-size: 20px;
  }
`;
const Length = styled.div`
  text-align: end;
  color: white;
`;

const ProfileInput = ({
  setProfileContent,
}: {
  setProfileContent: (newValue: string) => void;
}) => {
  const [length, setLength] = useState<number>(0);
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfileContent(event?.target.value);
    setLength(event?.target.value.length);
  };
  return (
    <div>
      <Profile
        maxLength={100}
        placeholder="프로필을 입력하세요"
        onChange={handleChange}
      />
      <Length>{length}/100자</Length>
    </div>
  );
};

export default ProfileInput;

'use client';

import {useRef, useState} from 'react';
import Image from 'next/image';
// import axios from 'axios';
import styles from '@/components/Common/ImageUp.module.scss';
/**
 * 1. 상위 컴포넌트 초기 데이터 받기 V
 * 2. 로컬에서 이미지 넣었다 빼었다 가능(이미지 url 위로 올리기) V
 * 3. 상위 컴포넌트에서 다음 버튼 누르면 상위컴포넌트에서 주스탠드 저장, 서버 전송
 */
const ImageUp = ({
  buttonDetail,
  setUserImg,
  initialImg,
  setUserImgFile,
}: {
  buttonDetail: string;
  setUserImg: (newImg: string) => void;
  initialImg: string;
  setUserImgFile: (newFile: FormData) => void;
}) => {
  const imgRef = useRef<HTMLInputElement>(null);
  const [presentImgUrl, setPresentImgUrl] = useState<string>(initialImg);

  const saveImgFile = () => {
    if (imgRef.current && imgRef.current.files && imgRef.current.files[0]) {
      const file = imgRef.current.files[0];
      const reader = new FileReader();
      const imageUrl = URL.createObjectURL(file);
      setUserImg(imageUrl);
      setPresentImgUrl(imageUrl);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        const formData = new FormData();
        formData.append('userImg', file);
        setUserImgFile(formData);
      };
    }
  };

  return (
    <div className={styles.container}>
      {/* <form
        method="POST"
        encType="multipart/form-data"
        action={`${process.env.NEXT_PUBLIC_BASE_URL}/user/profile`}
      > */}
      <form method="POST" encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          id="profileImg"
          onChange={saveImgFile}
          ref={imgRef}
          hidden
        />
        <label className={styles.changeLabel} htmlFor="profileImg">
          <div className={styles.profileImageContainer}>
            <Image
              className={styles.profileImg}
              src={presentImgUrl}
              alt="프로필 사진"
              width={200}
              height={200}
            />
          </div>
          <div className={styles.changeButton}>{buttonDetail}</div>
        </label>
      </form>
    </div>
  );
};
export default ImageUp;

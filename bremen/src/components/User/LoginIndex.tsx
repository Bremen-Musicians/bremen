'use client';

import {useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import styles from '@/components/User/LoginIndex.module.scss';
import useUserInfoStore from '@/stores/UserInfo';
import {LoginResponse} from '@/types/UserResponse';

const LoginIndex = () => {
  const [isIDPass, setIsIDPass] = useState<boolean>(true);
  const [isPWPass, setIsPWPass] = useState<boolean>(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoginPass, setIsLoginPass] = useState<boolean>(true);
  const router = useRouter();
  const {
    setZustandUserImage,
    setZustandUserNickname,
    setZustandToken,
    setZustandRFToken,
  } = useUserInfoStore();
  /** 엔터누르면 전송
   * 전송 버튼 누르면 전송
   *
   */

  const doLogin = async ({email, pw}: {email: string; pw: string}) => {
    try {
      const loginData = {
        username: email,
        password: pw,
      };
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/login`,
        loginData,
      );
      if (response.data.status >= 200 && response.data.status < 300) {
        // FIXME: API수정 후 삭제 필요
        if (response.data.data.profileImage.includes('no_image')) {
          setZustandUserImage(`/profile/${response.data.data.profileImage}`);
        } else {
          setZustandUserImage(response.data.data.profileImage);
        }
        setZustandUserNickname(response.data.data.nickname);
        setZustandToken(response.data.data.accessToken);
        setZustandRFToken(response.data.data.refreshToken);
        router.push('/');
      } else {
        setIsLoginPass(false);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('로그인 에러: ', error);
      setIsLoginPass(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailValue: string = (
      document.getElementById('email') as HTMLInputElement
    ).value.trim();
    const passwordValue: string = (
      document.getElementById('password') as HTMLInputElement
    ).value.trim();

    if (emailValue === '') {
      setIsIDPass(false);
    } else if (passwordValue === '') {
      if (!isIDPass) {
        setIsIDPass(true);
      }
      setIsPWPass(false);
    } else {
      setIsPWPass(true);
      doLogin({email: emailValue, pw: passwordValue}).catch(error =>
        // eslint-disable-next-line no-console
        console.error('err', error),
      );
      // TODO: 서버 전송 -> 응답 OK -> 데이터 주스탠드 저장(닉네임, 프로필 이미지) && 홈으로 보내기 / 응답 No -> setIsLoginPass(false);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.secondCon}>
          <div className={styles.idTag}>
            <div className={styles.title}>이메일</div>
            <input
              type="text"
              id="email"
              placeholder="이메일"
              maxLength={30}
              className={styles.inputTag}
            />
            {isIDPass && <div className={styles.vacant}></div>}
            {!isIDPass && (
              <div className={styles.error}>아이디를 입력하세요</div>
            )}
          </div>
          <div className={styles.pwTag}>
            <div className={styles.title}>비밀번호</div>
            <input
              type="password"
              id="password"
              placeholder="비밀번호"
              maxLength={15}
              className={styles.inputTag}
            />
            {isPWPass && isLoginPass && <div className={styles.vacant}></div>}
            {!isPWPass && (
              <div className={styles.error}>비밀번호를 입력하세요</div>
            )}
            {isIDPass && isPWPass && !isLoginPass && (
              <div className={styles.error}>
                아이디 또는 비밀번호가 다릅니다
              </div>
            )}
            <div className={styles.goSignup}>
              <Link href="/user/signup">회원가입 하러가기</Link>
            </div>
          </div>
          <button type="submit" className={styles.button}>
            로그인
          </button>
        </div>
      </form>
      <Image
        className={styles.bremen}
        src="/bremenStand.png"
        alt="bremen"
        width={100}
        height={100}
      />
    </div>
  );
};
export default LoginIndex;

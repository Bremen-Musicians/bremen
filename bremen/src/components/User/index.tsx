'use client';

import {useState} from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import styles from '@/components/User/index.module.scss';
import ModalForm from '@/components/Common/ModalForm';
import InputCheck from '@/components/User/InputCheck';

const SignUp = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);
  const [isNickname, setIsNickname] = useState<string>('');
  const [isEmail, setIsEmail] = useState<string>('');
  const [isPassword, setIsPassword] = useState<string>('');
  const [isPasswordCheck, setIsPasswordCheck] = useState<string>('');
  const router = useRouter();

  const handleRightClick = () => {
    if (!isOpened && !isRight) {
      setIsModalOpen(true);
      setIsOpened(true);
    }
    setIsRight(!isRight);
  };
  const handleModalClick = () => {
    if (!isOpened) {
      setIsOpened(true);
    }
    setIsModalOpen(!isModalOpen);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleModalCheckbox = () => {
    setIsRight(!isRight);
  };

  // TODO: 서버 확인 추가
  const emailCheck = () => {
    if (!isEmail.includes('@')) {
      return false;
    }
    return true;
  };

  // TODO: 서버 확인 추가
  const nicknameCheck = () => {
    if (isNickname.length > 10 || isNickname.length < 3) {
      return false;
    }
    return true;
  };

  const passwordCheck = () => {
    const num = isPassword.search(/[0-9]/g);
    const eng = isPassword.search(/[a-z]/gi);
    const spe = isPassword.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

    if (isPassword.length < 8 || isPassword.length > 20) {
      return false;
    }
    if (isPassword.search(/\s/) !== -1) {
      return false;
    }
    if (num < 0 || eng < 0 || spe < 0) {
      return false;
    }
    return true;
  };

  const passwordDuplicateCheck = () => {
    if (isPassword === isPasswordCheck) {
      return true;
    }
    return false;
  };

  const submitStyle = () => {
    if (
      emailCheck() &&
      nicknameCheck() &&
      passwordCheck() &&
      passwordDuplicateCheck() &&
      isRight
    ) {
      return false;
    }
    return true;
  };

  // TODO: 서버 전송
  const handleSubmit = () => {
    router.push('/user/profile');
  };

  return (
    <div className={styles.firstCon}>
      <div className={styles.inputContainer}>
        <div className={styles.inputTag}>
          <InputCheck
            detail="이메일"
            placeHolderContent="중복되지 않은 이메일을 입력하세요"
            isPass={emailCheck()}
            setValue={setIsEmail}
            maxLength={30}
            wrongMessage="올바른 이메일 형식을 입력하세요"
            type="text"
            content={isEmail !== ''}
          />
          <InputCheck
            detail="닉네임"
            placeHolderContent="중복되지 않은 3~10자 이내의 닉네임을 입력하세요"
            isPass={nicknameCheck()}
            setValue={setIsNickname}
            maxLength={10}
            wrongMessage="다른 닉네임을 입력하세요"
            type="text"
            content={isNickname !== ''}
          />
          <InputCheck
            detail="비밀번호"
            placeHolderContent="영어, 숫자, 특수문자를 조합하여 8자리~15자리를 입력하세요"
            isPass={passwordCheck()}
            setValue={setIsPassword}
            maxLength={15}
            wrongMessage="비밀번호 양식이 일치하지 않습니다"
            type="password"
            content={isPassword !== ''}
          />
          <div>
            <InputCheck
              detail="비밀번호 확인"
              placeHolderContent="비밀번호를 다시 입력하세요"
              isPass={passwordDuplicateCheck()}
              setValue={setIsPasswordCheck}
              maxLength={15}
              wrongMessage="비밀번호가 일치하지 않습니다."
              type="password"
              content={isPasswordCheck !== ''}
            />
            <input
              type="checkbox"
              checked={isRight}
              onClick={handleRightClick}
            />
            <span className={styles.agreement} onClick={handleModalClick}>
              서비스 이용약관 및 동의서
            </span>
          </div>

          <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className={styles.modalContainer}>
              <div className={styles.title}>서비스 이용 약관 및 동의서</div>
              <br />
              <ol className={styles.modalContent}>
                <li className={styles.subheading}>동영상 소유권 및 사용권</li>
                <ul>
                  <li>
                    사용자는 본인이 업로드한 동영상에 대한 소유권을 가집니다.
                  </li>
                  <li>
                    플랫폼은 사용자가 업로드한 동영상을 편집, 공유, 배포할 수
                    있는 사용권을 가집니다.
                  </li>
                  <li>
                    다른 유저들은 사용자가 업로드한 동영상을 자신의 동영상과
                    합성하여 편집, 공유, 배포할 수 있는 사용권을 가집니다.
                  </li>
                  <li>사용자는 언제든지 본인의 동영상을 삭제할 수 있습니다.</li>
                </ul>
                <li className={styles.subheading}>이용 제한 사항</li>
                <ul>
                  <li>
                    사용자는 서비스 취지에 맞지 않는 동영상을 업로드할 수
                    없습니다.
                  </li>
                  <li>플랫폼은 이러한 동영상을 삭제할 수 있습니다.</li>
                </ul>
                <li className={styles.subheading}>개인정보 보호</li>
                <ul>
                  <li>
                    사용자의 동영상 업로드, 시청 등의 활동 정보는 플랫폼 운영을
                    위해 수집 및 활용될 수 있습니다.
                  </li>
                  <li>수집된 정보는 관련 법령에 따라 안전하게 관리됩니다.</li>
                </ul>
              </ol>
              <br />
              <div className={styles.modalAgreement}>
                위 내용을 확인하시고 동의해 주시기 바랍니다.
              </div>
              <br />
              <input
                type="checkbox"
                id="checkRight"
                checked={isRight}
                onClick={handleModalCheckbox}
              />
              <label htmlFor="checkRight" className={styles.checkContent}>
                서비스 이용 약관 및 동의서
              </label>
            </div>
          </ModalForm>
        </div>
        <button
          disabled={submitStyle()}
          className={styles.submit}
          onClick={handleSubmit}
        >
          다음
        </button>
      </div>
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

export default SignUp;

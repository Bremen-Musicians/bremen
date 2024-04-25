'use client';

import {useState} from 'react';
import styles from '@/components/User/index.module.scss';
import ModalForm from '@/components/Common/ModalForm';

const SignUp = () => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isRight, setIsRight] = useState<boolean>(false);

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
  return (
    <div>
      <input type="checkbox" checked={isRight} onClick={handleRightClick} />
      <span className={styles.agreement} onClick={handleModalClick}>
        서비스 이용약관 및 동의서
      </span>

      <ModalForm isOpen={isModalOpen} onClose={handleCloseModal}>
        <div className={styles.modalContainer}>
          <div className={styles.title}>서비스 이용 약관 및 동의서</div>
          <br />
          <ol className={styles.modalContent}>
            <li className={styles.subheading}>동영상 소유권 및 사용권</li>
            <ul>
              <li>사용자는 본인이 업로드한 동영상에 대한 소유권을 가집니다.</li>
              <li>
                플랫폼은 사용자가 업로드한 동영상을 편집, 공유, 배포할 수 있는
                사용권을 가집니다.
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
                사용자는 서비스 취지에 맞지 않는 동영상을 업로드할 수 없습니다.
              </li>
              <li>플랫폼은 이러한 동영상을 삭제할 수 있습니다.</li>
            </ul>
            <li className={styles.subheading}>개인정보 보호</li>
            <ul>
              <li>
                사용자의 동영상 업로드, 시청 등의 활동 정보는 플랫폼 운영을 위해
                수집 및 활용될 수 있습니다.
              </li>
              <li>수집된 정보는 관련 법령에 따라 안전하게 관리됩니다.</li>
            </ul>
          </ol>
          <br />
          <div className={styles.agreement}>
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
  );
};

export default SignUp;

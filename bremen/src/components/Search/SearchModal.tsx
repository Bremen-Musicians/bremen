/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import styles from './SearchModal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CheckedItems {
  [key: string]: boolean;
}

interface FilterOptions {
  [key: number]: string;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose}) => {
  if (!isOpen) return null;

  const [checkedItems, setCheckedItems] = useState<CheckedItems>({});

  const filterOptions: FilterOptions = {
    1: '그 외',
    2: '바이올린',
    3: '비올라',
    4: '첼로',
    5: '하프',
    6: '플룻',
    7: '클라리넷',
    8: '트럼펫',
    9: '마림바',
    10: '피아노',
    11: '드럼',
    12: '통기타',
    13: '베이스기타',
    14: '일렉기타',
  };

  const allSelected = Object.keys(filterOptions).every(
    key => checkedItems[key],
  );

  const toggleAllCheckboxes = () => {
    const newState = !allSelected;
    const newCheckedItems = Object.keys(filterOptions).reduce((acc, key) => {
      acc[key] = newState;
      return acc;
    }, {} as CheckedItems);
    setCheckedItems(newCheckedItems);
  };

  const handleCheckboxChange = (key: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const applyFilters = () => {
    console.log(
      'Selected Items:',
      Object.entries(checkedItems)
        .filter(([key, value]) => value)
        .map(([key]) => filterOptions[+key]), // Note conversion to number if needed
    );
    onClose(); // Optionally close modal after applying
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <span className={styles.allCheck} onClick={toggleAllCheckboxes}>
          {allSelected ? '선택 해제' : '전체 선택'}
        </span>
        <div className={styles.twoColumns}>
          {Object.entries(filterOptions).map(([key, value]) => (
            <button
              key={key}
              className={
                checkedItems[key] ? styles.selectedItem : styles.unselectedItem
              }
              onClick={() => handleCheckboxChange(key)}
            >
              {value}
            </button>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <span className={styles.closeButton} onClick={onClose}>
            닫기
          </span>
          <span className={styles.applyButton} onClick={applyFilters}>
            적용
          </span>
        </div>
      </div>
    </div>
  );
};

export default Modal;

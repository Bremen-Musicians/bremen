'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {HiOutlineSearch} from 'react-icons/hi';
import {CgClose} from 'react-icons/cg';
import styles from '@/components/Search/SearchBar.module.scss';

interface SearchBarProps {
  initialValue: string;
}

export default function SearchBar({initialValue}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(initialValue);
  const router = useRouter(); // useRouter 훅 추가

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && inputValue.trim()) {
      // router.push로 라우팅 수행
      router.push(`/search/${inputValue.trim()}`);
    }
  };

  const clearInput = () => {
    setInputValue('');
  };

  return (
    <div className={styles.searchbar}>
      <div className={styles.searchbox}>
        <HiOutlineSearch className={styles.icons} />
        <input
          className={styles.inputbox}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search..."
        />
        <CgClose className={styles.icons} onClick={clearInput} />
      </div>
    </div>
  );
}

import styles from '@/components/Search/SearchBar.module.scss';
import {FaArrowLeft} from 'react-icons/fa6';
import {HiOutlineSearch} from 'react-icons/hi';
import {CgClose} from 'react-icons/cg';

export default function SearchBar() {
  return (
    <div className={styles.searchbar}>
      <FaArrowLeft className={styles.icons} />
      <div className={styles.searchbox}>
        <HiOutlineSearch className={styles.icons} />
        <input className={styles.inputbox} type="text"></input>
        <CgClose className={styles.icons} />
      </div>
    </div>
  );
}

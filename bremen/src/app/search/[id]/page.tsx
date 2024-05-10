'use client';

import {useParams} from 'next/navigation';
import React, {useState} from 'react';
import SearchBar from '@/components/Search/SearchBar';
import styles from '@/app/search/[id]/page.module.scss';
import Video from '@/components/Common/Video';
import Modal from '@/components/Search/SearchModal';

export default function Page() {
  const param = useParams();
  const paramId = param.id;
  const encodedString = paramId;
  const encodedString2 = Array.isArray(encodedString)
    ? encodedString[0]
    : encodedString;
  const decodedString = decodeURIComponent(encodedString2);

  const [CategorySelected, setCategorySelected] = useState<string>('전체');
  const selectCategoryItem = (item: string) => {
    setCategorySelected(item);
  };
  const [OrderSelected, setOrderSelected] = useState<string>('최신순');
  const selectOrderItem = (item: string) => {
    setOrderSelected(item);
  };

  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const toggleModal = () => setModalOpen(!isModalOpen);

  // 필터 메뉴 항목
  const categories = ['전체', '곡명', '아티스트', '제목', '작성자'];
  const orders = ['최신순', '인기순'];

  return (
    <>
      <div>
        <SearchBar initialValue={decodedString || ''} />
      </div>
      <div className={styles.infoContainer}>
        {categories.map(category => (
          <span
            key={category}
            className={
              CategorySelected === category ? styles.categorySelected : ''
            }
            onClick={() => selectCategoryItem(category)}
          >
            {category}
          </span>
        ))}
      </div>
      <div className={styles.infoContainer}>
        <span className={styles.filter} onClick={toggleModal}>
          악기 필터
        </span>
        {orders.map(order => (
          <span
            key={order}
            className={
              OrderSelected === order
                ? styles.orderSelected
                : styles.orderUnselected
            }
            onClick={() => selectOrderItem(order)}
          >
            {order}
          </span>
        ))}
      </div>
      <Modal isOpen={isModalOpen} onClose={toggleModal} />
      <div className={styles.videolist}>
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
        <Video />
      </div>
      <div className={styles.empty}></div>
    </>
  );
}

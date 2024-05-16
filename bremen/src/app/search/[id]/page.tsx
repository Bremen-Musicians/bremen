'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import SearchBar from '@/components/Search/SearchBar';
import Video from '@/components/Common/Video';
import Modal from '@/components/Search/SearchModal';
import styles from '@/app/search/[id]/page.module.scss';
import api from '@/api/api';
import Header from '@/components/Common/Header';
import { useInView } from 'react-intersection-observer';


interface VideoData {
  id: number;
  title: string;
  videoUrl: string;
  imageUrl: string;
}
export default function Page() {
  const param = useParams();
  const paramId = param.id;
  const encodedString = paramId;
  const encodedString2 = Array.isArray(encodedString) ? encodedString[0] : encodedString;
  const decodedString = decodeURIComponent(encodedString2);
  const [CategorySelected, setCategorySelected] = useState<string>('전체');
  const [OrderSelected, setOrderSelected] = useState<string>('최신순');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [ref, inView] = useInView();

  // Ensure this is typed correctly
  const filterOptions: { [key: string]: string } = {
    '1': '그 외',
    '2': '바이올린',
    '3': '비올라',
    '4': '첼로',
    '5': '하프',
    '6': '플룻',
    '7': '클라리넷',
    '8': '트럼펫',
    '9': '마림바',
    '10': '피아노',
    '11': '드럼',
    '12': '통기타',
    '13': '베이스기타',
    '14': '일렉기타',
    '15': '보컬',
  };
  const [selectedFilters, setSelectedFilters] = useState<string[]>(Object.keys(filterOptions));

  const displaySelectedFilters = () => {
    const allFiltersSelected = selectedFilters.length === Object.keys(filterOptions).length;
    
    if (allFiltersSelected) {
      return '전체';
    } else if (selectedFilters.length === 1) {
      return filterOptions[selectedFilters[0]];
    } else {
      return `${filterOptions[selectedFilters[selectedFilters.length - 1]]} 외 ${selectedFilters.length - 1}`;
    }
  };

  interface CategoryMap {
    [key: string]: string;
  }
  
  const categoryMapping: CategoryMap = {
    '전체': 'ALL',
    '곡명': 'MUSIC',
    '아티스트': 'ARTIST',
    '제목': 'TITLE',
    '작성자': 'WRITER'
  };

  interface OrderMap {
    [key: string]: string;
  }
  
  const orderMapping: OrderMap = {
    '최신순': 'LATEST',
    '인기순': 'POPULAR'
  };


    const fetchData = async () => {
      try {
        const category = categoryMapping[CategorySelected];
        const order = orderMapping[OrderSelected];
        const instrumentIds = selectedFilters;
        console.log(selectedFilters)
        const keyword = decodedString || '';
        setPage(0);
        const url = `/articles/search?category=${category}&order=${order}&instrumentIds=${instrumentIds.join('&instrumentIds=')}&keyword=${keyword}&page=${page}&size=12&sort=string`;
        console.log('펫치',url)
        const response = await api.get(url);
        setVideos(response.data.items);
      } catch (error) {
        console.error(error);
      }
    };
    const infiniteScroll = async () => {
      try {
        const category = categoryMapping[CategorySelected];
        const order = orderMapping[OrderSelected];
        const instrumentIds = selectedFilters;
        const keyword = decodedString || '';
  
        const url = `/articles/search?category=${category}&order=${order}&instrumentIds=${instrumentIds.join('&instrumentIds=')}&keyword=${keyword}&page=${page}&size=12&sort=string`;
        console.log('무한',url)
        const response = await api.get(url);
        setVideos(prevVideos => [...prevVideos, ...response.data.items]);
      } catch (error) {
        console.error(error);
      }
    };

    useEffect(() => {
      console.log('들어오냐?',inView)
      if (inView) {
        infiniteScroll();
        setPage(page+1);
      }
      else{
        console.log('else')
        fetchData();
      }
      console.log(CategorySelected, OrderSelected, selectedFilters, decodedString, inView)
  }, [CategorySelected, OrderSelected, selectedFilters, decodedString, inView]);
  
  const selectCategoryItem = (item: string) => {setCategorySelected(item);
    // fetchData();
  }
  const selectOrderItem = (item: string) => {setOrderSelected(item);
    // fetchData();
  }
  const toggleModal = () => setModalOpen(!isModalOpen);
  const handleFilterApply = (filters: string[]) => {
    setSelectedFilters(filters);
    console.log("Filters applied:", filters);
    console.log("Filters applied:", selectedFilters);
    // console.log('send with', categoryMapping[CategorySelected], orderMapping[CategorySelected], filters)
    // fetchData();
  };

  const categories = ['전체', '곡명', '아티스트', '제목', '작성자'];
  const orders = ['최신순', '인기순'];

  return (
    <>
      <Header/>
      <div className={styles.headerMargin}></div>
      {/* Mobile View */}
      <div className={styles.mobileView}>
        <div>
          <SearchBar initialValue={decodedString || ''} />
        </div>
        <div className={styles.infoContainer}>
          {categories.map(category => (
            <span
              key={category}
              className={CategorySelected === category ? styles.categorySelected : ''}
              onClick={() => selectCategoryItem(category)}
            >
              {category}
            </span>
          ))}
        </div>
        <div className={styles.infoContainer}>
          <span className={styles.filter} onClick={toggleModal}>
            악기: {displaySelectedFilters()}
          </span>
          {orders.map(order => (
            <span
              key={order}
              className={OrderSelected === order ? styles.orderSelected : styles.orderUnselected}
              onClick={() => selectOrderItem(order)}
            >
              {order}
            </span>
          ))}
        </div>
      </div>
  
      {/* Web View */}
      <div className={styles.webView}>
        <div className={styles.challenge}>챌린지광고</div>
        <div className={styles.test2}>
        <div className={styles.test}>
        <div className={styles.searchAndFilterContainer}>
          <div>
          </div>
          <div className={styles.searchContainer}>
            <SearchBar initialValue={decodedString || ''} />
          </div>
          <div className={styles.filterContainer}>
            <span className={styles.filter} onClick={toggleModal}>
              악기: {displaySelectedFilters()}
            </span>
          </div>
          <div>
          </div>
        </div>
        <div className={styles.categoryContainer}>
          <div className={styles.category}>
          {categories.map(category => (
            <span
            key={category}
            className={CategorySelected === category ? styles.categorySelected : ''}
            onClick={() => selectCategoryItem(category)}
            >
              {category}
            </span>
          ))}
              </div>
              <div className={styles.order}>
            {orders.map(order => (
              <span
                key={order}
                className={OrderSelected === order ? styles.orderSelected : styles.orderUnselected}
                onClick={() => selectOrderItem(order)}
              >
                {order}
              </span>
            ))}
            </div>
        </div>
        </div>
        </div>
      </div>
  
      <Modal isOpen={isModalOpen} onClose={toggleModal} onApplyFilters={handleFilterApply} selectedFilters={selectedFilters} />
      <div className={styles.headerMargin}></div>
      <div className={styles.videolist}>
  {videos.map((video, index) => (
    <Video
      key={index}
      id={video.id}
      title={video.title}
      videoUrl={video.videoUrl}
      thumbnail={video.imageUrl}
      ref={index === 9 ? ref : null} // 10번째 비디오에만 ref 속성 추가
    />
  ))}
</div>
      <div className={styles.empty}></div>
    </>
  );
          }
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */

'use client';

import React, {useState, useEffect, useCallback} from 'react';
import {useParams} from 'next/navigation';
import SearchBar from '@/components/Search/SearchBar';
import Video from '@/components/Common/Video';
import Modal from '@/components/Search/SearchModal';
import styles from '@/app/search/[id]/page.module.scss';
import api from '@/api/api';
import Header from '@/components/Common/Header';
import {useInView} from 'react-intersection-observer';
import Link from 'next/link';
import ChallengeBanner from '@/components/Common/ChallengeBanner';

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
  const encodedString2 = Array.isArray(encodedString)
    ? encodedString[0]
    : encodedString;
  const decodedString = decodeURIComponent(encodedString2);
  const [CategorySelected, setCategorySelected] = useState<string>('전체');
  const [OrderSelected, setOrderSelected] = useState<string>('최신순');
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [ref, inView] = useInView({
    threshold: 0,
    triggerOnce: false,
  });
  const [challengeImage, setChallengeImage] = useState<string>();

  const filterOptions: {[key: string]: string} = {
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
  const [selectedFilters, setSelectedFilters] = useState<string[]>(
    Object.keys(filterOptions),
  );

  const displaySelectedFilters = () => {
    const allFiltersSelected =
      selectedFilters.length === Object.keys(filterOptions).length;

    if (allFiltersSelected) {
      return '전체';
    }
    if (selectedFilters.length === 1) {
      return filterOptions[selectedFilters[0]];
    }
    return `${filterOptions[selectedFilters[selectedFilters.length - 1]]} 외 ${selectedFilters.length - 1}`;
  };

  interface CategoryMap {
    [key: string]: string;
  }

  const categoryMapping: CategoryMap = {
    전체: 'ALL',
    곡명: 'MUSIC',
    아티스트: 'ARTIST',
    제목: 'TITLE',
    작성자: 'WRITER',
  };

  interface OrderMap {
    [key: string]: string;
  }
  interface ApiResponse {
    items: VideoData[];
    data: {
      items: VideoData[];
    };
  }
  interface ChallengeData {
    item: {
      mainImage: string;
    };
  }
  const orderMapping: OrderMap = {
    최신순: 'LATEST',
    인기순: 'POPULAR',
  };

  const fetchData = useCallback(async () => {
    try {
      const category = categoryMapping[CategorySelected];
      const order = orderMapping[OrderSelected];
      const instrumentIds = selectedFilters;
      const keyword = decodedString || '';
      const url = `/articles/search?category=${category}&order=${order}&instrumentIds=${instrumentIds.join('&instrumentIds=')}&keyword=${keyword}&page=0&size=12&sort=string`;
      console.log('Fetching URL:', url);
      const response = await api.get<ApiResponse>(url);

      setVideos(response.data.items);
      setPage(1); // Reset page to 1 after initial fetch
      setHasMore(response.data.items.length > 0); // Check if there's more data
    } catch (error) {
      console.error(error);
    }
  }, [CategorySelected, OrderSelected, selectedFilters, decodedString]);

  const infiniteScroll = useCallback(async () => {
    if (!hasMore) return; // If no more data, return early

    try {
      const category = categoryMapping[CategorySelected];
      const order = orderMapping[OrderSelected];
      const instrumentIds = selectedFilters;
      const keyword = decodedString || '';

      const url = `/articles/search?category=${category}&order=${order}&instrumentIds=${instrumentIds.join('&instrumentIds=')}&keyword=${keyword}&page=${page}&size=12&sort=string`;
      console.log('Infinite Scroll Fetching URL:', url);
      const response = await api.get<ApiResponse>(url);

      if (response.data.items.length === 0) {
        setHasMore(false); // No more data to load
      } else {
        setVideos(prevVideos => [...prevVideos, ...response.data.items]);
        setPage(prevPage => prevPage + 1); // Increment page after fetching
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    CategorySelected,
    OrderSelected,
    selectedFilters,
    decodedString,
    page,
    hasMore,
  ]);

  const selectCategoryItem = (item: string) => {
    setCategorySelected(item);
    setPage(0); // Reset page to 0 when category changes
    setHasMore(true); // Reset hasMore when category changes
  };

  const selectOrderItem = (item: string) => {
    setOrderSelected(item);
    setPage(0); // Reset page to 0 when order changes
    setHasMore(true); // Reset hasMore when order changes
  };

  const toggleModal = () => setModalOpen(!isModalOpen);
  const handleFilterApply = (filters: string[]) => {
    setSelectedFilters(filters);
    setPage(0); // Reset page to 0 when filters change
    setHasMore(true); // Reset hasMore when filters change
  };

  const fetchLatestChallenge = async () => {
    try {
      const url = '/challenges/latest';
      const response = await api.get<ChallengeData>(url);
      setChallengeImage(response.data.item.mainImage);
    } catch (error) {
      console.error('Error fetching latest challenge:', error);
    }
  };

  const categories = ['전체', '곡명', '아티스트', '제목', '작성자'];
  const orders = ['최신순', '인기순'];

  useEffect(() => {
    fetchLatestChallenge().catch(error => console.error(error));
  }, []);

  useEffect(() => {
    fetchData().catch(error => console.error(error));
  }, [fetchData]);

  useEffect(() => {
    if (inView) {
      infiniteScroll().catch(error => console.error(error));
    }
  }, [inView, infiniteScroll]);

  return (
    <>
      <Header />
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
            악기: {displaySelectedFilters()}
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
      </div>

      {/* Web View */}
      <div className={styles.webView}>
        <Link href="/challenge" className={styles.challenge}>
          <ChallengeBanner image={challengeImage || ''} />
        </Link>
        <div className={styles.test2}>
          <div className={styles.test}>
            <div className={styles.searchAndFilterContainer}>
              <div></div>
              <div className={styles.searchContainer}>
                <SearchBar initialValue={decodedString || ''} />
              </div>
              <div className={styles.filterContainer}>
                <span className={styles.filter} onClick={toggleModal}>
                  악기: {displaySelectedFilters()}
                </span>
              </div>
              <div></div>
            </div>
            <div className={styles.categoryContainer}>
              <div className={styles.category}>
                {categories.map(category => (
                  <span
                    key={category}
                    className={
                      CategorySelected === category
                        ? styles.categorySelected
                        : ''
                    }
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
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        onApplyFilters={handleFilterApply}
        selectedFilters={selectedFilters}
      />
      <div className={styles.headerMargin}></div>
      <div className={styles.videolist}>
        {videos.map((video, index) => (
          <Video
            key={index}
            id={video.id}
            title={video.title}
            videoUrl={video.videoUrl}
            thumbnail={video.imageUrl}
            ref={null}
          />
        ))}
        <div ref={ref} className={styles.videomargin}></div>{' '}
      </div>
      <div className={styles.empty}></div>
    </>
  );
}

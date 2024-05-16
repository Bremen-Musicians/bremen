/* eslint-disable no-console */

'use client';

import {useState, useRef, useEffect} from 'react';
import {useInView} from 'react-intersection-observer';
import {IoSearch} from 'react-icons/io5';
import {FaAngleDown, FaAngleUp} from 'react-icons/fa6';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';
import styles from '@/components/Upload/VideoSearchModal.module.scss';
import {instruments} from '@/constants/instruments';
import {IArticleSearch, IArticleResult} from '@/types/Search';
import IdToImage from '@/components/Common/IdToImage';

const VideoSearchModal = ({
  isVideo,
  isInstruments,
  setIsInstruments,
  setIsVideo,
}: {
  isVideo: number[];
  isInstruments: number[];
  setIsInstruments: (newInstrument: number) => void;
  setIsVideo: (newVideo: number[]) => void;
}) => {
  const [isToggle, setIsToggle] = useState<boolean>(false);
  const [videoList, setVideoList] = useState<number[]>(isVideo);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [searchContent, setSearchContent] = useState<IArticleSearch[]>([]);
  const [isSort, setIsSort] = useState<string>('ALL');
  const [isPage, setIsPage] = useState<number>(0);
  const [ref, inView] = useInView();

  const sort = [
    {name: '전체', value: 'ALL'},
    {name: '제목', value: 'TITLE'},
    {name: '작성자', value: 'WRITER'},
    {name: '아티스트', value: 'ARTIST'},
  ];

  /** 무한스크롤 실행 내용 */
  const infiniteScroll = () => {
    const searchInstrument = isInstruments
      .map(instrument => `&instrumentIds=${instrument}`)
      .join('');
    const searchWord = inputRef.current === null ? '' : inputRef.current.value;
    axios
      .get<IArticleResult>(
        `https://k10a104.p.ssafy.io/api/v1/articles/search?category=${isSort}&order=POPULAR${searchInstrument}&keyword=${searchWord}&page=${isPage}&size=15`,
      )
      .then(response => {
        if (isPage === 0) {
          setSearchContent(prevContent => {
            return [...prevContent, ...response.data.items];
          });
        } else {
          setSearchContent(response.data.items);
        }
        if (searchContent.length === 0) {
          setIsPage(0);
          setIsSort('ALL');
        } else {
          setIsPage(page => page + 1);
        }
      })
      .catch(error => console.error('무한스크롤 검색 모달: ', error));
  };

  /** 무한스크롤 실행 */
  useEffect(() => {
    if (inView) {
      infiniteScroll();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  const handleVideoClick = () => {
    const video = videoRef.current;
    if (video) {
      if (video.paused) {
        video.play().catch(error => console.error('video error', error));
      } else {
        video.pause();
      }
    }
  };

  /** 종류 클릭 */
  const handleSortClick = (newSorted: string) => {
    setIsSort(newSorted);
    if (searchContent.length > 0) {
      setIsPage(0);
      infiniteScroll();
    }
  };

  const handleVideoList = (newNumber: number) => {
    setVideoList(prevVideo => {
      const index = prevVideo.indexOf(newNumber);
      if (index !== -1) {
        // 해당 숫자를 배열에서 제거한 새로운 배열 생성
        return prevVideo.filter(num => num !== newNumber);
      }
      // 새로운 숫자를 포함한 배열 생성
      return [...prevVideo, newNumber];
    });
  };

  const handleButtonClick = () => {
    setIsVideo(videoList);
  };
  const handleToggleClick = () => {
    setIsToggle(!isToggle);
    if (isToggle && isInstruments.length > 0) {
      setIsPage(0);
      infiniteScroll();
    }
  };

  const handleSearch = () => {
    infiniteScroll();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };

  // TODO: 체크박스 체크된 것 알아야 함.(체크된 것 받아와야 될 듯)
  return (
    <div style={{color: 'white'}} className={styles.firstContainer}>
      <form>
        <div className={styles.searchContainer}>
          <div className={styles.searchBox}>
            <input
              className={styles.search}
              placeholder="검색어"
              type="text"
              ref={inputRef}
              onKeyDown={handleEnterKey}
            />
            <IoSearch className={styles.searchIcon} onClick={handleSearch} />
          </div>
        </div>
      </form>
      <div className={styles.contentContainer}>
        <div>
          {isToggle ? (
            <div className={styles.toggleSpace}>
              <div className={styles.toggle}>
                <div
                  className={styles.closeContainer}
                  onClick={handleToggleClick}
                >
                  <div className={styles.closeButton}>
                    필터
                    <FaAngleUp />
                  </div>
                </div>
                <div>악기</div>
                <div className={styles.instrumentContainer}>
                  {instruments.map((instrument, index) => {
                    return (
                      <div key={index} className={styles.instrument}>
                        <input
                          type="checkbox"
                          id={instrument.name}
                          onChange={() => setIsInstruments(instrument.number)}
                          checked={isInstruments.includes(instrument.number)}
                        />
                        <label htmlFor={instrument.name}>
                          {instrument.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className={styles.close} onClick={handleToggleClick} />
            </div>
          ) : (
            <div className={styles.middleContainer}>
              <div onClick={handleToggleClick} className={styles.openToggle}>
                필터
                <FaAngleDown />
              </div>
            </div>
          )}
          <div className={styles.instruments}>
            {instruments.map((instrument, index) => {
              return (
                <div key={index}>
                  {isInstruments.includes(instrument.number) && (
                    <div className={styles.selected}>{instrument.name}</div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {searchContent.length > 0 ? (
            <div>
              <div className={styles.sort}>
                <div className={styles.tab}>
                  {sort.map(sortIndex => {
                    return (
                      <div
                        key={sortIndex.name}
                        onClick={() => handleSortClick(sortIndex.value)}
                      >
                        {sortIndex.name}
                      </div>
                    );
                  })}
                </div>
                <div>
                  <hr />
                </div>
                <br />
              </div>
              <div className={styles.videoCon}>
                {searchContent.map((content, index) => {
                  return (
                    <div key={index} className={styles.videoContainer}>
                      <input
                        type="checkbox"
                        id={content.videoId.toString()}
                        onChange={() => handleVideoList(content.videoId)}
                        checked={videoList.includes(content.videoId)}
                      />
                      <label htmlFor={content.videoId.toString()}>
                        <div onClick={handleVideoClick}>
                          <video
                            src={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${content.videoUrl}`}
                            poster={`https://bremen-music.s3.ap-northeast-2.amazonaws.com/${content.imageUrl}`}
                            controls={true}
                            playsInline
                            ref={videoRef}
                          >
                            비디오
                          </video>
                        </div>
                      </label>
                      <div className={styles.infoContainer}>
                        <div className={styles.title}>{content.title}</div>
                        <div className={styles.info}>
                          조회수: {content.hitCnt} <br />
                          {moment(content.createTime).fromNow()}
                          {index % 15 === 13 && <div ref={ref} />}
                        </div>
                        <div>
                          <IdToImage id={content.userId} isLink={false} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.noResult}>
              검색결과가 없습니다. <br />
              검색어를 입력하세요
            </div>
          )}
        </div>
        <div className={styles.middleContainer}>
          <button className={styles.addButton} onClick={handleButtonClick}>
            추가
          </button>
        </div>
      </div>
    </div>
  );
};
export default VideoSearchModal;

/* eslint-disable no-console */

'use client';

import {useState, useRef} from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import useVideoInfoStore from '@/stores/VideoInfo';
// import loading from '../../../../public/loading.gif';
import api from '@/api/api';
import styles from '@/components/Upload/Explanation/index.module.scss';

const DynamicVideo = dynamic(
  () => import('@/components/Upload/Explanation/Video'),
  {
    loading: () => (
      <Image
        src="/loading.gif"
        width={200}
        height={200}
        alt="로딩"
        style={{width: '8vmin', height: 'auto'}}
      />
    ),
    ssr: false,
  },
);

const Form = () => {
  const [isTitle, setIsTitle] = useState<string>('');
  const [isContent, setIsContent] = useState<string>('');
  const [hashTag, setHashTag] = useState<string[]>([]);
  const [challenge, setChallenge] = useState<boolean>(false);
  const {zustandVideoId} = useVideoInfoStore();
  const hashTagRef = useRef<HTMLInputElement>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTitle(e.target.value);
  };

  const handleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsContent(e.target.value);
  };

  const handleSubmit = () => {
    if (hashTagRef.current) {
      const data = hashTagRef.current.value;

      /** 분리 */
      const tempArr = data
        .split('#')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const unique = Array.from(new Set([...hashTag, ...tempArr]));
      setHashTag(unique);
      const postData = {
        title: isTitle,
        content: isContent,
        videoId: zustandVideoId,
        hashTags: hashTag,
        isChallenge: challenge,
      };
      api
        .post('/articles', {
          postData,
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      const data = {
        title: isTitle,
        content: isContent,
        videoId: zustandVideoId,
        hashTags: hashTag,
        isChallenge: challenge,
      };
      api
        .post('/articles', {
          data,
        })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const handleChallenge = () => {
    setChallenge(!challenge);
  };

  return (
    <div className={styles.firstCon}>
      <div className={styles.upperCon}>
        <DynamicVideo />
        <div className={styles.sideCon}>
          제목
          <input
            className={styles.title}
            type="text"
            placeholder="제목을 입력하세요"
            value={isTitle}
            onChange={handleTitleChange}
          ></input>
          <div className={styles.challengeCon}>
            <div className={styles.challengEx}>챌린지 도전</div>
            <input
              className={styles.challenge}
              type="checkbox"
              onClick={handleChallenge}
              checked={challenge}
            />
          </div>
        </div>
      </div>
      <div className={styles.downCon}>
        내용
        <input
          className={styles.content}
          type="text"
          placeholder="내용을 입력하세요"
          value={isContent}
          onChange={handleContent}
        ></input>
        해시태그
        <input
          className={styles.hashTag}
          type="text"
          placeholder="#해시태그를 입력하세요"
          ref={hashTagRef}
        ></input>
      </div>
      <button
        onClick={handleSubmit}
        className={styles.button}
        disabled={isTitle.length <= 0 && isContent.length <= 0}
      >
        업로드
      </button>
    </div>
  );
};
export default Form;

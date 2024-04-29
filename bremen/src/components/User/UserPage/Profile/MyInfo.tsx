import styles from '@/components/MyPage/Profile/MyInfo.module.scss';

export default function MyInfo() {
  return (
    <>
      <div className={styles.myprofile}>
        {/* 프사 */}
        <div className={styles.profileimg} />

        {/* 연주, 팔로워, 팔로잉 */}
        <div className={styles.counts}>
          <div>
            <span className={styles.bold}>6</span>
            <span>연주</span>
          </div>
          <div>
            <span className={styles.bold}>12</span>
            <span>팔로워</span>
          </div>
          <div>
            <span className={styles.bold}>34</span>
            <span>팔로잉</span>
          </div>
        </div>
      </div>

      <div className={styles.myname}>
        {/* 닉네임 */}
        <div>
          <span className={styles.nick}>닉네임닉네임</span>
        </div>

        {/* 소개 */}
        <div>
          <span>
            초보 베이시스트입니다. 잘 부탁드립니다! 저에게 연락을 하고 싶으시면
            카카오톡 2389479lasd로 연락을 주시길 바랍니다.
          </span>
        </div>
      </div>
    </>
  );
}

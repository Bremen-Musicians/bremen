import styles from './Participants.module.scss';

interface IParticipants {
  instruments: string;
  userNickName: string;
}

export default function Participants({
  instruments,
  userNickName,
}: IParticipants) {
  return (
    <div className={styles.tag}>
      <span>
        {instruments} - {userNickName}
      </span>
    </div>
  );
}

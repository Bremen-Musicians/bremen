import React from 'react';
import styles from './IntroChallenge.module.scss';

// Props interface if you're using TypeScript
interface IntroChallengeProps {
  onFileUpload: (file: File, id: string) => void;
}

export default function IntroChallenge({onFileUpload}: IntroChallengeProps) {
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      onFileUpload(file, id); // Call the callback function with the file object and identifier
    }
  };

  return (
    <div className={styles.fileuploadarea}>
      <div className={styles.fileupload}>
        <span className={styles.filetitle}>[메인]</span>
        <input
          className={styles.file}
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          id="main"
          onChange={event => handleFileChange(event, 'main')}
        />
      </div>

      <div className={styles.fileupload}>
        <span className={styles.filetitle}>[챌린지]</span>
        <input
          className={styles.file}
          type="file"
          accept="image/jpg,image/png,image/jpeg,image/gif"
          id="challenge"
          onChange={event => handleFileChange(event, 'challenge')}
        />
      </div>
    </div>
  );
}

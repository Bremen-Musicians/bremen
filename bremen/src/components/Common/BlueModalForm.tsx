import {AiOutlineClose} from 'react-icons/ai';
import styles from '@/components/Common/BlueModalForm.module.scss';

const BlueModalForm = ({
  children,
  isOpen,
  onClose,
}: {
  children?: JSX.Element;
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.Header}>
          <AiOutlineClose onClick={onClose} />
        </div>
        <div className={styles.Body}>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
      <div className={styles.shadow} onClick={onClose} />
    </div>
  );
};

export default BlueModalForm;

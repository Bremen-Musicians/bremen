import styles from '@/components/Common/Tag.module.scss';

export default function Tag({tag}: {tag: string}) {
  return <div className={styles.tag}>{tag}</div>;
}

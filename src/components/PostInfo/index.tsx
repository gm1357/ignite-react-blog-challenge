import { FiCalendar, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';

interface PostInfoProps {
  publicationDate: string;
  author: string;
}

export default function PostInfo({
  publicationDate,
  author,
}: PostInfoProps): JSX.Element {
  return (
    <div className={styles.info}>
      <span>
        <FiCalendar />
        <time>{publicationDate}</time>
      </span>
      <span>
        <FiUser />
        <span>{author}</span>
      </span>
    </div>
  );
}

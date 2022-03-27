import { FiCalendar, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import styles from './styles.module.scss';

interface PostItemProps {
  post: {
    uid?: string;
    first_publication_date: string;
    data: {
      title: string;
      subtitle: string;
      author: string;
    };
  };
}

export default function PostItem({ post }: PostItemProps): JSX.Element {
  return (
    <Link href={post.uid}>
      <a>
        <div className={styles.content}>
          <h2>{post.data.title}</h2>
          <p>{post.data.subtitle}</p>

          <div className={styles.info}>
            <span>
              <FiCalendar />
              <time>{post.first_publication_date}</time>
            </span>
            <span>
              <FiUser />
              <span>{post.data.author}</span>
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
}

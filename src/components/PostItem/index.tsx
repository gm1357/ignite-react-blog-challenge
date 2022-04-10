import Link from 'next/link';
import styles from './styles.module.scss';
import PostInfo from '../PostInfo';

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
    <Link href={`/post/${post.uid}`}>
      <a>
        <div className={styles.content}>
          <h2>{post.data.title}</h2>
          <p>{post.data.subtitle}</p>

          <PostInfo
            publicationDate={post.first_publication_date}
            author={post.data.author}
          />
        </div>
      </a>
    </Link>
  );
}

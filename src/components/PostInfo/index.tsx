import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi';
import styles from './styles.module.scss';

interface PostInfoProps {
  publicationDate: string;
  author: string;
  showEstimate?: boolean;
}

export default function PostInfo({
  publicationDate,
  author,
  showEstimate,
}: PostInfoProps): JSX.Element {
  return (
    <div className={styles.info}>
      <span>
        <FiCalendar />
        <time>
          {format(new Date(publicationDate), 'dd MMM yyyy', { locale: ptBR })}
        </time>
      </span>
      <span>
        <FiUser />
        <span>{author}</span>
      </span>
      {showEstimate && (
        <span>
          <FiClock />
          <span>4 min</span>
        </span>
      )}
    </div>
  );
}

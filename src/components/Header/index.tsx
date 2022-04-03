import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Link href="/">
          <a>
            <img
              src="/images/Logo.svg"
              alt="Space Traveling written stylezed as the logo"
              className="logo"
            />
          </a>
        </Link>
      </div>
    </header>
  );
}

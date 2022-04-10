import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client';

import { useEffect, useState } from 'react';
import { getPrismicClient } from '../services/prismic';

import styles from './home.module.scss';
import Header from '../components/Header';
import PostItem from '../components/PostItem';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps): JSX.Element {
  const [nextLink, setNextLink] = useState(postsPagination.next_page);
  const [posts, setPosts] = useState(postsPagination.results);

  function loadMorePosts(): void {
    fetch(nextLink)
      .then(res => res.json())
      .then(res => {
        setPosts([...posts, ...res.results]);
        setNextLink(res.next_page);
      });
  }

  return (
    <>
      <Header />

      <main className={styles.container}>
        <ul className={styles.content}>
          {posts.map(post => (
            <li key={post.uid}>
              <PostItem post={post} />
            </li>
          ))}
        </ul>

        {nextLink && (
          <button
            className={styles.moreButton}
            type="button"
            onClick={loadMorePosts}
          >
            Carregar mais posts
          </button>
        )}
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();

  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'posts'),
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const posts = response.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: post.first_publication_date,
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  return {
    props: {
      postsPagination: {
        next_page: response.next_page,
        results: posts,
      },
    },
  };
};

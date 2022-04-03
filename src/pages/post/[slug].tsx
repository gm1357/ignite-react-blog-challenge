/* eslint-disable react/no-danger */
import { GetStaticPaths, GetStaticProps } from 'next';
import { FiCalendar, FiUser } from 'react-icons/fi';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';
import { format } from 'date-fns';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import PostInfo from '../../components/PostInfo';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  return (
    <>
      <Header />

      <img
        src={post.data.banner.url}
        alt="Banner do post"
        className={styles.banner}
      />

      <article className={styles.container}>
        <header>
          <h1>{post.data.title}</h1>

          <PostInfo
            author={post.data.author}
            publicationDate={post.first_publication_date}
          />
        </header>

        <main>
          {post.data.content.map(content => (
            <section key={content.heading}>
              <h2>{content.heading}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body),
                }}
              />
            </section>
          ))}
        </main>
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const response = await prismic.query(
    Prismic.predicates.at('document.type', 'posts'),
    {
      fetch: ['posts.slug'],
    }
  );

  return {
    paths: response.results.map(post => `/post/${post.uid}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async context => {
  const { slug } = context.params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  return {
    props: {
      post: {
        first_publication_date: format(
          new Date(response.last_publication_date),
          'dd MMM yyyy'
        ),
        data: {
          title: response.data.title,
          banner: {
            url: response.data.banner.url,
          },
          author: response.data.author,
          content: response.data.content,
        },
      },
    },
  };
};

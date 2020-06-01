import React from 'react';
import Navbar from '../components/Navbar';
import { ContentContainer } from '../components/Containers';
import { getPostBySlug } from '../utils/markdown-posts';
import markdownToHtml from '../utils/markdown-to-html';
import markdownStyles from '../styles/md-landing-page.module.css';

function App({ post }) {
  return (
    <>
      {console.log('post', post)}
      <Navbar noUser />
      <ContentContainer>
        <div className="max-w-xl mx-auto mt-12 mb-16">
          <div
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </ContentContainer>
    </>
  );
}

export default App;

export async function getStaticProps() {
  const post = getPostBySlug('landing-page', ['content']);
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

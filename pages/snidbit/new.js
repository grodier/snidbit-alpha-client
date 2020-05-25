import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import { onError } from '../../libs/errorLib';
import { API } from 'aws-amplify';
import { useAppContext } from '../../libs/contextLib';

export default function NewSnidbit() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const { user } = useAppContext();

  function validateForm() {
    return content.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await createNote({
        content,
        userName: user.username,
        title: content.trim().split('\n')[0],
      });
      router.push('/');
    } catch (e) {
      onError(e);
    }
  }

  function createNote(note) {
    return API.post('snidbits', '/newSnidbit', {
      body: note,
    });
  }

  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="content">Snidbit</label>
          <textarea
            id="email"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit" disabled={!validateForm()}>
          Create
        </button>
      </form>
    </div>
  );
}

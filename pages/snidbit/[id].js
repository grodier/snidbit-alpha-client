import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { onError } from '../../libs/errorLib';
import Navbar from '../../components/Navbar';
import { useAppContext } from '../../libs/contextLib';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';

export default function Notes() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState('');
  const { user } = useAppContext();

  useEffect(() => {
    function loadNote() {
      return API.post('snidbits', '/getSnidbit', {
        body: {
          userName: user.username,
          snidbitId: id,
        },
      });
    }

    async function onLoad() {
      if (!user) return;
      try {
        const note = await loadNote();
        const { Content } = note;

        setContent(Content);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id, user]);

  function validateForm() {
    return content.length > 0;
  }

  function saveNote(note) {
    return API.post('snidbits', '/updateSnidbit', {
      body: note,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await saveNote({
        content,
        title: content.trim().split('\n')[0],
        userName: user.username,
        snidbitId: id,
      });
      router.push('/');
    } catch (e) {
      onError(e);
    }
  }

  function deleteNote(note) {
    return API.post('snidbits', '/deleteSnidbit', {
      body: note,
    });
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      'Are you sure you want to delete this note?'
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteNote({
        snidbitId: id,
        userName: user.username,
      });
      router.push('/');
    } catch (e) {
      onError(e);
    }
  }

  return (
    <AuthenticatedRoute>
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
            Save
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </form>
      </div>
    </AuthenticatedRoute>
  );
}

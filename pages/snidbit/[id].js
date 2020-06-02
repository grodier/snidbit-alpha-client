import React, { useState, useEffect } from 'react';
import { API, Auth } from 'aws-amplify';
import { useRouter } from 'next/router';
import { onError } from '../../libs/errorLib';
import Navbar from '../../components/Navbar';
import { useAppContext } from '../../libs/contextLib';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import { ContentContainer } from '../../components/Containers';

function SubmitButton({ children, disabled }) {
  return (
    <span className="inline-block rounded-md shadow-sm">
      <button
        type="submit"
        className="flex justify-center py-2 px-4 border rounded border-white bg-black text-white text-sm font-medium hover:shadow-md hover:border-transparent transition duration-150 ease-in-out"
        disabled={disabled}
      >
        {children}
      </button>
    </span>
  );
}

function DeleteButton({ children, onClick }) {
  return (
    <span className="inline-block rounded-md shadow-sm mr-3">
      <button
        onClick={onClick}
        type="button"
        className="flex justify-center py-2 px-4 border-2 rounded border-tranparent hover:border-black hover:shadow-md text-sm font-medium transition duration-150 ease-in-out"
      >
        {children}
      </button>
    </span>
  );
}

export default function Notes() {
  const router = useRouter();
  const { id } = router.query;
  const [content, setContent] = useState('');
  const { user, redirectHome } = useAppContext();

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
      redirectHome();
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
      redirectHome();
    } catch (e) {
      onError(e);
    }
  }

  return (
    <AuthenticatedRoute>
      <Navbar />
      <ContentContainer>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium leading-5 text-gray-900"
                htmlFor="content"
              >
                Snidbit
              </label>
              <div className="mt-1 rounded-md shadow-sm">
                <textarea
                  id="email"
                  value={content}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 h-64"
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <DeleteButton onClick={handleDelete}>Delete</DeleteButton>
              <SubmitButton disabled={!validateForm()}>Save</SubmitButton>
            </div>
          </form>
        </div>
      </ContentContainer>
    </AuthenticatedRoute>
  );
}

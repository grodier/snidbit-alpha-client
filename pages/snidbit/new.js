import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { onError } from '../../libs/errorLib';
import { API } from 'aws-amplify';
import { useAppContext } from '../../libs/contextLib';
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import { ContentContainer } from '../../components/Containers';
import { SubmitButton } from '../../components/FormComponents';

export default function NewSnidbit() {
  const [content, setContent] = useState('');
  const { user, redirectHome } = useAppContext();

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
      redirectHome();
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
            <div className="mt-2">
              <SubmitButton disabled={!validateForm()}>Create</SubmitButton>
            </div>
          </form>
        </div>
      </ContentContainer>
    </AuthenticatedRoute>
  );
}

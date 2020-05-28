import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';
import { API, Auth } from 'aws-amplify';
import Link from 'next/link';
import { ContentContainer } from '../components/Containers';

function App() {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState();
  const { authStatus } = useAppContext();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const newUser = await Auth.currentAuthenticatedUser();
      setUser(newUser);
    } catch (e) {
      onError(e);
    }
  }

  useEffect(() => {
    async function onLoad() {
      if (authStatus === 'unauthenticated' || !user) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [authStatus, user]);

  function loadNotes() {
    return API.post('snidbits', '/getSnidbits', {
      body: {
        userName: user.username,
      },
    });
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <Link
          key={note.SK.replace('SNIDBIT#', '')}
          href={`/snidbit/${note.SK.replace('SNIDBIT#', '')}`}
        >
          <div>
            <h4>{note.Title}</h4>
            <span>
              {'Created: ' + new Date(note.CreatedAt).toLocaleString()}
            </span>
          </div>
        </Link>
      ) : (
        <Link key="new" href="/snidbit/new">
          <div>
            <h4>
              <b>{'\uFF0B'}</b> Create a new note
            </h4>
          </div>
        </Link>
      )
    );
  }

  function renderLander() {
    return (
      <div>
        <h1>Snidbit</h1>
        <p>A simple note taking app</p>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div>
        <h2>Your Notes</h2>
        <ul>{renderNotesList(notes)}</ul>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <ContentContainer>
        {authStatus === 'authenticated' ? renderNotes() : renderLander()}
      </ContentContainer>
    </>
  );
}

export default App;

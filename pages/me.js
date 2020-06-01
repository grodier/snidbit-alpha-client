import React, { useState, useEffect } from 'react';
import AuthenticatedRoute from '../components/AuthenticatedRoute';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { API } from 'aws-amplify';
import { ContentContainer } from '../components/Containers';
import { calculateTimeSince } from '../utils/dateUtils';
import { useAppContext } from '../libs/contextLib';

function PrimaryAnchorButton({ url, children }) {
  return (
    <Link href={url}>
      <a className="inline-block text-sm px-4 py-2 border rounded border-white bg-black text-white hover:shadow-md hover:border-transparent">
        {children}
      </a>
    </Link>
  );
}

function Me() {
  const [notes, setNotes] = useState([]);
  const { authStatus, user } = useAppContext();

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
    return notes.map((note, i) => {
      return (
        <li
          key={note.SK.replace('SNIDBIT#', '')}
          className={i !== 0 ? 'border-t border-gray-300' : ''}
        >
          <Link href={`/snidbit/${note.SK.replace('SNIDBIT#', '')}`}>
            <a className="block hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out">
              <div className="py-4">
                <h4 className="text-xl font-semibold">{note.Title}</h4>
                <span>
                  {`Created ${calculateTimeSince(
                    new Date(note.CreatedAt)
                  )} ago`}
                </span>
              </div>
            </a>
          </Link>
        </li>
      );
    });
  }

  return (
    <AuthenticatedRoute>
      <Navbar />
      <ContentContainer>
        <div className="mt-4">
          <div>
            <div className="border-b border-gray-300 py-5">
              <PrimaryAnchorButton url="/snidbit/new">
                {'\uFF0B'} NEW NOTE
              </PrimaryAnchorButton>
            </div>
            <div>
              <ul>{renderNotesList(notes)}</ul>
            </div>
          </div>
        </div>
      </ContentContainer>
    </AuthenticatedRoute>
  );
}

export default Me;

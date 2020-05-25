import React from 'react';
import Link from 'next/link';
import { useAppContext } from '../libs/contextLib';
import { Auth } from 'aws-amplify';
import { useRouter } from 'next/router';

function Navbar() {
  const { authStatus } = useAppContext();

  function handleLogout() {
    Auth.signOut();
  }

  return (
    <div>
      <Link href="/">
        <a>Snidbit</a>
      </Link>
      <div>
        {authStatus === 'authenticated' ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link href="/signup">
              <a>Signup</a>
            </Link>
            <Link href="/login">
              <a>Login</a>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;

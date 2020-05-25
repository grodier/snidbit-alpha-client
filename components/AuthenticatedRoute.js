import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../libs/contextLib';

export default function AuthenticatedRoute({ children, ...rest }) {
  const router = useRouter();
  const { authStatus } = useAppContext();
  console.log('AUTHENTICATED', authStatus);

  useEffect(() => {
    console.log('AUTH', authStatus);
    if (authStatus === 'unauthenticated') {
      router.push('/login');
    }
  }, [authStatus]);

  return <div {...rest}>{children}</div>;
}

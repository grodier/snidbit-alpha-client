import React from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../libs/contextLib';

export default function UnauthenticatedRoute({ children, ...rest }) {
  const router = useRouter();
  const { isAuthenticated } = useAppContext();
  if (isAuthenticated) {
    router.push('/');
  }
  return <div {...rest}>{children}</div>;
}

import React, { useState, useEffect } from 'react';
import { Amplify, Auth, Hub } from 'aws-amplify';
import config from '../config';
import { AppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import '../styles/index.css';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
  },
  API: {
    endpoints: [
      {
        name: 'snidbits',
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION,
      },
    ],
  },
});

function App({ Component, pageProps }) {
  const router = useRouter();

  const sessionFetcher = async (url) => {
    try {
      await Auth.currentSession();
      return 'authenticated';
    } catch (e) {
      if (e === 'No current user') return 'unauthenticated';
      throw e;
    }
  };

  const { data: authStatus, error: statusError, mutate } = useSWR(
    'auth/currentSession',
    sessionFetcher,
    {
      initialData: 'idle',
      revalidateOnMount: true,
    }
  );

  const userFetcher = async (url) => {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  };

  const { data: user, error: userError } = useSWR(
    'auth/currentAuthenticatedUser',
    userFetcher,
    {
      revalidateOnMount: true,
    }
  );

  useEffect(() => {
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          mutate('authenticated');
          router.push('/');
          break;
        case 'signOut':
          mutate('unauthenticated');
          router.push('/login');
          break;
      }
    });

    return function cleanup() {
      Hub.remove('auth');
    };
  });

  return (
    <AppContext.Provider value={{ authStatus, user }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default App;

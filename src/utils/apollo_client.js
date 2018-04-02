// @flow

import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

const baseURI =
  process.env.NODE_ENV === 'production' ? 'https://app.pipefy.com' : 'http://localhost:3000';

export default (token: string) =>
  new ApolloClient({
    link: createHttpLink({
      credentials: 'include',
      headers: { Authorization: `Bearer ${token}` },
      uri: `${baseURI}/queries`,
    }),
    cache: new InMemoryCache(),
  });

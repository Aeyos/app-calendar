/* global document, PipefyApp */
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';

import './polyfills';
import Calendar from './containers/calendar';
import apolloClient from './utils/apollo_client';

const pipefy = PipefyApp.init();

pipefy.getAuthToken().then(token => {
  const client = apolloClient(token);

  PipefyApp.render(() => null);
  ReactDOM.render(
    <ApolloProvider client={client}>
      <Calendar pipefy={pipefy} />
    </ApolloProvider>,
    document.getElementById('calendar')
  );
});

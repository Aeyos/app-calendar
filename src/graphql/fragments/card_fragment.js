// @flow

import gql from 'graphql-tag';

export default gql`
  fragment cardFragment on Card {
    id
    title
    due_date
    suid
  }
`;

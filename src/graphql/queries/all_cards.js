// @flow

import gql from 'graphql-tag';

import cardFragment from '../fragments/card_fragment';

export default gql`
  query allCardsQuery(
    $pipeId: ID!
    $endDate: String!
    $startDate: String!
    $endCursor: String
    $pageSize: Int!
  ) {
    allCards(
      pipeId: $pipeId
      filter: {
        field: "due_date"
        operator: gte
        value: $startDate
        AND: { field: "due_date", operator: lte, value: $endDate }
      }
      after: $endCursor
      first: $pageSize
    ) {
      edges {
        node {
          ...cardFragment
        }
      }
    }
  }

  ${cardFragment}
`;

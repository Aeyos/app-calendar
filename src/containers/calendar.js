// @flow

import { graphql } from 'react-apollo';

import Calendar from '../components/calendar';
import { endDateByView, startDateByView, transformEdgesToEvents } from '../utils';

import ALL_CARDS_QUERY from '../graphql/queries/all_cards';

const defaultDate = new Date();
const defaultView = 'month';

const allCardsQueryOptions = {
  options: ({ pipefy }) => ({
    variables: {
      pipeId: pipefy.app.pipeId,
      endDate: endDateByView(defaultDate, defaultView),
      startDate: startDateByView(defaultDate, defaultView),
      pageSize: 100,
    },
  }),
  props: ({ data }) => ({
    data: {
      ...data,
      events: data.loading || !data.allCards ? [] : transformEdgesToEvents(data.allCards.edges),
    },
  }),
};

export default graphql(ALL_CARDS_QUERY, allCardsQueryOptions)(Calendar);

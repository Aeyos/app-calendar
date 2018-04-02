// @flow

import { graphql } from 'react-apollo';

import Calendar from '../components/calendar';
import { endDateByView, startDateByView, transformEdgesToEvents, mountDateFilter } from '../utils';
import ALL_CARDS_QUERY from '../graphql/queries/all_cards';

const defaultDate = new Date();
const defaultView = 'month';

const allCardsQueryOptions = {
  options: ({ pipefy }) => ({
    variables: {
      organizationId: pipefy.organizationId,
      filter: mountDateFilter(
        startDateByView(defaultDate, defaultView),
        endDateByView(defaultDate, defaultView)
      ),
      pipeIds: [pipefy.app.pipeId],
      sortBy: { field: 'due_date', direction: 'desc' },
      pagination: { perPage: 1, page: 1 },
    },
  }),
  props: ({ data, fetchMore }) => ({
    data: {
      ...data,
      events: data.loading || !data.cardSearch ? [] : transformEdgesToEvents(data.cardSearch),
    },
  }),
};

export default graphql(ALL_CARDS_QUERY, allCardsQueryOptions)(Calendar);

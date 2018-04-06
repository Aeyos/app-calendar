// @flow

import { graphql } from 'react-apollo';

import Calendar from '../components/calendar';
import { endDateByView, startDateByView, mountDateFilter } from '../utils';
import CARD_SEARCH_QUERY from '../graphql/queries/card_search';

const defaultDate = new Date();
const defaultView = 'month';

const cardSearchQueryOptions = {
  options: ({ pipefy }) => ({
    variables: {
      organizationId: pipefy.organizationId,
      filter: mountDateFilter(
        startDateByView(defaultDate, defaultView),
        endDateByView(defaultDate, defaultView)
      ),
      pipeIds: [pipefy.app.pipeId],
      sortBy: { field: 'due_date', direction: 'desc' },
      pagination: { perPage: 100, page: 1 },
    },
  }),
};

export default graphql(CARD_SEARCH_QUERY, cardSearchQueryOptions)(Calendar);

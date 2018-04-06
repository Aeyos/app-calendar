// @flow

import moment from 'moment';
import type { Card, NextType } from '../models';

const unit = view => (view === 'agenda' ? 'day' : view);

export const endDateByView = (date: Date, view: string): string => {
  const processedDate = moment.utc(date);

  if (view === 'agenda') processedDate.add(30, 'days');

  return processedDate.endOf(unit(view)).toISOString();
};

export const startDateByView = (date: Date, view: string): string =>
  moment
    .utc(date)
    .startOf(unit(view))
    .toISOString();

export const transformEdgesToEvents = (data: { cards: Card[], nextPage: number }) =>
  data.cards.map(card => {
    const start = new Date(card.due_date);
    const end = new Date(start.getTime() + 30 * 60000);
    return {
      end,
      id: card.suid,
      start,
      title: card.title,
    };
  });

export const mountDateFilter = (startDate: string, endDate: string) => ({
  operator: 'and',
  queries: [
    {
      field: 'due_date',
      value: startDate,
      operator: 'gt',
      type: 'date',
    },
    {
      field: 'due_date',
      value: endDate,
      operator: 'lt',
      type: 'date',
    },
  ],
});

export const getFetchMoreParams = (
  organizationId: number,
  defaultDate: Date,
  defaultView: string,
  pipeId: number | string,
  perPage: number,
  nextPage: number
) => ({
  variables: {
    organizationId,
    filter: mountDateFilter(
      startDateByView(defaultDate, defaultView),
      endDateByView(defaultDate, defaultView)
    ),
    pipeIds: [pipeId],
    sortBy: { field: 'due_date', direction: 'desc' },
    pagination: { perPage, page: nextPage },
  },
  updateQuery: (prev: any, next: NextType) => {
    if (!next.fetchMoreResult) return prev;
    return Object.assign({}, prev, {
      fetchMoreResult: next.fetchMoreResult,
      cardSearch: {
        nextPage: next.fetchMoreResult.cardSearch.nextPage,
        __typename: next.fetchMoreResult.cardSearch.__typename,
        count: next.fetchMoreResult.cardSearch.count,
        cards: [...prev.cardSearch.cards, ...next.fetchMoreResult.cardSearch.cards],
      },
    });
  },
});

// @flow

import moment from 'moment';

import type { Card } from '../models';

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

export const transformEdgesToEvents = (data: {cards: Card[], nextPage: number}) =>
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
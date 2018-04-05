import { endDateByView, startDateByView, transformEdgesToEvents } from '../';
import data from '../../../__mocks__/apollo';
import { card, event } from '../../../__mocks__';

const date = new Date(card.due_date);

describe('End date by view', () => {
  it('returns the last day of the month', () => {
    const result = endDateByView(date, 'month');
    expect(result).toBe('2017-12-31T23:59:59.999Z');
  });

  it('returns the last day of the week', () => {
    const result = endDateByView(date, 'week');
    expect(result).toBe('2017-12-16T23:59:59.999Z');
  });

  it('returns the last hour of the day', () => {
    const result = endDateByView(date, 'day');
    expect(result).toBe('2017-12-15T23:59:59.999Z');
  });

  it('returns the end date based on the agenda view', () => {
    const result = endDateByView(date, 'agenda');
    expect(result).toBe('2018-01-14T23:59:59.999Z');
  });
});

describe('Start date by view', () => {
  it('returns the first day of the month', () => {
    const result = startDateByView(date, 'month');
    expect(result).toBe('2017-12-01T00:00:00.000Z');
  });

  it('returns the first day of the week', () => {
    const result = startDateByView(date, 'week');
    expect(result).toBe('2017-12-10T00:00:00.000Z');
  });

  it('returns the first hour of the day', () => {
    const result = startDateByView(date, 'day');
    expect(result).toBe('2017-12-15T00:00:00.000Z');
  });

  it('returns the start date based on the agenda view', () => {
    const result = startDateByView(date, 'agenda');
    expect(result).toBe('2017-12-15T00:00:00.000Z');
  });
});

it('Transform edges to events', () => {
  const result = transformEdgesToEvents(data.cardSearch);
  const expected = [event];
  expect(result).toEqual(expect.arrayContaining(expected));
});

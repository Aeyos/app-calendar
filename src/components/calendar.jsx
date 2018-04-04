// @flow

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Event from './event';
import Toolbar from './toolbar';
import { endDateByView, startDateByView, mountDateFilter, transformEdgesToEvents } from '../utils';
import type { Card, Pipefy, Filter } from '../models';

import '../assets/stylesheets/calendar.css';

type Props = {
  data: {
    error: { message: string },
    events: Card[],
    loading: boolean,
    refetch: (params: { filter: Filter }) => void,
    fetchMore: (param: {}) => void,
    variables: { pagination: {page: number, perPage: number}},
    cardSearch: {cards: Card[], nextPage: number}
  },
  pipefy: Pipefy,
};

type State = {
  currentDate: Date,
  currentView: string,
};

class Calendar extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      currentDate: new Date(),
      currentView: 'month',
    };
  }

  componentWillMount() {
    BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment));
  }

  handleRefetch = (currentView: string, currentDate: ?string):void => {
    const { data: { refetch } } = this.props;
    let { currentDate: storedDate } = this.state;

    this.setState({ currentView });

    if (currentDate) {
      storedDate = new Date(currentDate);
      this.setState({ currentDate: storedDate });
    }

    refetch({
      filter: mountDateFilter(
        startDateByView(storedDate, currentView),
        endDateByView(storedDate, currentView)
      ),
    });
  }

  render() {
    const { data: { error, loading, fetchMore, variables, cardSearch }, pipefy } = this.props;
    const { currentDate: defaultDate, currentView: defaultView } = this.state;
    const { showNotification } = pipefy;
    const events = !cardSearch ? [] : transformEdgesToEvents(cardSearch);

    if (!loading && error) showNotification(error.message, 'error');
    if (!loading && cardSearch && variables.pagination.page < cardSearch.nextPage) {
      fetchMore({
        variables: {
          organizationId: pipefy.organizationId,
          filter: mountDateFilter(
            startDateByView(defaultDate, defaultView),
            endDateByView(defaultDate, defaultView)
          ),
          pipeIds: [pipefy.app.pipeId],
          sortBy: { field: 'due_date', direction: 'desc' },
          pagination: { perPage: variables.pagination.perPage, page: cardSearch.nextPage },
        },
        updateQuery: (prev, next) => {
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
    }

    return (
      <BigCalendar
        components={{
          agenda: {
            event: props => <Event {...props} pipefy={pipefy} />,
          },
          toolbar: props => <Toolbar {...props} loading={loading} />,
        }}
        culture={pipefy.locale}
        defaultDate={defaultDate}
        defaultView={defaultView}
        events={events}
        onNavigate={(currentDate, currentView) => this.handleRefetch(currentView, currentDate)}
        onSelectEvent={event => pipefy.openCard(event.id)}
        onView={currentView => this.handleRefetch(currentView)}
        selectable
      />
    );
  }
}

export default Calendar;

// @flow

import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import 'react-big-calendar/lib/css/react-big-calendar.css';

import Event from './event';
import Toolbar from './toolbar';
import { endDateByView, startDateByView } from '../utils';
import type { Card, Pipefy } from '../models';

import '../../public/css/overwrite.css';

type Props = {
  data: {
    events: Array<Card>,
    loading: boolean,
    refetch: (variables: { endDate: string, startDate: string }) => void,
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

  handleRefetch(currentView: string, currentDate: ?string) {
    const { data: { refetch } } = this.props;
    let { currentDate: storedDate } = this.state;

    this.setState({ currentView });

    if (currentDate) {
      storedDate = new Date(currentDate);
      this.setState({ currentDate: storedDate });
    }

    refetch({
      startDate: startDateByView(storedDate, currentView),
      endDate: endDateByView(storedDate, currentView),
    });
  }

  render() {
    const { data: { events, loading }, pipefy } = this.props;
    const { currentDate: defaultDate, currentView: defaultView } = this.state;

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

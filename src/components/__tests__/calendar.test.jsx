import React from 'react';
import BigCalendar from 'react-big-calendar';
import { shallow } from 'enzyme';

import Calendar from '../calendar';
import data from '../../../__mocks__/apollo';
import { pipefy } from '../../../__mocks__';

describe('Calendar', () => {
  it('render with big calendar', () => {
    const wrapper = shallow(<Calendar data={data} pipefy={pipefy} />);
    expect(wrapper.find(BigCalendar)).toHaveLength(1);
    expect(wrapper.find(BigCalendar).props()).toMatchSnapshot();
  });
});

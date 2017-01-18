import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-addons-test-utils'
import { mount, shallow } from 'enzyme';

import {
  CONTRIBUTIONS,
  FOLLOWERS,
} from './store';
import RankingPage, { RankingUser } from './RankingPage';

it('renders without crashing', () => {
  mount(<RankingPage />);
});

it('orders users by contributions by default', () => {
  const result = shallow(<RankingPage />);
  expect(result.state('currentOrdering')).toEqual(CONTRIBUTIONS);
});

it('activates contributions button by default', () => {
  const result = shallow(<RankingPage />);
  const button = result.find('[data-active=true]').first();
  expect(button.prop('id')).toEqual(`ordering-${CONTRIBUTIONS}`);
});

it('activates other ordering buttons if clicked', () => {
  const result = shallow(<RankingPage />);
  const followersButton = result.find(`#ordering-${FOLLOWERS}`).first();
  followersButton.simulate('click');

  const activeButtons = result.find('[data-active=true]').first();
  const activeButton = activeButtons.first();
  expect(activeButtons.length).toEqual(1);
  expect(result.state('currentOrdering')).toEqual(FOLLOWERS);
  expect(activeButton.prop('id')).toEqual(`ordering-${FOLLOWERS}`);
});

it('displays 10 users by default', () => {
  const result = shallow(<RankingPage />);
  expect(result.find(RankingUser).length).toEqual(10);
});

it('displays 10 more users after clicking load more button', () => {
  const result = shallow(<RankingPage />);
  result.find('#load-more').simulate('click');
  expect(result.find(RankingUser).length).toEqual(20);
});

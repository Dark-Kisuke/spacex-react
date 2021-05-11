import {mount} from 'enzyme';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {of, throwError} from 'rxjs';
import {LaunchData} from '../../../types/launch-data';
import {RocketData} from '../../../types/rocket-data';
import LaunchDetails from '../index';

const launchDataMock: LaunchData = {
  id: '1234',
  name: 'Launch 1',
  rocket: 'Rocket 1',
  upcoming: true,
  launchDate: '2020-01-01',
  success: undefined,
  iconColor: '#ffffff'
};

const rocketDataMock: RocketData = {
  name: 'Rocket 1',
  type: 'Type 1',
  height: 12,
  diameter: 34,
  mass: 56
};

const mockGetLaunch = jest.fn();
const mockGetRocket = jest.fn();

jest.mock('../../../services/launch-service', () => ({
  useLaunchService: () => ({
    getLaunch: mockGetLaunch
  })
}));

jest.mock('../../../services/rocket-service', () => ({
  useRocketService: () => ({
    getRocket: mockGetRocket
  })
}));

beforeEach(() => {
  mockGetLaunch.mockImplementation(() => of(launchDataMock));
  mockGetRocket.mockImplementation(() => of(rocketDataMock));
});

it('mount without crashing', () => {
  mount(<BrowserRouter><LaunchDetails launchId={'1234'}/></BrowserRouter>);
});

it('shows error alert when launch data cannot be fetch ', () => {
  mockGetLaunch.mockImplementation(() => throwError(() => new Error('hon hon')));

  const component = mount(<BrowserRouter><LaunchDetails launchId={'1234'}/></BrowserRouter>);

  expect(component.text()).toMatch('The requested launch cannot be fetched :(');
});


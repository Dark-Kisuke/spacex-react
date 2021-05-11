import {fireEvent} from '@testing-library/react';
import {mount, render, shallow} from 'enzyme';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {of, throwError} from 'rxjs';
import {LaunchData} from '../../../types/launch-data';
import LaunchesList from '../index';

const launchDataMock: LaunchData[] = [
  {
    id: '1234',
    name: 'Launch 1',
    rocket: 'Rocket 1',
    upcoming: true,
    launchDate: '2020-01-01',
    success: undefined,
    iconColor: '#ffffff'
  },
  {
    id: '1235',
    name: 'Launch 2',
    rocket: 'Rocket 2',
    upcoming: false,
    launchDate: '2020-01-02',
    success: true
  }
];

const mockGetLaunches = jest.fn();

jest.mock('../../../services/launch-service', () => ({
  useLaunchService: () => ({
    getLaunches: mockGetLaunches
  })
}));

beforeEach(() => {
  mockGetLaunches.mockImplementation(() => of({data: launchDataMock, total: 2}));
});

it('mount without crashing', () => {
  shallow(<LaunchesList/>);
});

it('shows error alert when launch data cannot be fetch ', () => {
  mockGetLaunches.mockImplementation(() => throwError(() => new Error('hon hon')));

  const component = mount(<BrowserRouter><LaunchesList/></BrowserRouter>);

  expect(component.text()).toMatch('The launches list cannot be fetched :(');
});

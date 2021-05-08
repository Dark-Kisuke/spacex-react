import {CardMedia} from '@material-ui/core';
import {mount} from 'enzyme';
import React from 'react';
import {LaunchData} from '../../../../types/launch-data';
import LaunchInfo from '../index';

const launchDataMock: LaunchData = {
  id: '1234',
  name: 'Launch 1',
  rocket: 'Rocket 1',
  upcoming: true,
  launchDate: '2020-01-01',
  success: undefined,
  iconColor: '#ffffff'
}

it('mount without crashing', () => {
  mount(<LaunchInfo launchData={launchDataMock}/>);
});

it('shows patch image when image is available', () => {
  const launchData = Object.assign({}, launchDataMock);
  launchData.patchImage = 'https://example.com/image.png';

  const launchInfo = mount(<LaunchInfo launchData={launchData}/>);

  expect(launchInfo.containsMatchingElement(<CardMedia image={launchData.patchImage}/>)).toEqual(true);
});

it('shows patch not available when image is not provided', () => {
  const launchData = Object.assign({}, launchDataMock);
  launchData.patchImage = undefined;

  const launchInfo = mount(<LaunchInfo launchData={launchData}/>);

  expect(launchInfo.containsMatchingElement(<CardMedia/>)).toEqual(false);
});

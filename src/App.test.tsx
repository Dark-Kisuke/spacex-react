import {mount} from 'enzyme';
import React from 'react';
import App from './App';
import LaunchesList from './components/LaunchesList';

it('renders default view', () => {
  const app = mount(<App/>);

  expect(app.containsMatchingElement(<LaunchesList/>)).toEqual(true);
});

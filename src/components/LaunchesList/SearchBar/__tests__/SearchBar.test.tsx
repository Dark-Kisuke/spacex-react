import {mount} from 'enzyme';
import React from 'react';
import SearchBar from '../index';

it('mount without crashing', () => {
  mount(<SearchBar onChange={() => {
  }}/>);
});

it('input triggers onChange event', () => {
  const onChangeMock = jest.fn();
  const event = {
    target: {value: 'abcd'}
  };
  const searchBar = mount(<SearchBar onChange={onChangeMock}/>);

  searchBar.find('input').simulate('change', event);

  expect(onChangeMock).toBeCalledWith('abcd');
});

import {within} from '@testing-library/react';
import {mount} from 'enzyme';
import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {LaunchData} from '../../../../types/launch-data';
import LaunchesListTable from '../index';

const emptyFunc = () => {
};

const mockData: LaunchData[] = [
  {
    id: '1',
    name: 'Launch 1',
    rocket: 'rocket1',
    launchDate: '2020-01-01T12:00:00',
    upcoming: false,
    success: true,
    iconColor: '#ffffff',
    patchImage: 'https://example.com/image.png'
  },
  {
    id: '2',
    name: 'Launch 2',
    rocket: 'rocket2',
    launchDate: '2020-01-02T12:00:00',
    upcoming: true
  },
  {
    id: '3',
    name: 'Launch 3',
    rocket: 'rocket3',
    launchDate: '2020-01-03T12:00:00',
    upcoming: false,
    success: false,
    patchImage: 'https://example.com/image.png'
  }
];

it('mount with empty data without crashing', () => {
  mount(<LaunchesListTable loading={false} data={[]} page={0} total={0} rowsPerPage={5}
                           onChangeRowsPerPage={emptyFunc} onChangePage={emptyFunc}
                           onFavouriteLaunch={emptyFunc} onRemoveFavouriteLaunch={emptyFunc}/>
  );
});

it('mount with some data without crashing', () => {
  const launchesListTable = mount(
    <BrowserRouter>
      <LaunchesListTable loading={false} data={mockData} page={0} total={mockData.length}
                         rowsPerPage={5}
                         onChangeRowsPerPage={emptyFunc} onChangePage={emptyFunc}
                         onFavouriteLaunch={emptyFunc} onRemoveFavouriteLaunch={emptyFunc}/>
    </BrowserRouter>
  );

  expect(launchesListTable.find('table').find('tbody').find('tr').length).toEqual(3);
});

it('shows indicator then loading prop is true', () => {
  const launchesListTable = mount(<LaunchesListTable loading={true} data={[]} page={0} total={0} rowsPerPage={5}
                                                     onChangeRowsPerPage={emptyFunc} onChangePage={emptyFunc}
                                                     onFavouriteLaunch={emptyFunc} onRemoveFavouriteLaunch={emptyFunc}/>
  );

  expect(launchesListTable.find('table').find('[role="progressbar"]').length).toEqual(1);
});

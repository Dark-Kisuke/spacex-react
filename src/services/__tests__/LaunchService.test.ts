import axios from 'axios';
import {take} from 'rxjs/operators';
import {LaunchService} from '../launch-service';

jest.mock('axios');

const mockStorage = () => {
  Storage.prototype.getItem = jest.fn();
  Storage.prototype.setItem = jest.fn();
};

const mockData = {
  id: '1234',
  name: 'name 1',
  upcoming: false,
  date_utc: '2020-01-01T12:00:00',
  success: true,
  links: {
    patch: {
      small: 'some image'
    }
  },
  rocket: 'rocket'
};
const launchService = new LaunchService();

describe('getLaunches', () => {
  beforeAll(() => mockStorage());

  it('maps data correctly', done => {
    // @ts-ignore
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(['1234']));
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({data: {docs: [mockData], totalDocs: 1}}));

    launchService.getLaunches(0, 5, 'query')
      .pipe(take(1))
      .subscribe(result => {
        expect(result.total).toEqual(1);
        expect(result.data[0].id).toEqual('1234');
        expect(result.data[0].name).toEqual('name 1');
        expect(result.data[0].upcoming).toBeFalsy();
        expect(result.data[0].success).toBeTruthy();
        expect(result.data[0].launchDate).toEqual('2020-01-01T12:00:00');
        expect(result.data[0].patchImage).toEqual('some image');
        expect(result.data[0].rocket).toEqual('rocket');
        expect(result.data[0].favourited).toBeTruthy();

        done();
      });
  });

  it('created correct request with query', done => {
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({data: {docs: [mockData], totalDocs: 1}}));

    launchService.getLaunches(1, 5, 'query')
      .pipe(take(1))
      .subscribe(() => done());

    const expectedBody = {
      options: {page: 1, limit: 5, sort: {flight_number: 'desc'}},
      query: {
        name: {
          $regex: 'query',
          $options: 'i'
        }
      }
    };

    expect(axios.post).toBeCalledWith('https://api.spacexdata.com/v4/launches/query', expectedBody);
  });

  it('created correct request without query', done => {
    // @ts-ignore
    axios.post.mockImplementationOnce(() => Promise.resolve({data: {docs: [mockData], totalDocs: 1}}));

    launchService.getLaunches(1, 5, null)
      .pipe(take(1))
      .subscribe(() => done());

    const expectedBody = {
      options: {page: 1, limit: 5, sort: {flight_number: 'desc'}},
      query: {}
    };

    expect(axios.post).toBeCalledWith('https://api.spacexdata.com/v4/launches/query', expectedBody);
  });
});

describe('getLaunch', () => {
  beforeAll(() => mockStorage());

  it('maps data correctly', done => {
    // @ts-ignore
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(['1234']));
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({data: mockData}));

    launchService.getLaunch('1234')
      .pipe(take(1))
      .subscribe(result => {
        expect(result.id).toEqual('1234');
        expect(result.name).toEqual('name 1');
        expect(result.upcoming).toBeFalsy();
        expect(result.success).toBeTruthy();
        expect(result.launchDate).toEqual('2020-01-01T12:00:00');
        expect(result.patchImage).toEqual('some image');
        expect(result.rocket).toEqual('rocket');
        expect(result.favourited).toBeTruthy();

        done();
      });
  });

  it('created correct request', done => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({data: mockData}));

    launchService.getLaunch('1234')
      .pipe(take(1))
      .subscribe(() => done());

    expect(axios.get).toBeCalledWith('https://api.spacexdata.com/v4/launches/1234');
  });
});

describe('favourite', () => {
  beforeAll(() => mockStorage());

  it('favourites a new launch in a clean storage', () => {
    // @ts-ignore
    Storage.prototype.getItem.mockReturnValue(null);

    const result = launchService.favourite('2137');

    expect(result).toBeTruthy();
    expect(localStorage.setItem).toBeCalledWith('favouriteLaunches', JSON.stringify(['2137']));
  });

  it('favourites a new launch in a not clean storage', () => {
    // @ts-ignore
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(['1111']));

    const result = launchService.favourite('2137');

    expect(result).toBeTruthy();
    expect(localStorage.setItem).toBeCalledWith('favouriteLaunches', JSON.stringify(['1111','2137']));
  });

  it('does nothing when a favourite already exist', () => {
    // @ts-ignore
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(['2137']));

    const result = launchService.favourite('2137');

    expect(result).toBeFalsy();
    expect(localStorage.setItem).toBeCalledTimes(0);
  });
});

describe('removeFavourite', () => {
  it('removes a favourite', () => {
    // @ts-ignore
    Storage.prototype.getItem.mockReturnValue(JSON.stringify(['2137']));

    launchService.removeFavourite('2137');

    expect(localStorage.setItem).toBeCalledWith('favouriteLaunches', '[]');
  });
});

import axios from 'axios';
import {take} from 'rxjs/operators';
import {RocketService} from '../rocket-service';

jest.mock('axios');

const mockData = {
  name: 'rocket 1',
  type: 'type 1',
  diameter: {meters: 12},
  height: {meters: 34},
  mass: {kg: 56}
};
const rocketService = new RocketService();

describe('getRocket', () => {

  it('maps data correctly', done => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({data: mockData}));

    rocketService.getRocket('1234')
      .pipe(take(1))
      .subscribe(result => {
        expect(result.name).toEqual('rocket 1');
        expect(result.type).toEqual('type 1');
        expect(result.diameter).toEqual(12);
        expect(result.height).toEqual(34);
        expect(result.mass).toEqual(56);

        done();
      });
  });

  it('created correct request', done => {
    // @ts-ignore
    axios.get.mockImplementationOnce(() => Promise.resolve({data: mockData}));

    rocketService.getRocket('1234')
      .pipe(take(1))
      .subscribe(() => done());

    expect(axios.get).toBeCalledWith('https://api.spacexdata.com/v4/rockets/1234');
  });
});

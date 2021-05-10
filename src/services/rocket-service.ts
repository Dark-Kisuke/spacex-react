import axios from 'axios';
import {createContext, useContext} from 'react';
import {from} from 'rxjs';
import {map} from 'rxjs/operators';
import {RocketData} from '../types/rocket-data';

export class RocketService {
  private readonly api = 'https://api.spacexdata.com/v4/rockets';

  /**
   * Fetches the single rocket data
   * @param id The rocket id
   */
  public getRocket(id: string) {
    return from(axios.get(`${this.api}/${id}`))
      .pipe(
        map(response => this.mapRocketData(response.data))
      );
  }

  private mapRocketData(object: any): RocketData {
    return {
      name: object.name,
      type: object.type,
      diameter: object.diameter.meters,
      height: object.height.meters,
      mass: object.mass.kg
    };
  }
}

const RocketServiceContext = createContext<RocketService>(new RocketService());

export const useRocketService = () => {
  return useContext(RocketServiceContext);
};

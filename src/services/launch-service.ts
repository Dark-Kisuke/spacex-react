import axios from 'axios';
import {createContext, useContext} from 'react';
import {from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {LaunchData} from '../types/launch-data';

export interface LaunchesList {
  data: LaunchData[],
  total: number
}

export class LaunchService {
  private readonly api = 'https://api.spacexdata.com/v4/launches';

  /**
   * Fetches the paginated list of launches, ordered by flight number, desc.
   * @param page The page number. Indexing started from the 1
   * @param limit The page size
   * @param name The optional name filter
   */
  public getLaunches(page: number, limit: number, name: string | null): Observable<LaunchesList> {
    const body = {
      options: {page, limit, sort: {flight_number: 'desc'}},
      query: {}
    };

    if (name) {
      body.query = {
        name: {
          $regex: `${name}`,
          $options: 'i'
        }
      };
    }

    return from(axios.post(`${this.api}/query`, body))
      .pipe(
        map(response => response.data),
        map(response => ({
            data: response.docs.map((value: any) => this.mapLaunch(value)),
            total: response.totalDocs
          })
        )
      );
  }

  /**
   * Fetches the single launch data
   * @param id The launch id
   */
  public getLaunch(id: string) {
    return from(axios.get(`${this.api}/${id}`))
      .pipe(
        map(response => this.mapLaunch(response.data))
      );
  }

  /**
   * Favourites the launch by it's id and applying randomly the color to it.
   * @param id The launch id
   * @return If the launch has been favourited, returns true, otherwise  false.
   */
  public favourite(id: string) {
    const allFavourites = this.getAllFavouriteLaunched();
    if (allFavourites.includes(id)) {
      return false;
    }

    allFavourites.push(id);
    this.storeFavourites(allFavourites);

    return true;
  }

  /**
   * Returns the flag whether the launch is favourited
   * @param id The launch id
   */
  public isFavourited(id: string): boolean {
    return this.getAllFavouriteLaunched().includes(id);
  }

  /**
   * Removes the favourite status of the launch
   * @param id The launch id
   * @return If the favourite flag has been removed, returns true, otherwise false
   */
  public removeFavourite(id: string) {
    const allFavourites = this.getAllFavouriteLaunched();
    if (!allFavourites.includes(id)) {
      return false;
    }

    this.storeFavourites(allFavourites.filter(value => value !== id));
  }

  private storeFavourites(favourites: any) {
    localStorage.setItem('favouriteLaunches', JSON.stringify(favourites));
  }

  private getAllFavouriteLaunched(): string[] {
    const launches = localStorage.getItem('favouriteLaunches');
    if (!launches) {
      return [];
    }

    const parsed = JSON.parse(launches);
    return Array.isArray(parsed) ? parsed : [];
  }

  private mapLaunch(object: any): LaunchData {
    return {
      id: object.id,
      name: object.name,
      upcoming: object.upcoming,
      launchDate: object.date_utc,
      success: object.success,
      patchImage: object.links?.patch?.small,
      rocket: object.rocket,
      favourited: this.isFavourited(object.id)
    };
  }
}

const LaunchServiceContext = createContext<LaunchService>(new LaunchService());

export const useLaunchService = () => {
  return useContext(LaunchServiceContext);
};

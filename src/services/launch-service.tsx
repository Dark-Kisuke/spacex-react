import axios from "axios";
import {createContext, useContext} from 'react';
import {from, Observable} from "rxjs";
import {map, take} from "rxjs/operators";
import {LaunchData} from "../types/launch-data";

export interface LaunchesList {
  data: LaunchData[],
  total: number
}

export class LaunchService {
  private readonly api = "https://api.spacexdata.com/v4/launches";

  public getLaunches(page: number, limit: number, name: string | null): Observable<LaunchesList> {

    const body = {
      options: {page, limit, sort: {flight_number: "desc"}},
      query: {}
    };

    if (name) {
      body.query = {
        name: {
          $regex: `${name}`,
          $options: 'i'
        }
      }
    }

    return from(axios.post(`${this.api}/query`, body))
      .pipe(
        map(response => response.data),
        map(response => ({
            data: response.docs.map((value: any) => this.mapLaunch(value)),
            total: response.totalDocs,
          })
        )
      );
  }

  public getLaunch(id: string) {
    return from(axios.get(`${this.api}/${id}`))
      .pipe(
        take(1),
        map(response => this.mapLaunch(response.data))
      )
  }

  private mapLaunch(object: any): LaunchData {
    return {
      id: object.id,
      name: object.name,
      upcoming: object.upcoming,
      launchDate: object.date_utc,
      success: object.success,
      patchImage: object.links?.patch?.small,
      rocket: object.rocket
    }
  }
}

const LaunchServiceContext = createContext<LaunchService>(new LaunchService());

export const useLaunchService = () => {
  return useContext(LaunchServiceContext);
}

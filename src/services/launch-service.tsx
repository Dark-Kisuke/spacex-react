import {createContext, useContext} from 'react';
import {from, Observable} from "rxjs";
import axios from "axios";
import {map, take} from "rxjs/operators";
import {LaunchItem} from "../types/LaunchItem";

export class LaunchService {
  private readonly api = "https://api.spacexdata.com/v4/launches";

  public getLaunches(page: number, limit: number, name: string | null):
    Observable<{ data: LaunchItem[], total: number }> {

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

    return from(
      axios.post(`${this.api}/query`, body)
    ).pipe(
      map(response => response.data),
      map(response => ({
          data: response.docs.map((value: any) => this.mapLaunch(value)),
          total: response.totalDocs,
        })
      )
    );
  }

  public getLaunch(id: string) {
    return from(
      axios.get(`${this.api}/${id}`)
    ).pipe(
      take(1),
      map(response => response.data)
    )
  }

  private mapLaunch(obj: any): LaunchItem {
    return {
      id: obj.id,
      name: obj.name,
      upcoming: obj.upcoming,
      launchDate: obj.date_utc,
      success: obj.success
    }
  }
}

const LaunchServiceContext = createContext<LaunchService>(new LaunchService());

export const useLaunchService = () => {
  return useContext(LaunchServiceContext);
}

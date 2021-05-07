import axios from "axios";
import {createContext, useContext} from "react";
import {from} from "rxjs";
import {map} from "rxjs/operators";

export interface RocketDTO {
  name: string;
  type: string;
  height: {
    meters: number
  };
  diameter: {
    meters: number
  };
  mass: {
    kg: number
  }
}

export class RocketService {
  private readonly api = "https://api.spacexdata.com/v4/rockets";

  public getRocket(id: string) {
    return from(
      axios.get(`${this.api}/${id}`)
    ).pipe(
      map(response => response.data as RocketDTO),
    )
  }
}

const RocketServiceContext = createContext<RocketService>(new RocketService());

export const useRocketService = () => {
  return useContext(RocketServiceContext);
}

import {Grid, IconButton, LinearProgress} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {mergeMap, take, tap} from "rxjs/operators";
import {useLaunchService} from "../../services/launch-service";
import {RocketDTO, useRocketService} from "../../services/rocket-service";
import {LaunchItem} from "../../types/LaunchItem";
import {RocketData} from "../../types/RocketData";
import LaunchInfo from "./LaunchInfo";
import RocketInfo from "./RocketInfo";

export default function LaunchDetails({launchId}: { launchId: string }) {
  const [loading, setLoading] = useState(false);
  const [launchData, setLaunchData] = useState<LaunchItem | null>(null);
  const [rocketData, setRocketData] = useState<RocketData | null>(null);
  const launchService = useLaunchService();
  const rocketService = useRocketService();

  const mapLaunchData = (object: any): LaunchItem => {
    return {
      id: object.id,
      name: object.name,
      upcoming: object.upcoming,
      success: object.success,
      launchDate: object.date_utc,
      patchImage: object.links?.patch?.small
    };
  }

  const mapRocketData = (object: RocketDTO): RocketData => {
    return {
      name: object.name,
      type: object.type,
      diameter: object.diameter.meters,
      height: object.height.meters,
      mass: object.mass.kg
    }
  }

  useEffect(() => {
    function getLaunchData() {
      setLoading(true);
      launchService.getLaunch(launchId)
        .pipe(
          take(1),
          tap(launch => setLaunchData(mapLaunchData(launch))),
          mergeMap(launch => rocketService.getRocket(launch.rocket)),
          tap(rocket => setRocketData(mapRocketData(rocket)))
        ).subscribe(() => setLoading(false));
    }

    getLaunchData();
  }, [launchId, launchService, rocketService]);

  return (
    <>
      <IconButton color="primary" component={Link} to="/">
        <ArrowBackIosIcon/> Back to the list
      </IconButton>
      {loading && <LinearProgress/>}
      {launchData && rocketData &&
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LaunchInfo launchData={launchData}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RocketInfo rocketData={rocketData}/>
        </Grid>
      </Grid>
      }
    </>
  )
}

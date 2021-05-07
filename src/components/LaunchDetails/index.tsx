import {IconButton, LinearProgress} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {take, tap} from "rxjs/operators";
import {useLaunchService} from "../../services/launch-service";
import {LaunchItem} from "../../types/LaunchItem";
import LaunchInfo from "./LaunchInfo";

export default function LaunchDetails({launchId}: { launchId: string }) {
  const [loading, setLoading] = useState(false);
  const [launchData, setLaunchData] = useState<LaunchItem | null>(null);
  const launchService = useLaunchService();

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

  useEffect(() => {
    function getLaunchData() {
      setLoading(true);
      launchService.getLaunch(launchId)
        .pipe(
          take(1),
          tap(launch => setLaunchData(mapLaunchData(launch)))
        ).subscribe(() => setLoading(false));
    }

    getLaunchData();
  }, [launchService, launchId]);

  return (
    <>
      <IconButton color="primary" component={Link} to="/">
        <ArrowBackIosIcon/> Back to the list
      </IconButton>
      {loading && <LinearProgress/>}
      {launchData && <LaunchInfo launchData={launchData}/>}
    </>
  )
}

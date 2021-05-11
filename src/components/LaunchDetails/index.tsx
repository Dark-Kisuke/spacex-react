import {Grid, IconButton, LinearProgress} from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {Alert, AlertTitle} from '@material-ui/lab';
import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {finalize, mergeMap, tap} from 'rxjs/operators';
import {useLaunchService} from '../../services/launch-service';
import {useRocketService} from '../../services/rocket-service';
import {LaunchData} from '../../types/launch-data';
import {RocketData} from '../../types/rocket-data';
import LaunchInfo from './LaunchInfo';
import RocketInfo from './RocketInfo';

const LaunchDetails = ({launchId}: { launchId: string }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [launchData, setLaunchData] = useState<LaunchData | null>(null);
  const [rocketData, setRocketData] = useState<RocketData | null>(null);
  const launchService = useLaunchService();
  const rocketService = useRocketService();

  const handleFavouriteLaunch = () => {
    const itemColor = launchService.favourite(launchId);
    updateLaunchColor(itemColor!);
  };

  const handleRemoveFavouriteLaunch = () => {
    launchService.removeFavourite(launchId);
    updateLaunchColor();
  };

  const updateLaunchColor = (color?: string) => {
    const updatedLaunchData = Object.assign({}, launchData);
    updatedLaunchData.iconColor = color;

    setLaunchData(updatedLaunchData);
  };

  useEffect(() => {
    setLoading(true);
    setError(false);

    const sub = launchService.getLaunch(launchId)
      .pipe(
        tap(launch => setLaunchData(launch)),
        mergeMap(launch => rocketService.getRocket(launch.rocket)),
        tap(rocket => setRocketData(rocket)),
        finalize(() => setLoading(false))
      ).subscribe({error: () => setError(true)});

    return () => sub.unsubscribe();
  }, [launchId]);

  let errorAlert;
  if (error) {
    errorAlert = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        The requested launch cannot be fetched :(
      </Alert>
    );
  }

  return (
    <>
      <IconButton color="primary" component={Link} to="/">
        <ArrowBackIosIcon/> Back to the list
      </IconButton>
      {loading && <LinearProgress/>}
      {errorAlert}
      {launchData && rocketData &&
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <LaunchInfo launchData={launchData}
                      onFavouriteLaunch={handleFavouriteLaunch}
                      onRemoveFavouriteLaunch={handleRemoveFavouriteLaunch}/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <RocketInfo rocketData={rocketData}/>
        </Grid>
      </Grid>
      }
    </>
  );
};

export default LaunchDetails;

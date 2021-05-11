import {createStyles, makeStyles} from '@material-ui/core';
import {Alert, AlertTitle} from '@material-ui/lab';
import React, {useEffect, useState} from 'react';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, finalize} from 'rxjs/operators';
import {useLaunchService} from '../../services/launch-service';
import {LaunchData} from '../../types/launch-data';
import LaunchesListTable from './LaunchesListTable';
import SearchBar from './SearchBar';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: '100%'
    },
    paper: {
      padding: '2rem'
    },
    searchField: {
      marginBottom: '2rem'
    }
  })
);

const LaunchesList = () => {
  const classes = useStyles();
  const launchService = useLaunchService();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([] as LaunchData[]);
  const [query, setQuery] = useState('');

  const [data$] = useState(() => new BehaviorSubject([] as LaunchData[]));
  const [searchQuery$] = useState(() => new BehaviorSubject(''));

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
  };

  const handleQueryInput = (value: string) => {
    searchQuery$.next(value);
  };

  const handleFavouriteLaunch = (id: string) => {
    if (launchService.favourite(id)) {
      updateLaunchFavouriteStatus(id, true);
    }
  };

  const handleRemoveFavouriteLaunch = (id: string) => {
    launchService.removeFavourite(id);
    updateLaunchFavouriteStatus(id, false);
  };

  const updateLaunchFavouriteStatus = (id: string, favourited: boolean) => {
    // Deep clone data
    const newData = data.map(x => Object.assign({}, x));
    const launchData = newData.find(launch => launch.id == id);
    if (launchData) {
      launchData.favourited = favourited;
    }

    data$.next(newData);
  };

  useEffect(() => {
    const sub = data$.subscribe(setData);

    return () => sub.unsubscribe();
  }, []);

  useEffect(() => {
    setLoading(true);

    const sub = launchService.getLaunches(page + 1, rowsPerPage, query ? query : null)
      .pipe(finalize(() => setLoading(false)))
      .subscribe({
        next: (response) => {
          data$.next(response.data);
          setTotal(response.total);
        },
        error: () => setError(true)
      });

    return () => sub.unsubscribe();
  }, [page, rowsPerPage, query]);

  useEffect(() => {
    const sub = searchQuery$
      .pipe(debounceTime(500))
      .subscribe((value) => {
        setQuery(value);
        setPage(0);
      });

    return () => sub.unsubscribe();
  }, []);

  let errorAlert;
  if (error) {
    errorAlert = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        The launches list cannot be fetched :(
      </Alert>
    );
  }

  return (
    <div className={classes.root}>
      <div className={classes.searchField}>
        <SearchBar onChange={handleQueryInput}/>
      </div>
      {errorAlert}
      <LaunchesListTable
        loading={loading}
        data={data}
        total={total}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        onFavouriteLaunch={handleFavouriteLaunch}
        onRemoveFavouriteLaunch={handleRemoveFavouriteLaunch}
      />
    </div>
  );
};

export default LaunchesList;

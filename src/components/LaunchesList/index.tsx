import {createStyles, makeStyles} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {BehaviorSubject} from 'rxjs';
import {debounceTime, take} from 'rxjs/operators';
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
  }),
);

const LaunchesList = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([] as LaunchData[]);
  const [query, setQuery] = useState('');

  const [data$] = useState(() => new BehaviorSubject([] as LaunchData[]));
  const [searchQuery$] = useState(() => new BehaviorSubject(''));

  const launchService = useLaunchService();

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
  }

  const handleQueryInput = (value: string) => {
    searchQuery$.next(value);
  }

  const handleFavouriteLaunch = (id: string) => {
    const itemColor = launchService.favourite(id);
    updateLaunchColor(id, itemColor!);
  }

  const handleRemoveFavouriteLaunch = (id: string) => {
    launchService.removeFavourite(id);
    updateLaunchColor(id);
  }

  const updateLaunchColor = (id: string, color?: string) => {
    // Deep clone data
    const newData = data.map(x => Object.assign({}, x));
    const launchData = newData.find(launch => launch.id == id);
    if (launchData) {
      launchData.iconColor = color;
    }

    data$.next(newData);
  }

  useEffect(() => {
    const sub = data$.subscribe(setData)
    return () => {
      sub.unsubscribe();
    }
  }, []);

  useEffect(() => {
    function getLaunches() {
      setLoading(true);
      launchService.getLaunches(page + 1, rowsPerPage, query ? query : null)
        .pipe(take(1))
        .subscribe(response => {
          data$.next(response.data);
          setTotal(response.total);
          setLoading(false);
        });
    }

    getLaunches();
  }, [page, rowsPerPage, query]);

  useEffect(() => {
    const sub = searchQuery$
      .pipe(debounceTime(500))
      .subscribe(setQuery);

    return () => {
      sub.unsubscribe();
    }
  })

  return (
    <div className={classes.root}>
      <div className={classes.searchField}>
        <SearchBar onChange={handleQueryInput}/>
      </div>

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
  )
}

export default LaunchesList;

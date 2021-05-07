import React, {useEffect, useState} from "react";
import {take} from "rxjs/operators";
import {useLaunchService} from "../../services/launch-service";
import {LaunchItem} from "../../types/LaunchItem";
import LaunchesListTable from "./LaunchesListTable";

export function LaunchesList() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([] as LaunchItem[]);
  const [total, setTotal] = useState(0);
  const launchService = useLaunchService();

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
  }

  useEffect(() => {
    function getLaunches() {
      setLoading(true);
      launchService.getLaunches(page + 1, rowsPerPage, null)
        .pipe(take(1))
        .subscribe(response => {
          setData(response.data);
          setTotal(response.total);
          setLoading(false);
        });
    }

    getLaunches();
  }, [page, rowsPerPage, launchService]);

  return (
    <LaunchesListTable
      loading={loading}
      data={data}
      total={total}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

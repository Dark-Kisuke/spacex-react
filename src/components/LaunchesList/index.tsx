import LaunchesListTable from "./LaunchesListTable";
import {LaunchItem} from "../../types/LaunchItem";
import {useEffect, useState} from "react";
import {useLaunchService} from "../../services/launch-service";
import {take} from "rxjs/operators";

export function LaunchesList() {
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

  function getLaunches() {
    launchService.getLaunches(page + 1, rowsPerPage, null)
      .pipe(take(1))
      .subscribe(response => {
        setData(response.data);
        setTotal(response.total);
      });
  }

  useEffect(() => {
    getLaunches()
  }, [page, rowsPerPage]);

  return (
    <LaunchesListTable
      data={data}
      total={total}
      page={page}
      rowsPerPage={rowsPerPage}
      onChangePage={handleChangePage}
      onChangeRowsPerPage={handleChangeRowsPerPage}
    />
  )
}

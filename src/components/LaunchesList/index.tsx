import LaunchesListTable from "./LaunchesListTable";
import {LaunchItem} from "../../types/LaunchItem";
import {useState} from "react";

const data: LaunchItem[] = [
  {
    id: "1",
    name: "First",
    launchDate: "2021-05-01T12:00:00.000Z",
    upcoming: false,
    success: true,
    iconColor: "#e80c0c"
  },
  {
    id: "2",
    name: "Second",
    launchDate: "2021-06-01T12:00:00.000Z",
    upcoming: true
  }
];

export function LaunchesList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(1);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (rows: number) => {
    setRowsPerPage(rows);
    setPage(0);
  }

  return (
    <div>
      <LaunchesListTable
        data={data}
        total={2}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    </div>
  )
}

import LaunchesListTable from "./LaunchesListTable";
import {LaunchItem} from "../../types/LaunchItem";

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
  return (
    <div>
      <LaunchesListTable
        data={data}
        total={2}
        page={0}
        rowsPerPage={5}
      />

    </div>
  )
}

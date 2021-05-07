import {
  createStyles,
  LinearProgress,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {LaunchItem} from "../../../types/LaunchItem";

type LaunchesListTableProps = {
  loading: boolean
  data: LaunchItem[];
  page: number;
  total: number;
  rowsPerPage: number;
  onChangePage: (pageNumber: number) => void;
  onChangeRowsPerPage: (rows: number) => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    loadingIndicator: {
      padding: 0
    },
    table: {
      minWidth: 500
    }
  }),
);

const LaunchesListTable = (props: LaunchesListTableProps) => {
  const classes = useStyles();

  const handleChangePage = (event: unknown, newPage: number) => {
    props.onChangePage(newPage);
  };
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChangeRowsPerPage(parseInt(event.target.value));
  };

  return (
    <>
      <TableContainer>
        <Table className={classes.table} aria-label="Launches table">
          <TableHead>
            <TableRow>
              <TableCell/>
              <TableCell>Name</TableCell>
              <TableCell>Launch Date</TableCell>
              <TableCell>Upcoming</TableCell>
              <TableCell>Successful</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.loading &&
            <TableRow>
              <TableCell colSpan={5} className={classes.loadingIndicator}>
                <LinearProgress/>
              </TableCell>
            </TableRow>
            }
            {props.data.map((value, index) => {
              return <TableRow hover key={'launch-' + index}>
                <TableCell>
                  {value.iconColor ?
                    <StarIcon style={{color: value.iconColor}}/> :
                    <StarBorderIcon/>
                  }
                </TableCell>
                <TableCell>
                  <Typography>
                    <Link component={RouterLink} to={'/launch/' + value.id}>{value.name}</Link>
                  </Typography>
                </TableCell>
                <TableCell>
                  {value.launchDate}
                </TableCell>
                <TableCell>
                  {value.upcoming
                    ? <DoneIcon/>
                    : <ClearIcon/>
                  }
                </TableCell>
                <TableCell>
                  {value.success == null
                    ? <HelpOutlineIcon/>
                    : value.success
                      ? <DoneIcon/>
                      : <ClearIcon/>
                  }
                </TableCell>
              </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={props.total}
        page={props.page}
        rowsPerPage={props.rowsPerPage}
        rowsPerPageOptions={[1, 5, 10, 15]}

        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </>
  )
};

export default LaunchesListTable;

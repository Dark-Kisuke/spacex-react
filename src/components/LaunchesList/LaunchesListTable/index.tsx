import {
  createStyles,
  Link,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
import {Link as RouterLink} from "react-router-dom";
import {LaunchItem} from "../../../types/LaunchItem";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';

type LaunchesListTableProps = {
  data: LaunchItem[];
  page: number;
  total: number;
  rowsPerPage: number;
}

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      minWidth: 500
    }
  }),
);

const LaunchesListTable = (props: LaunchesListTableProps) => {
  const classes = useStyles();

  return (
    <div>
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
    </div>
  )
};

export default LaunchesListTable;

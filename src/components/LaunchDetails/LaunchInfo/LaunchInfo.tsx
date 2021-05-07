import {Card, CardContent, CardMedia, createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import DoneIcon from "@material-ui/icons/Done";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import React from "react";
import {LaunchItem} from "../../../types/LaunchItem";

interface LaunchInfoProps {
  launchData: LaunchItem
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardTitle: {
      fontSize: 14,
    },
    patch: {
      width: 150,
      height: 150
    }
  }),
);

function PatchImage({link}: { link?: string }) {
  const classes = useStyles();

  return (
    <div>
      <Typography gutterBottom variant="h6" component="h3">
        Patch image
      </Typography>
      {link ?
        <CardMedia
          className={classes.patch}
          image={link}
          title="Patch image"
        />
        : <span>N/A</span>
      }
    </div>
  )
}

export function LaunchInfo({launchData}: LaunchInfoProps) {
  return (
    <Card variant="outlined">
      <CardContent>

        <Typography gutterBottom variant="h5" component="h2">
          <StarBorderIcon/> {launchData.name}
        </Typography>

        <dl>
          <dt>Name</dt>
          <dd>{launchData.name}</dd>
          <dt>Launch Date</dt>
          <dd>{launchData.launchDate}</dd>
          <dt>Upcoming</dt>
          <dd>
            {launchData.upcoming
              ? <DoneIcon/>
              : <ClearIcon/>
            }
          </dd>
          <dt>Success</dt>
          <dd>
            {launchData.success === null
              ? <HelpOutlineIcon/>
              : launchData.success ? <DoneIcon/> : <ClearIcon/>
            }
          </dd>
        </dl>

        <PatchImage link={launchData.patchImage}/>
      </CardContent>
    </Card>
  )
}


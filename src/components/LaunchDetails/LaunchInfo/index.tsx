import {Card, CardContent, CardMedia, createStyles, makeStyles, Typography} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import DoneIcon from '@material-ui/icons/Done';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import React from 'react';
import {LaunchData} from '../../../types/launch-data';

interface LaunchInfoProps {
  launchData: LaunchData;
  onFavouriteLaunch: () => void;
  onRemoveFavouriteLaunch: () => void;
}

const useStyles = makeStyles(() =>
  createStyles({
    patch: {
      width: 150,
      height: 150
    }
  })
);

const PatchImage = ({link}: { link?: string }) => {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};

const LaunchInfo = ({launchData, onFavouriteLaunch, onRemoveFavouriteLaunch}: LaunchInfoProps) => {
  return (
    <Card variant="outlined">
      <CardContent>

        <Typography gutterBottom variant="h5" component="h2">
          {launchData.favourited ?
            <StarIcon onClick={() => onRemoveFavouriteLaunch()}/> :
            <StarBorderIcon onClick={() => onFavouriteLaunch()}/>
          } {launchData.name}
        </Typography>

        <dl>
          <dt>Name</dt>
          <dd>{launchData.name}</dd>
          <dt>Launch Date</dt>
          <dd>{launchData.launchDate}</dd>
          <dt>Upcoming</dt>
          <dd className="upcoming-status">
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
  );
};

export default LaunchInfo;

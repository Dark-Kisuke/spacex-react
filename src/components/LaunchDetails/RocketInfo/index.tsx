import {Card, CardContent, Typography} from '@material-ui/core';
import React from 'react';
import {RocketData} from '../../../types/rocket-data';

interface RocketInfoProps {
  rocketData: RocketData
}

const RocketInfo = ({rocketData}: RocketInfoProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Rocket
        </Typography>
        <dl>
          <dt>Name</dt>
          <dd>{rocketData.name}</dd>
          <dt>Type</dt>
          <dd>{rocketData.type}</dd>
          <dt>Height</dt>
          <dd>{rocketData.mass} m</dd>
          <dt>Diameter</dt>
          <dd>{rocketData.diameter} m</dd>
          <dt>Mass</dt>
          <dd>{rocketData.mass} kg</dd>
        </dl>
      </CardContent>
    </Card>
  );
};

export default RocketInfo;

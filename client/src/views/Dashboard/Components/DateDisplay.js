import React from 'react';

import Grid from '@material-ui/core/Grid';

import {numberToDayHeb} from '../../../utils/time';

export const DateDisplay = ({ name }) => {
  const date = new Date();

  //const day = date.getDay();
  const dayNumber = date.getUTCDay();
  //const month = date.getMonth() + 1;
  //const year = date.getFullYear();
  const hour = date.getHours();

  //const dateString = `${day}.${month}.${year}`;

  const greet = hour > 0 && hour < 12 ? 'בוקר טוב'
      : hour >= 12 && hour < 18 ? 'צהריים טובים'
          : 'ערב טוב'

  const username = name ? name : 'עובד מנזלה'
  const result = [greet, username, '!'].join(' ');

  const dayInHeb = numberToDayHeb(dayNumber);

  return <Grid item style={{border: '1px #012345 solid', borderRadius: '12px'}}>
    <div> <h3> <b> {result} </b> </h3>  </div>
  </Grid>
}

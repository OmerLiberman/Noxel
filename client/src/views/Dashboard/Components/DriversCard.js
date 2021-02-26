import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {CardHeader} from '@material-ui/core';

import {getBackgroundColor, textColor} from '../../../utils/colors';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: 'right',
    marginBottom: 12,
  },
});

const DriversCard = props => {
  const classes = useStyles();

  return (
      <div style={{padding: '10px'}}>
        <Card className={classes.root}>
          <CardHeader title={props.title} style={{backgroundColor: getBackgroundColor('drivers'), color: textColor, textAlign: 'right'}}/>

          <CardContent>

            <div>

              drivers
            </div>


          </CardContent>
          <CardActions style={{justifyContent: 'center'}}>
            <Button size="small">ראה עוד</Button>
          </CardActions>
        </Card>
      </div>

  );
};

export default DriversCard;

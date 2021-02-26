import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {CardHeader} from '@material-ui/core';

import {getBackgroundColor, textColor} from '../../../../utils/colors';
import {SaladCardElement} from './SaladCardElement';
import Grid from '@material-ui/core/Grid';
import Spinner from '../../../../components/Spinner/Spinner';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 250
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: 'right',
    marginBottom: 12,
  },
});

const SaladsCard = ({salads, plastics, spreads, breads, loading}) => {
  const classes = useStyles();

  return (
      <div style={{padding: '10px'}}>
        <Card className={classes.root}>
          <CardHeader title={<b>{"סלטים, חד פעמי וממרחים"}</b>}
                      component='div'
                      style={{backgroundColor: getBackgroundColor(''),
                        color: textColor, textAlign: 'center', fontWeight: 'bold'}}/>

          <CardContent>
            {
              loading ?
                  <Spinner/>
                  :
                  <Grid container>

                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                      <SaladCardElement title={'סלטים וירקות טריים'} data={salads}/>
                    </Grid>

                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                      <SaladCardElement title={'כלים חד פעמיים'} data={plastics}/>
                    </Grid>

                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                      <SaladCardElement title={'ממרחים'} data={spreads}/>
                    </Grid>

                    <Grid item xl={3} lg={3} md={6} sm={12} xs={12}>
                      <SaladCardElement title={'לחמים'} data={breads}/>
                    </Grid>

                  </Grid>
            }
          </CardContent>

          {/*<CardActions style={{justifyContent: 'center'}}>*/}
          {/*  <Button size="small" variant='outlined'>ראה פירוט</Button>*/}
          {/*</CardActions>*/}
        </Card>
      </div>

  );
};

export default SaladsCard;

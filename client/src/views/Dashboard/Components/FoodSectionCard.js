import React from 'react';

import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {CardHeader} from '@material-ui/core';

import {replaceName} from '../../../utils/strings';
import {getBackgroundColor, textColor} from '../../../utils/colors';

import {Donut} from '../../../components/Donut/Donut';
import Spinner from '../../../components/Spinner/Spinner';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    height: 410,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: 'right',
    marginBottom: 12,
  },
});

// each meal: {hebName mealId amount}
const FoodSectionCard = ({title, type, meals, loading}) => {
  const classes = useStyles();

  const amounts = meals && meals.map(meal => meal.amount);
  const labels = meals && meals.map(meal => replaceName(meal.hebName));

  return (
      <div style={{width: '100%', padding: '5px'}}>
        <Card className={classes.root}>
          <CardHeader title={<b>{title}</b>}
                      component='div'
                      style={{
                        backgroundColor: getBackgroundColor(type),
                        color: textColor,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
          />
          <CardContent>

            {
              loading || !meals ?
                  <Spinner/>
              :
              (meals.length === 0) ?
                  <div> <cetner> לא נמצאו מנות להצגה </cetner> </div>
              :
                <Donut labelsArray={labels} amountsArray={amounts} loading={loading}/>
            }

          </CardContent>
        </Card>
      </div>

  );
};

export default FoodSectionCard;

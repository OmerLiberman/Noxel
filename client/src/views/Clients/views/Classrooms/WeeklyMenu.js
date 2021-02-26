import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
  allMenu: {
    display: 'flex',
    flexDirection: 'row',
    direction: 'rtl',
    alignItems: 'end'
    // border: '1px solid #ccc',
    // borderRadius: '15px'
  },
  eachDay: {
    direction: 'rtl',
    padding: '5px',
    // border: '1px solid #ccc',
    minWidth: '130px',
  }
}));

const WeeklyMenu = ({warmFood, sides}) => {
  const classes = useStyles();

  const replaceUnderScores = (s) => {
    return s.replace(/-/g, ' ');
  }

  console.log(warmFood);
  console.log(sides);

  return (
      <Grid container className={classes.allMenu}>
        <Grid item className={classes.eachDay}>
            <div> יום ראשון </div>
              מזון חם
              {
                warmFood && warmFood.Sun && warmFood.Sun.meals.map(meal => {
                  return <div> - {replaceUnderScores(meal.hebName)} </div>
                })
              }
              תוספות
              {
                sides && sides.Sun.map(side => {
                  return <div> - {replaceUnderScores(side.hebName)} </div>
                })
              }
        </Grid>
        <Grid item className={classes.eachDay}>
          <div> יום שני </div>
          מזון חם
          {
            warmFood && warmFood.Sun && warmFood.Sun.meals.map(meal => {
              return <div> - {replaceUnderScores(meal.hebName)} </div>
            })
          }
          תוספות
          {
            sides && sides.Sun.map(side => {
              return <div> - {replaceUnderScores(side.hebName)} </div>
            })
          }
        </Grid>
        <Grid item className={classes.eachDay}>
          <div> יום שלישי </div>
          מזון חם
          {
            warmFood && warmFood.Sun && warmFood.Sun.meals.map(meal => {
              return <div> - {replaceUnderScores(meal.hebName)} </div>
            })
          }
          תוספות
          {
            sides && sides.Sun.map(side => {
              return <div> - {replaceUnderScores(side.hebName)} </div>
            })
          }
        </Grid>
        <Grid item className={classes.eachDay}>
          <div> יום רביעי </div>
          מזון חם
          {
            warmFood && warmFood.Sun && warmFood.Sun.meals.map(meal => {
              return <div> - {replaceUnderScores(meal.hebName)} </div>
            })
          }
          תוספות
          {
            sides && sides.Sun.map(side => {
              return <div> - {replaceUnderScores(side.hebName)} </div>
            })
          }
        </Grid>
        <Grid item className={classes.eachDay}>
          <div> יום חמישי </div>
          מזון חם
          {
            warmFood && warmFood.Sun && warmFood.Sun.meals.map(meal => {
              return <div> - {replaceUnderScores(meal.hebName)} </div>
            })
          }
          תוספות
          {
            sides && sides.Sun.map(side => {
              return <div> - {replaceUnderScores(side.hebName)} </div>
            })
          }
        </Grid>
      </Grid>
  )
}

export default WeeklyMenu;
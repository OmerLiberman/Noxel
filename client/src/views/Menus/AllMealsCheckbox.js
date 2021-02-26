import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const AllMealsCheckbox = ({allMeals = [], selectedMeals,
                                  handleCheckIng, handleUncheckIng}) => {

  const getNameOfMeal = (name) => {
    if (name) return name.replace(/-/g, ' ');
  };

  return (
      <Grid container direction={'row'}>
        {
          allMeals.map(meal => {
            return (
                <Grid itme xl={3}>
                  <FormControlLabel
                      control={
                        <Checkbox name={getNameOfMeal(meal.name)}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      handleCheckIng(meal.mid);
                                      console.log(
                                          `Checked ${meal.name} ${meal.mid}`);
                                    } else {
                                      handleUncheckIng(meal.mid);
                                      console.log(
                                          `Unchecked ${meal.name} ${meal.mid}`);
                                    }
                                  }}
                        />
                      }
                      label={getNameOfMeal(meal.name)}
                  />
                </Grid>
            );
          })
        }
      </Grid>
  );
};

export default AllMealsCheckbox;
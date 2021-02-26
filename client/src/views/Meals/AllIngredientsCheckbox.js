import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

const AllIngredientsCheckbox = ({allIngredients, selectedIngredients,
                                  handleCheckIng, handleUncheckIng}) => {

  const getNameOfMeal = (name) => {
    if (name) return name.replace(/-/g, ' ');
  };

  return (
      <Grid container direction={'row'}>
        {
          allIngredients.map(ingredient => {
            return (
                <Grid itme xl={3}>
                  <FormControlLabel
                      control={
                        <Checkbox name={getNameOfMeal(ingredient.name)}
                                  onChange={(event) => {
                                    if (event.target.checked) {
                                      handleCheckIng(ingredient.iid);
                                      console.log(
                                          `Checked ${ingredient.name} ${ingredient.iid}`);
                                    } else {
                                      handleUncheckIng(ingredient.iid);
                                      console.log(
                                          `Unchecked ${ingredient.name} ${ingredient.iid}`);
                                    }
                                  }}
                        />
                      }
                      label={getNameOfMeal(ingredient.name)}
                  />
                </Grid>
            );
          })
        }
      </Grid>
  );
};

export default AllIngredientsCheckbox;
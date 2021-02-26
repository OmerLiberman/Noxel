import React, {useEffect, useState} from 'react';
import axios from 'axios';

import Meal from './Meal'
import AddMealDialog from './AddMealDialog';

import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const Meals = props => {
  const [meals, setMeals] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    if (meals.length === 0) {
      fetchMealsData();
    }
    if (ingredients.length === 0) {
      fetchIngredientsData();
    }
  }, [meals, ingredients]);

  const handleAddButtonClick = (event) => {
    event.preventDefault();
    setAddDialogOpen(true);
  }

  const addMeal = (body) => {
    axios.post(`${process.env.REACT_APP_SERVER_URI}/api/products/meals/`, body)
        .then(res => {
          let meal = res.data.meal;

          let newMealData = {
            mid: meal._id,
            name: meal.hebName,
            description: meal.description,
            category: meal.kosherCategory,
            ingredients: meal.ingredients
          };

          let newMeals = meals.splice(meals.length, 0, newMealData);
          setMeals(newMeals);

          console.log(`Created ${meal._id}`);
        }).catch(err => console.error(err));
  }

  const deleteMeal = (mid) => {
    axios.delete(`${process.env.REACT_APP_SERVER_URI}/api/products/meals/${mid}`)
      .then(() => {
            let newMeals = meals.filter(meal => meal.mid !== mid);
            setMeals(newMeals);
            console.log(`Deleted ${mid}`);
          })
      .catch(err => console.error(err));
  }

  const editMeal = (mid, body) => {
    axios.patch(`${process.env.REACT_APP_SERVER_URI}/api/products/meals/${mid}`, body)
      .then(res => {
          let mealResp = res.data.meal;
          let newMealData = {
            mid: mealResp._id,
            name: mealResp.hebName,
            description: mealResp.description,
            category: mealResp.kosherCategory,
            ingredients: mealResp.ingredients
          };

          let newMeals = meals.filter(meal => meal.mid !== mid);
          newMeals.push(newMealData);
          setMeals(newMeals);

          console.log(`Edited ${mid}`);
        })
      .catch(err => console.error(err));
  }

  const fetchIngredientsData = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/api/products/ingredients`)
    .then(res => {
          let ingredients = [];
          res.data.ingredients.forEach(ingredient => {
            let new_ingredients = {
              iid: ingredient._id,
              name: ingredient.hebName,
              category: ingredient.kosherCategory,
            };
            ingredients.push(new_ingredients);
          });
          setIngredients(ingredients);
          setLoading(false);
        })
    .catch(err => {
          setLoading(false);
          setErrorMessage(true);
          console.log(err);
        });
  };

  const fetchMealsData = () => {
    axios.get(`${process.env.REACT_APP_SERVER_URI}/api/products/meals`)
      .then(res => {
            let meals = [];
            res.data.meals.forEach(meal => {
              let new_meal = {
                mid: meal._id,
                name: meal.hebName,
                category: meal.kosherCategory,
                description: meal.description,
                ingredients: meal.ingredients
              };
              meals.push(new_meal);
            });
            setMeals(meals);
            setLoading(false);
          })
      .catch(err => {
            setLoading(false);
            setErrorMessage(true);
            console.log(err);
          });
  };

  return (
      <div style={{padding: '8px'}}>

        {/* Header */}
        <div style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          direction: 'rtl',
          alignItems: 'baseline'
        }}>
          <div style={{textAlign: 'right'}}>
            <Typography variant="h4">
              {'מנות'}
            </Typography>
          </div>

          <div>
            <Button
                variant="outlined"
                style={{backgroundColor: '#012345', color: 'white'}}
                onClick={handleAddButtonClick}>
              {'הוסף מנות'}
            </Button>
          </div>
        </div>

        {/* Add material dialog */}
        {
          (addDialogOpen) ?
              <AddMealDialog
                  isOpenVar={addDialogOpen}
                  isOpenFuncHandle={setAddDialogOpen}
                  handleAdd={addMeal}
                  ingredients={ingredients}
              />
              : ''
        }

        {/* Body */}
        {
          (loading) ?
              <center>
                <CircularProgress/>
              </center>
              :
              (meals.length > 0) ?
                <div>
                  {
                    meals.map(meal => (
                        <div style={{padding: '4px'}}>
                          <Meal
                              name={meal.name}
                              mealsIngredients={meal.ingredients}
                              allIngredients={ingredients}
                              type={meal.category}
                              mid={meal.mid}
                              handleDeleteClick={deleteMeal}
                              handleEditClicked={editMeal}
                          />
                        </div>
                    ))
                  }
                </div>
                  :
                  (errorMessage) ?
                      <center>
                        <div>
                          Error has been occurred.
                        </div>
                      </center>
                      :
                      <center>
                        <div>
                          No data to fetch.
                        </div>
                      </center>
        }
      </div>
  );
};

export default Meals;

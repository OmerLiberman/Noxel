import React, {useEffect, useState} from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import Material from './Material';
import Grid from '@material-ui/core/Grid';
import Header from '../../components/Header/Header';
import Spinner from '../../components/Spinner/Spinner';
import AddMaterialDialog from './AddMaterialDialog';

const RawMaterials = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);

  useEffect(() => {
    if (ingredients.length === 0) {
      fetchData();
    }
  }, [ingredients]);

  const addIngredient = (body) => {
    axios.post(
        `${process.env.REACT_APP_SERVER_URI}/api/products/ingredients/`, body)
      .then(res => {
          let ingredient = res.data.ingredient;

          setLoading(true);
          let newIngData = {
            iid: ingredient._id,
            name: ingredient.hebName,
            category: ingredient.kosherCategory
          };

          let newIngredients = ingredients.splice(ingredients.length, 0, newIngData);
          setIngredients(newIngredients);

          console.log(`Created ${ingredient._id}`);
          setLoading(false);
        })
    .catch(err => console.error(err));
  }

  const deleteIngredient = (iid) => {
    axios.delete(
        `${process.env.REACT_APP_SERVER_URI}/api/products/ingredients/${iid}`)
      .then(() => {
          let newIngredients = ingredients.filter(ingredient => ingredient.iid !== iid);
          setIngredients(newIngredients);
          console.log(`Deleted ${iid}`);
        })
      .catch(err => console.error(err));
  }

  const editIngredient = (iid, body) => {
    axios.patch(
        `${process.env.REACT_APP_SERVER_URI}/api/products/ingredients/${iid}`, body)
      .then(res => {
          setLoading(true);
          let newIngData = {
            iid: res.data.ingredient._id,
            name: res.data.ingredient.hebName,
            category: res.data.ingredient.kosherCategory
          };

          let newIngredients = ingredients.filter(ingredient => ingredient.iid !== iid);
          newIngredients.push(newIngData);
          setIngredients(newIngredients);

          console.log(`Edited ${iid}`);
          setLoading(false);
        })
      .catch(err => console.error(err));
  }

  const fetchData = () => {
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

  return (
      <div style={{padding: '8px', direction: 'rtl'}}>
        <Header title={'חומרי גלם'} addButtonTitle={'הוסף חומר גלם'} openButtonDialog={setAddDialogOpen}/>

        {
          (addDialogOpen) ?
              <AddMaterialDialog
                  isOpenVar={addDialogOpen}
                  isOpenFuncHandle={setAddDialogOpen}
                  handleAdd={addIngredient}/>
              : ''
        }
        {
          (loading) ?
              <center>
                <CircularProgress/>
              </center>
              :
              (ingredients.length > 0) ?
                  <Grid container direction='row'>
                    {
                      ingredients.map(ingredient => (
                          <Grid item
                                xl={3} lg={3} md={3} sm={6} xs={12}
                                style={{padding: '4px'}}>
                            <Material
                                name={ingredient.name}
                                type={ingredient.category}
                                iid={ingredient.iid}
                                handleDeleteClick={deleteIngredient}
                                handleEditClicked={editIngredient}
                            />
                          </Grid>
                      ))
                    }
                  </Grid>

                  :
                  (errorMessage) ?
                      <center>
                        <div>
                          Error has been occurred.
                        </div>
                      </center>
                      :
                      (loading) ?
                          <Spinner/>
                          :
                          (ingredients.length > 0) ?
                              <Spinner/>
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

export default RawMaterials;

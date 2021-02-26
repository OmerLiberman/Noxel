import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import Spinner from '../../components/Spinner/Spinner';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import FormLabel from '@material-ui/core/FormLabel';
import AllIngredientsCheckbox from './AllIngredientsCheckbox';

const EditMealDialog = ({mid, isOpen, handleEdit, allIngredients, selectedIngredients}) => {
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState(null);

  const handleClose = (event) => {
    event.preventDefault();
    isOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/products/meals/id/${mid}`)
      .then(res => {
        let meal = res.data.meal;
        if (meal) {
          setBody(meal);
          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(`Could not edit ${mid}`)
        console.log(err);
      });
    }

    if (!body) {
      fetchData();
    }
  });

  const getNameOfMeal = (name) => {
    if(name) return name.replace(/-/g, ' ');
  };

  const handleCheckIngredient = (mid) => {
    let currentIngredients = body.ingredients;
    if (currentIngredients) {
      currentIngredients.unshift(mid);
    } else {
      currentIngredients = [mid];
    }

    const newBody = {
      ...body,
      ingredients: currentIngredients
    };

    setBody(newBody);
  }

  const handleUncheckIngredient = (mid) => {
    let currentIngredients = body.ingredients;
    let index = currentIngredients.indexOf(mid);
    currentIngredients = currentIngredients.splice(index, 1);

    const newBody = {
      ...body,
      ingredients: currentIngredients
    };

    setBody(newBody);
  }

  return (
      <Dialog open={true}
              onClose={handleClose}
              style={{direction: 'rtl'}}>
        {
          (!loading) ?
              (body) ?
                  <Card>
                    <CardHeader title={getNameOfMeal(body.hebName)} style={{
                      backgroundColor: '#012345',
                      color: 'white', textAlign: 'center'
                    }}/>

                    <div style={{minWidth: 500}}>
                      <center>
                        <div style={{minWidth: 450, padding: 20, display: 'flex', flexDirection: 'column'}}>
                          <TextField
                              label="שם (עברית)"
                              id="margin-dense"
                              defaultValue={getNameOfMeal(body.hebName)}
                              margin="dense"
                              required
                              onChange={(event) => {
                                const newBody = {
                                  ...body,
                                  hebName: event.target.value
                                }
                                setBody(newBody);
                              }}
                          />

                          <TextField
                              label="שם (אנגלית)"
                              id="margin-dense"
                              defaultValue={getNameOfMeal(body.engName)}
                              margin="dense"
                              onChange={(event) => {
                                const newBody = {
                                  ...body,
                                  engName: event.target.value
                                }
                                setBody(newBody);
                              }}
                          />

                          <FormControl>
                            <InputLabel>{"סוג מנה"}</InputLabel>
                            <Select
                                native
                                value={body.kosherCategory}
                                onChange={(event) => {
                                  const newBody = {
                                    ...body,
                                    kosherCategory: event.target.value
                                  }
                                  setBody(newBody);
                                }}>
                              <option value={'meat'}>בשר</option>
                              <option value={'vegi'}>צמחוני</option>
                              <option value={'parve'}>פרווה</option>
                            </Select>
                          </FormControl>

                          {/* Ingredients selection */}
                          <FormControl>
                            <FormLabel component="legend">בחר רכיבים</FormLabel>

                            <AllIngredientsCheckbox
                                allIngredients={allIngredients}
                                selectedIngredients={selectedIngredients}
                                handleCheckIng={handleCheckIngredient}
                                handleUncheckIng={handleUncheckIngredient}
                            />

                          </FormControl>


                          <TextField
                              label="קוד רכיב"
                              id="margin-dense"
                              defaultValue={body.code}
                              margin="dense"
                              onChange={(event) => {
                                const newBody = {
                                  ...body,
                                  code: event.target.value
                                }
                                setBody(newBody);
                              }}/>


                          <Button onClick={(event) => {
                            event.preventDefault();
                            isOpen(false);
                            handleEdit(mid, body);
                          }}>
                            עדכן
                          </Button>
                          <Button onClick={() => isOpen(false)}>
                            בטל
                          </Button>
                        </div>
                      </center>
                    </div>

                  </Card>
                  : 'Error in fetching data.'
              : <Spinner/>
        }

      </Dialog>
  );
};

export default EditMealDialog;
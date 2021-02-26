import React, {useEffect, useState} from 'react';
import axios from 'axios';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import Spinner from '../../components/Spinner/Spinner';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import FormLabel from '@material-ui/core/FormLabel';
import AllMealsCheckbox from './AllMealsCheckbox';

const EditMenuDialog = ({mid, isOpen, handleEdit, allMeals, selectedMeals}) => {
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState(null);

  const handleClose = (event) => {
    event.preventDefault();
    isOpen(false);
  };

  useEffect(() => {
    const asyncCall = async () => {
      if (!body) {
        await fetchData();
      }
    }
    asyncCall();
  });

  const getNameOfMeal = (name) => {
    if (name) return name.replace(/-/g, ' ');
  };

  const fetchData = async () => {
    axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/products/menus/id/${mid}`)
      .then(res => {
          let menu = res.data.menu;
          if (menu) {
            setBody(menu);
            setLoading(false);
          }
        })
    .catch(err => {
          setLoading(false);
          console.error(`Could not edit ${mid}`)
          console.log(err);
        });
  };

  const handleCheckMeal = (mid) => {
    let currentMeals = body.meals;
    if (currentMeals) {
      currentMeals.unshift(mid);
    } else {
      currentMeals = [mid];
    }

    const newBody = {
      ...body,
      meal: currentMeals
    };

    setBody(newBody);
  }

  const handleUncheckMeal = (mid) => {
    let currentMeals = body.meals;
    let index = currentMeals.indexOf(mid);
    currentMeals = currentMeals.splice(index, 1);

    const newBody = {
      ...body,
      meals: currentMeals
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

                          {/* meals selection */}
                          <FormControl>
                            <FormLabel component="legend">בחר מנות</FormLabel>

                            <AllMealsCheckbox
                                allMeals={allMeals}
                                selectedMeals={selectedMeals}
                                handleCheckIng={handleCheckMeal}
                                handleUncheckIng={handleUncheckMeal}
                            />

                          </FormControl>


                          <TextField
                              label="קוד תפריט"
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

export default EditMenuDialog;
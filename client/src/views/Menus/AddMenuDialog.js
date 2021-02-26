import React, {useState} from 'react';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import {CardHeader} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';

import AllMealsCheckbox from './AllMealsCheckbox';

const AddMealDialog = ({isOpenVar, isOpenFuncHandle, handleAdd, meals}) => {
  const [body, setBody] = useState({});

  const handleClose = (event) => {
    event.preventDefault();
    isOpenFuncHandle(false);
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
      meals: currentMeals
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
      <Dialog open={isOpenVar}
              onClose={handleClose}
              style={{direction: 'rtl', minWidth: 400}}>

        <Card>
          <CardHeader title={'הוספת תפריט'} style={{
            backgroundColor: '#012345',
            color: 'white', textAlign: 'center'
          }}/>

          <div style={{
            minWidth: 500,
          }}>
            <center>
            <div style={{minWidth: 450, padding: 20, display: 'flex',
              flexDirection: 'column'}}>
            <TextField
                label="שם (עברית)"
                id="margin-dense"
                margin="dense"
                required
                onChange={(event) => {
                  const newBody = {
                    ...body,
                    hebName: event.target.value,
                  };
                  setBody(newBody);
                }}
            />

            <TextField
                label="שם (אנגלית)"
                id="margin-dense"
                margin="dense"
                onChange={(event) => {
                  const newBody = {
                    ...body,
                    engName: event.target.value,
                  };
                  setBody(newBody);
                }}
            />

            {/*<FormControl>*/}
            {/*  <InputLabel>{'סוג מנה'}</InputLabel>*/}
            {/*  <Select*/}
            {/*      native*/}
            {/*      onChange={(event) => {*/}
            {/*        const newBody = {*/}
            {/*          ...body,*/}
            {/*          kosherCategory: event.target.value,*/}
            {/*        };*/}
            {/*        setBody(newBody);*/}
            {/*      }}>*/}
            {/*    <option value={'meat'}>בשר</option>*/}
            {/*    <option value={'vegi'}>צמחוני</option>*/}
            {/*    <option value={'parve'}>פרווה</option>*/}
            {/*  </Select>*/}
            {/*</FormControl>*/}

            {/* Ingredients selection */}
            <FormControl>
              <FormLabel component="legend">בחר מנות</FormLabel>

              <AllMealsCheckbox
                  allMeals={meals}
                  handleCheckIng={handleCheckMeal}
                  handleUncheckIng={handleUncheckMeal}
              />

            </FormControl>

            <TextField
                label="קוד רכיב"
                id="margin-dense"
                margin="dense"
                onChange={(event) => {
                  const newBody = {
                    ...body,
                    code: event.target.value,
                  };
                  setBody(newBody);
                }}/>

            <Button onClick={(event) => {
              event.preventDefault();
              isOpenFuncHandle(false);
              handleAdd(body);
            }}>
              צור מנה
            </Button>
            <Button onClick={() => isOpenFuncHandle(false)}>
              סגור
            </Button>
            </div>
            </center>
          </div>
        </Card>

      </Dialog>
  );
};

export default AddMealDialog;
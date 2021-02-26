import React, {useEffect, useState, Fragment} from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Spinner from '../../components/Spinner/Spinner';


const EditMaterialDialog = ({iid, isOpen, handleEdit}) => {
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState(null);

  const handleClose = (event) => {
    event.preventDefault();
    isOpen(false);
  };

  useEffect( () => {
    const asyncCall = async () => {
      if (!body) {
        await fetchData();
      }
    }
    asyncCall();
  });

  const getNameOfMeal = (name) => {
    return name.replace(/-/g, ' ');
  };

  const fetchData = async () => {
    axios.get(
        `${process.env.REACT_APP_SERVER_URI}/api/products/ingredients/id/${iid}`).then(res => {
          let ingredient = res.data.ingredient;
          if (ingredient) {
            setBody(ingredient);
            setLoading(true);

            if (!ingredient.code) body.code = '';
            if (!ingredient.hebName) body.hebName = '';
            if (!ingredient.engName) body.engName = '';
            if (!ingredient.kosherCategory) body.kosherCategory = '';

            setLoading(false);
          }
        }).catch(err => {
          setLoading(false);
          console.error(`Could not edit ${iid}`)
          console.log(err);
        });
  };

  return (
      <Dialog open={true}
              onClose={handleClose}
              style={{direction: 'rtl'}}>
        {
          (!loading) ?
              (body) ?
                <Fragment style={{direction: 'rtl', minWidth: '400px'}}>
                  <DialogTitle>
                    <center><b>{getNameOfMeal(body.hebName)} </b></center>
                  </DialogTitle>
                   <Fragment>
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
                        handleEdit(iid, body);
                      }}>
                        עדכן
                      </Button>
                      <Button onClick={() => isOpen(false)}>
                        בטל
                      </Button>
                    </Fragment>
                </Fragment>
                  : 'Error in fetching data.'
              : <Spinner/>
        }

      </Dialog>
  );
};

export default EditMaterialDialog;
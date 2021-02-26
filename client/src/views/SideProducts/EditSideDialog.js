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


const EditSideDialog = ({sid, isOpen, handleEdit}) => {
  const [loading, setLoading] = useState(true);
  const [body, setBody] = useState(null);

  const handleClose = (event) => {
    event.preventDefault();
    isOpen(false);
  };

  useEffect(() => {
    async function fetchData() {
      axios.get(
          `${process.env.REACT_APP_SERVER_URI}/api/products/sides/id/${sid}`)
      .then(res => {
        let side = res.data.side;
        if (side) {
          setBody(side);
          setLoading(true);

          if (!side.code) body.code = '';
          if (!side.hebName) body.hebName = '';
          if (!side.engName) body.engName = '';
          if (!side.category) body.category = '';

          setLoading(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.error(`Could not edit ${sid}`)
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
                        <InputLabel>{"סוג תוספת"}</InputLabel>
                        <Select
                            native
                            value={body.category}
                            onChange={(event) => {
                              const newBody = {
                                ...body,
                                category: event.target.value
                              }
                              setBody(newBody);
                            }}>
                          <option value={'salad'}>סלט/ירקות חתוכים</option>
                          <option value={'spread'}>ממרחים</option>
                          <option value={'plastic'}>פלסטיקים</option>
                          <option value={'bread'}>לחם</option>
                        </Select>
                      </FormControl>

                      <TextField
                          label="קוד"
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
                        handleEdit(sid, body);
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

export default EditSideDialog;
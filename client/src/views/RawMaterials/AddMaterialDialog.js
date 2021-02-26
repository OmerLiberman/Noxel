import React, {useState} from 'react';

// Material UI
import Dialog from '@material-ui/core/Dialog';
import {CardHeader} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const AddMaterialDialog = ({isOpenVar, isOpenFuncHandle, handleAdd}) => {
  const [body, setBody] = useState({});

  const handleClose = (event) => {
    event.preventDefault();
    isOpenFuncHandle(false);
  };

  return (
      <Dialog open={isOpenVar}
              onClose={handleClose}
              style={{direction: 'rtl', minWidth: 400}}>

        <Card>
          <CardHeader title={'הוספת חומר גלם'} style={{
            backgroundColor: '#012345',
            color: 'white', textAlign: 'center'
          }}/>

          <div style={{
            width: 300,
          }}>
            <center>
            <div style={{width: 250, padding: 20, display: 'flex',
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

            <FormControl>
              <InputLabel>{'סוג רכיב'}</InputLabel>
              <Select
                  native
                  onChange={(event) => {
                    const newBody = {
                      ...body,
                      kosherCategory: event.target.value,
                    };
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
              צור רכיב
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

export default AddMaterialDialog;
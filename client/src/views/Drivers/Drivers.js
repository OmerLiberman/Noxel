import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Drivers = () => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [drivers, setDrivers] = useState([]);
  const [classrooms, setClassrooms] = useState([]);

  useEffect(() => {
        const asyncCall = async () => {
          const p1 = new Promise(async (resolve, reject) => {
            await axios.get(
                `${process.env.REACT_APP_SERVER_URI}/api/users/drivers/`).then(r => {
                  setDrivers(r.data.drivers);
                  resolve();
                }).catch(err => reject());
          });

          const p2 = new Promise(async (resolve, reject) => {
            await axios.get(
                `${process.env.REACT_APP_SERVER_URI}/api/clients/classrooms/names`).then(r => {
                  setClassrooms(r.data);
                  resolve();
                }).catch(err => reject());
          });

          Promise.allSettled([p1, p2]).then(r => setLoading(false));
        };
        asyncCall();
      }
      , []);

  // const handleOnClick = (event) => {
  //   event.preventDefault();
  //   props.openButtonDialog(true);
  // }

  return (
      <Grid>

        <Grid container style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          direction: 'rtl',
          alignItems: 'baseline'
        }}>
          <div style={{textAlign: 'right'}}>
            <Typography variant="h4">
              {"נהגים"}
            </Typography>
          </div>

          <div>
            <Button
                variant="outlined"
                style={{backgroundColor: '#012345', color: 'white'}}
                onClick={() => console.log("Handle add")}>
              {"הוסף נהג"}
            </Button>
          </div>
        </Grid>

        {
          loading ?
              <Spinner/>
              :
              <div>{' '}</div>
        }
      </Grid>
  );
};

export default Drivers;




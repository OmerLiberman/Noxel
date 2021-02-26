import React, {useEffect, useState} from 'react';

import axios from 'axios';

import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {CardHeader} from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BlockIcon from '@material-ui/icons/Block';

import Spinner from '../../../components/Spinner/Spinner';

import {getBackgroundColor, textColor} from '../../../utils/colors';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 320
  },
  title: {
    fontSize: 14,
  },
  pos: {
    textAlign: 'right',
    marginBottom: 12,
  },
});

const RequestCard = () => {
  const classes = useStyles();

  const [allChanges, setAllChanges] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const asyncCall = async () => {
      await fetchAllChanges();
    }
    asyncCall();
  }, []);

  const fetchAllChanges = async () => {
    await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/changes`).then(res => {
          setAllChanges(res.data.changes);
          if (res.data.changes.length === 0) {
            setMessage('No changes were found.');
          }
        }).catch(err => {
          setMessage('An error has been occurred.');
          console.error(err.message);
        });
  };

  const getIcon = (change) => {
    return change.handled ?
        <div style={{color: 'green'}}><CheckCircleIcon/></div>
        :
        change.status === 'nothandled' ?
            <div style={{color: 'orange'}}><HighlightOffIcon/></div>
            :
            <div style={{color: 'red'}}><BlockIcon/></div>;
  };

  return (
      <div style={{padding: '10px', minHeight: 330}}>
        <Card className={classes.root}>
          <CardHeader title={<b>{'בקשות אחרונות'}</b>}
                      component='div'
                      style={{
                        backgroundColor: getBackgroundColor(''),
                        color: textColor,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}/>

          <CardContent>
            {
              allChanges ?
                  <div>
                    {
                      allChanges.map((change, key) =>
                          <div style={{padding: '4px'}}>
                            <ListItem>
                              {getIcon(change)} {' '}{' '}
                              <ListItemText primary={
                                <div style={{textAlign: 'right'}}>
                                  <b> name of change </b>
                                </div>
                              }/>
                            </ListItem>

                          </div>,
                      )
                    }
                  </div>
                  :
                  <div>
                    here
                    {
                      message ?
                          <div> לא נמצאו בקשות או שינוים. </div>
                          :
                          <div>
                            <center><Spinner/></center>
                          </div>
                    }
                  </div>
            }
          </CardContent>
          <CardActions style={{justifyContent: 'center'}}>
            <Button size="small">ראה עוד</Button>
          </CardActions>
        </Card>
      </div>

  );
};

export default RequestCard;

import React, {useEffect, useState} from 'react';

import axios from 'axios';
import Change from './Components/Change';
import Typography from '@material-ui/core/Typography';
import Spinner from '../../components/Spinner/Spinner';

export const Changes = () => {
  const [allChanges, setAllChanges] = useState(null);
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

  return <div>
    <div style={{textAlign: 'right'}}>
      <Typography variant="h4">
        {'בקשות ושינוים'}
      </Typography>
    </div>
    <div>
      {
        allChanges ?
            <div>
              {
                allChanges.map(change =>
                    <div style={{padding: '4px'}}>
                      <Change
                          changeId={change._id}
                          status={change.status}
                          changeType={change.changeType}
                          description={change.description}
                      />
                  </div>
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
                  <div> <center> <Spinner/> </center> </div>
            }
          </div>
      }
    </div>

  </div>;
};
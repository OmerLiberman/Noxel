import React from 'react';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Header = () => {
  return (
      <div style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        direction: 'rtl',
        alignItems: 'baseline'
      }}>
        <div style={{textAlign: 'right'}}>
          <Typography variant="h4">
            {'לקוחות'}
          </Typography>
        </div>

        <div>
          <Button variant="outlined" style={{backgroundColor: '#3f51b5', color: 'white'}}>
            {'הוסף לקוח'}
          </Button>
        </div>
      </div>

  );
};

export default Header;
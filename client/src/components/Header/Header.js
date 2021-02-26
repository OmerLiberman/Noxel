import React from 'react';
import {Typography} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const Header = (props) => {

  const handleOnClick = (event) => {
    event.preventDefault();
    props.openButtonDialog(true);
  }

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
            {props.title}
          </Typography>
        </div>

        <div>
          <Button
              variant="outlined"
              style={{backgroundColor: '#012345', color: 'white'}}
              onClick={handleOnClick}>
            {props.addButtonTitle}
          </Button>
        </div>
      </div>

  );
};

export default Header;
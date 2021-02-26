import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import {ExitToApp} from '@material-ui/icons';

const ExitButton = props => {
  return (
    <div style={{alignSelf: 'flex-start'}}>
      <IconButton
          color="inherit"
          aria-label="open drawer">
        <ExitToApp/>
      </IconButton>
    </div>
  );
};

export default ExitButton;
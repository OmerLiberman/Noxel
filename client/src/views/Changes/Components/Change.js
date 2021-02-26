import React, {useState} from 'react';

// Material UI
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {Button} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import BlockIcon from '@material-ui/icons/Block';

import {changeColor} from '../../../utils/colors';

// Style
// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: '100%',
//     maxWidth: 360,
//     backgroundColor: theme.palette.background.paper,
//   },
//   nested: {
//     paddingLeft: theme.spacing(4),
//   },
// }));

const Change = ({changeId, handled, status, changeType, description,
                  classroomName, newMenu, oneTimeMenu, createdAt,
                  handleDeleteClick, handleResolveClick, handleBlockClick}) => {
  // const classes = useStyles();

  const [open, setOpen] = useState(false);

  const icon = handled ?
      <div style={{color: 'green'}}> <CheckCircleIcon/> </div>
      :
      status === 'nothandled' ?
      <div style={{color: 'orange'}}> <HighlightOffIcon/> </div>
          :
          <div style={{color: 'red'}}> <BlockIcon/> </div>

  const handleClick = () => {
    setOpen(!open);
  };

  // const replaceName = (name) => {
  //   if (name) return name.replace(/-/g, ' ');
  // };

  const handleClickOnDelete = (event) => {
    event.preventDefault();
    handleDeleteClick(changeId);
  };

  return (
      <div style={{
        direction: 'rtl',
        borderRadius: '10px',
        background: changeColor,
      }}>
        <ListItem button onClick={handleClick}>

          {icon} {' '}{' '}

          <ListItemText primary={
            <div style={{textAlign: 'right'}}>
              <b> name of change </b>
            </div>
          }/>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>

          <List component="div" disablePadding>

            <ListItem> סטטוס:
              {
                handled ?
                    'טופל'
                    :
                    'לא טופל'
              }
            </ListItem>

            <ListItem> סוג שינוי:
              {changeType}
            </ListItem>

            <ListItem> תיאור:
              {description}
            </ListItem>

          </List>

          <div style={{display: 'flex', flexDirection: 'row', direction: 'ltr'}}>
            <Tooltip title="מחק תפריט">
              <Button>
                <DeleteIcon onClick={handleClickOnDelete}/>
              </Button>
            </Tooltip>
            <Tooltip title="בקשה טופלה">
              <Button>
                <CheckCircleIcon onClick={handleResolveClick}/>
              </Button>
            </Tooltip>
            <Tooltip title="בקשה נדחתה">
              <Button>
                <BlockIcon onClick={handleBlockClick}/>
              </Button>
            </Tooltip>
          </div>

        </Collapse>
      </div>
  );
};

export default Change;

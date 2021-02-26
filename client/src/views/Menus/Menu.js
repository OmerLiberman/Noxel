import React, {useState} from 'react';

// Material UI
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {Button, makeStyles} from '@material-ui/core';
import {ExpandLess, ExpandMore} from '@material-ui/icons';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

// Iconify
import {Icon} from '@iconify/react';
import silverwareForkKnife from '@iconify-icons/mdi/silverware-fork-knife';
import EditMenuDialog from './EditMenuDialog';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Menu = ({name, description, mid, menusMeals = [],
                allMeals = [], handleDeleteClick, handleEditClicked}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);


  const handleClick = () => {
    setOpen(!open);
  };

  const replaceName = (name) => {
    if (name) return name.replace(/-/g, ' ');
  };

  const handleClickOnEdit = (event) => {
    event.preventDefault();
    setEditDialogOpen(true);
  };

  const handleClickOnDelete = (event) => {
    event.preventDefault();
    handleDeleteClick(mid);
  };

  return (
      <div style={{
        direction: 'rtl',
        borderRadius: '10px',
        background: '#C39BD3',
      }}>

        {
          (editDialogOpen) ?
              <EditMenuDialog
                  mid={mid}
                  isOpen={setEditDialogOpen}
                  handleEdit={handleEditClicked}
                  allMeals={allMeals}
                  selectedMeals={menusMeals}
              />
              : ''
        }

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <Icon icon={silverwareForkKnife}/>
          </ListItemIcon>

          <ListItemText primary={
            <div style={{textAlign: 'right'}}>
              <b> {replaceName(name)} </b>
            </div>
          }/>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              (menusMeals.length > 0) ?
                  <div>
                    <div style={{direction: 'rtl', paddingRight: 8}}>
                      <h4> מנות בתפריט</h4>
                    </div>
                    {
                      menusMeals.map(meal => {
                        return (
                            <ListItem button className={classes.nested}>
                              <ListItemIcon>
                                <PlayArrowRoundedIcon/>
                              </ListItemIcon>
                              <ListItemText primary={
                                <div style={{textAlign: 'right'}}>
                                  {replaceName(meal.hebName)}
                                </div>}/>
                            </ListItem>
                        );
                      })
                    }
                    <div style={{direction: 'rtl', paddingRight: 8}}>
                      <h4>תיאור התפריט</h4>
                      {
                        (description && description.length > 0) ?
                            <div> {description} </div>
                            :
                            <div>לא הוגדר תיאור לתפריט זה.</div>
                      }
                    </div>
                  </div>

                  : <div> לא הוגדרו מנות עבור תפריט זה. </div>
            }
          </List>
          <div
              style={{display: 'flex', flexDirection: 'row', direction: 'ltr'}}>
            <Tooltip title="ערוך תפריט">
              <Button>
                <EditIcon
                    onClick={handleClickOnEdit}/>
              </Button>
            </Tooltip>
            <Tooltip title="מחק תפריט">
              <Button>
                <DeleteIcon onClick={handleClickOnDelete}/>
              </Button>
            </Tooltip>
          </div>
        </Collapse>
      </div>
  );
};

export default Menu;
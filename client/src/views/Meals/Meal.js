import React, {useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import {Button, makeStyles} from '@material-ui/core';
import {
  ExpandLess,
  ExpandMore,
} from '@material-ui/icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faHamburger,
  faLeaf,
  faBreadSlice,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import PlayArrowRoundedIcon from '@material-ui/icons/PlayArrowRounded';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditMealDialog from './EditMealDialog';

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

const Meal = ({name, mealsIngredients = [], allIngredients = [], type,
                mid, handleDeleteClick, handleEditClicked}) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const getBackgroundColor = (type) => {
    switch (type) {
      case 'meat':
        return '#F1948A';
      case 'vegi':
        return '#ABEBC6';
      case 'parve':
        return '#F8C471';
      default:
        return '#AED6F1';
    }
  }

  const getNameOfMeal = (name) => {
    if(name) return name.replace(/-/g, ' ');
  }

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
        background: getBackgroundColor(type),
      }}>

        {
          (editDialogOpen) ?
              <EditMealDialog
                  mid={mid}
                  isOpen={setEditDialogOpen}
                  handleEdit={handleEditClicked}
                  allIngredients={allIngredients}
                  selectedIngredients={mealsIngredients}
              />
              : ''
        }

        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            {
              (type === 'meat') ?
                  <FontAwesomeIcon icon={faHamburger}/>
                  :
                  (type === 'vegi') ?
                      <FontAwesomeIcon icon={faLeaf}/>
                      :
                      (type === 'parve') ?
                          <FontAwesomeIcon icon={faBreadSlice}/>
                          :
                          <FontAwesomeIcon icon={faQuestion}/>
            }
          </ListItemIcon>

          <ListItemText primary={
            <div style={{textAlign: 'right'}}>
              <b> {getNameOfMeal(name)} </b>
            </div>
          }/>
          {open ? <ExpandLess/> : <ExpandMore/>}
        </ListItem>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {
              (mealsIngredients.length > 0) ?
                  mealsIngredients.map(ingredient => {
                    return (
                        <ListItem button className={classes.nested}>
                          <ListItemIcon>
                            <PlayArrowRoundedIcon/>
                          </ListItemIcon>
                          <ListItemText primary={
                            <div style={{textAlign: 'right'}}>
                            {getNameOfMeal(ingredient.hebName)}
                          </div>}/>
                        </ListItem>
                    );
                  })

                  : <div> טרם הוגדרו רכיבים עבור מנה זו. </div>
            }
          </List>
          <div style={{display: 'flex', flexDirection: 'row', direction: 'ltr'}}>
            <Tooltip title="ערוך מנה">
              <Button>
                <EditIcon
                    onClick={handleClickOnEdit}/>
              </Button>
            </Tooltip>
            <Tooltip title="מחק מנה">
              <Button>
                <DeleteIcon onClick={handleClickOnDelete}/>
              </Button>
            </Tooltip>
          </div>
        </Collapse>
      </div>
  );
};

export default Meal;
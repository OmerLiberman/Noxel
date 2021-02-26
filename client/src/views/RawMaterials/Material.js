import React, {useState} from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
  faBreadSlice,
  faHamburger,
  faLeaf, faQuestion,
} from '@fortawesome/free-solid-svg-icons';

import Tooltip from '@material-ui/core/Tooltip';
import {IconButton} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import EditMaterialDialog from './EditMaterialDialog';

const Material = ({name, type, iid, handleDeleteClick, handleEditClicked}) => {
  const [editDialogOpen, setEditDialogOpen] = useState(false);

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
  };

  const getNameOfMeal = (name) => {
    if (name) return name.replace(/-/g, ' ');
  };

  const handleClickOnEdit = (event) => {
    event.preventDefault();
    setEditDialogOpen(true);
  };

  const handleClickOnDelete = (event) => {
    event.preventDefault();
    handleDeleteClick(iid);
  };

  return (
      <div style={{
        direction: 'rtl',
        borderRadius: '10px',
        background: getBackgroundColor(type),
      }}>

        {
          (editDialogOpen) ?
              <EditMaterialDialog
                  iid={iid}
                  isOpen={setEditDialogOpen}
                  handleEdit={handleEditClicked}/>

              : ''
        }

        <div>
          <Icon style={{padding: 4}}>
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
          </Icon>

          <div>
            <center><b> {getNameOfMeal(name)} </b></center>
          </div>

          <div style={{
            display: 'flex', flexDirection: 'row',
            direction: 'ltr',
          }}>
            <Tooltip title="ערוך רכיב">
              <IconButton sizeSmall>
                <EditIcon fontSize='small'
                          onClick={handleClickOnEdit}/>
              </IconButton>
            </Tooltip>
            <Tooltip title="מחק רכיב">
              <IconButton sizeSmall>
                <DeleteIcon fontSize='small'
                            onClick={handleClickOnDelete}/>
              </IconButton>
            </Tooltip>
          </div>

        </div>
      </div>
  );
};

export default Material;
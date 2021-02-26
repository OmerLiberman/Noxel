import React from 'react';
import MaterialTable from 'material-table';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import {Button} from '@material-ui/core';
import Header from '../../components/Header/Header';

const USERS = [
  {
    username: 'dor.guetta',
    password: '12345',
    name: 'דור גואטה',
    email: 'dor@menzale.com',
    frames: [],
    isAdmin: true,
    isPayer: false,
    isSchoolManager: false,
    isClassroomManager: false,
  },
  {
    username: 'saar.guetta',
    password: '12345',
    name: 'סער גואטה',
    email: 'saar@menzale',
    frames: [],
    isAdmin: true,
    isPayer: false,
    isSchoolManager: false,
    isClassroomManager: false,
  },
  {
    username: 'shola.shola',
    password: '12345',
    name: 'שולה שולה',
    email: 'shola@teva.com',
    frames: [],
    isAdmin: false,
    isPayer: false,
    isSchoolManager: true,
    isClassroomManager: false,
  },
  {
    username: 'omer.liberman',
    password: '12345',
    name: 'עומר ליברמן',
    email: 'liberman.omer1@gmail.com',
    frames: [],
    isAdmin: true,
    isPayer: false,
    isSchoolManager: false,
    isClassroomManager: false,
  },
];

const Users = props => {
  //const [userClicked, setUserClicked] = useState({});

  const handleClickOnEdit = (event) => {
    console.log('Edit is clicked.');
  };

  const handleClickOnDelete = (event) => {
    console.log('Delete is clicked.');
  };

  const handleFramesClick = (user) => {
    console.log('Show frames is clicked');
    console.log(user.username);
  };

  return (
      <div>
        <Header title={'משתמשים'} addButtonTitle={'הוסף משתמש'}/>

        <MaterialTable
            columns={[
              {
                title: 'אפשרויות',
                render: (user) => {
                  return (
                      <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Tooltip title="ערוך משתמש">
                          <Button>
                            <EditIcon
                                onClick={handleClickOnEdit}/>
                          </Button>
                        </Tooltip>
                        <Tooltip title="מחק משתמש">
                          <Button>
                            <DeleteIcon onClick={handleClickOnDelete}/>
                          </Button>
                        </Tooltip>
                      </div>
                  );
                },
              },

              {
                title: 'תפקיד', render: (user) => {
                  if (user.isAdmin) {
                    return 'מנהל מערכת';
                  } else if (user.isPayer) {
                    return 'משלם';
                  } else if (user.isSchoolManager) {
                    return 'מנהל בית ספר';
                  } else if (user.isClassroomManager) {
                    return 'מנהל כיתה';
                  }
                },
              },

              {
                title: 'מסגרות', render: (user) => {
                  return (
                      <Tooltip title="לחץ לראות מסגרות">
                        <Button onClick={handleFramesClick}>
                          <u> ראה פירוט</u>
                        </Button>
                      </Tooltip>
                  );
                },
              },

              {title: 'email', field: 'email'},

              {title: 'שם מלא', field: 'name'},

              {title: 'סיסמא', field: 'password'},

              {title: 'שם משתמש', field: 'username'},

            ]}
            data={USERS}
            title={false}
            options={{
              actionsColumnIndex: 1,
              cellStyle: {textAlign:'center'},
              headerStyle: {textAlign:'center'}
            }}
            components={{
              Toolbar: ({showTitle}) => '',
            }}
        />
      </div>
  );
};

export default Users;
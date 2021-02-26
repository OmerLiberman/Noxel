import React from 'react';
import List from '@material-ui/core/List';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
  button: {
    width: '100%',
    color: 'white',
    textDecoration: 'none',
    position: 'center',
    padding: '7px'
  },
}));

const routes = [
  {key: 'ראשי', route: '/dashboard'},
  {key: 'חומרי גלם', route: '/raw-materials'},
  {key: 'מנות', route: '/meals'},
  {key: 'תפריטים', route: '/menus'},
  {key: 'מזון קר ותוספות', route: '/side-products'},
  {key: 'גנים וכיתות', route: '/clients/classrooms'},
  {key: 'בתי ספר', route: '/clients/schools'},
  {key: 'משלמים', route: '/clients/payers'},
  // {key: 'נהגים', route: '/drivers'},
  {key: 'שינוים ובקשות', route: '/changes'},
  {key: 'דוחות', route: '/reports'},
]


const Links = () => {
  const classes = useStyles();

  return (
      <List style={{direction: 'rtl'}}>
        <center>
          {
            routes.map((routeData, index) => {
              return <ListItem>
                <Button
                    className={classes.button}
                    href={routeData.route}
                >
                  {routeData.key}
                </Button>
              </ListItem>
            })
          }
        </center>

      </List>
  );
};

export default Links;
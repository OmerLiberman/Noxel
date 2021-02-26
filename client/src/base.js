import React, {useState} from 'react';

import CssBaseline from '@material-ui/core/CssBaseline';
import clsx from 'clsx';
import TopBar from './components/TopBar/TopBar';
import {BrowserRouter as Router} from 'react-router-dom';
import {Routes} from './routing/Routes';
import SideBar from './components/SideBar/SideBar';
import useTheme from '@material-ui/core/styles/useTheme';
import makeStyles from '@material-ui/core/styles/makeStyles';

require('dotenv').config();

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));


export const AppBase = () => {
  const classes = useStyles();
  const theme = useTheme();

  /**
   * Drawer handling.
   */
  const [open, setOpen] = useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
      <div className={classes.root}>
        <CssBaseline/>

        <main className={clsx(classes.content, {[classes.contentShift]: open})}>
          <div className={classes.drawerHeader}/>

          <TopBar open={open} handleDrawerOpen={handleDrawerOpen}/>

          <Router>
            <Routes/>
          </Router>

        </main>

        <SideBar open={open} handleDrawerClose={handleDrawerClose} theme={theme}/>
      </div>
  );
};
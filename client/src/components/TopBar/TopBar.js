import React from 'react';
import clsx from 'clsx';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
//import ExitButton from '../Buttons/ExitButton';
//import Search from '../Search/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
//import {ExitToApp} from '@material-ui/icons';
//import NotificationsIcon from '@material-ui/icons/Notifications';
//import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Tooltip from '@material-ui/core/Tooltip';
//import {BrowserRouter as Router} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import WhiteLogo from '../../assets/images/logos/white.png';

import {logout} from '../../redux/actions/auth';

const drawerWidth = 150;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    backgroundColor: '#012345',
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

const TopBar = ({
                  auth: {isAuthenticated},
                  logout,
                  open,
                  handleDrawerOpen,
                }) => {
  const classes = useStyles();

  return (
      <AppBar
          position="fixed"
          className={clsx(classes.appBar, {[classes.appBarShift]: isAuthenticated ? open : false})}>
        <Toolbar>
          {
            !isAuthenticated ?
            ''
            :
            <Grid container alignItems='center' style={{
              display: 'flex', flexDirection: 'row', width: '100%',
              direction: 'rtl', justifyContent: 'space-between',
            }}>
              <Grid item>
                <Tooltip title="תפריט">
                  <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      edge="end"
                      onClick={handleDrawerOpen}
                      className={clsx(open)}>
                    <MenuIcon/>
                  </IconButton>
                </Tooltip>
              </Grid>

              <Grid item/>

              <Grid item/>
            </Grid>
          }
        </Toolbar>
      </AppBar>
  );
};

TopBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(TopBar);
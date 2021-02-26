import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {makeStyles} from '@material-ui/core/styles';
import Links from './Links';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ExitToApp} from '@material-ui/icons';
import Grid from '@material-ui/core/Grid';

const drawerWidth = 200;

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
    backgroundColor: '#012345',
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

const SideBar = ({
                   theme,
                   open,
                   handleDrawerClose,
                   auth: {isAuthenticated},
                 }) => {
  const classes = useStyles();
  return (
      <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={isAuthenticated ? open : false}
          classes={{
            paper: classes.drawerPaper,
          }}>
        <div className={classes.drawerHeader}>
          <Tooltip title={'סגור'}>
            <IconButton onClick={handleDrawerClose} style={{color: 'white'}}>
              {theme.direction === 'rtl' ?
                  <ChevronLeftIcon/> :
                  <ChevronRightIcon/>}
            </IconButton>
          </Tooltip>
        </div>

        <Divider light/>

        <Grid container direction='column' justify='space-between'
              style={{height: '100%'}}>

          <Grid item>
            <Links/>
          </Grid>

          <Grid container justify='center' style={{color: 'white'}}>
            <Grid item>
              <Tooltip title="יציאה">
                <IconButton
                    style={{position: 'center'}}
                    color="inherit"
                    edge='start'>
                  <ExitToApp/>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>

        </Grid>
      </Drawer>
  );
};

SideBar.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(SideBar);
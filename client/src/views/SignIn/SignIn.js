import React, {useState} from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

import WhiteLogo from '../../assets/images/logos/white.png';

import {connect} from 'react-redux';

import PropTypes from 'prop-types';

import {login} from '../../redux/actions/auth';
import {Redirect} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '80%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({login, isAuthenticated, loading, validCredentials}) => {
  const classes = useStyles();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSignIn = async (event) => {
    event.preventDefault();
    await login(username, password);
  }

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }

  return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline/>

        <Grid item xs={false} sm={false} md={4} style={{background: '#012345'}}>
          <div className={classes.paper}>
              <img src={WhiteLogo} alt={''} width="300" height="200"/>
          </div>
        </Grid>

        <Grid item xs={12} sm={12} md={8} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    onChange={(event) => {
                      setUsername(event.target.value)
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(event.target.value)
                    }}
                />
                {/*<FormControlLabel*/}
                {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                {/*    label="Remember me"*/}
                {/*/>*/}
                <Button
                    //type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={(event) => onSignIn(event)}
                >
                  Sign In
                </Button>
              </form>
              {
                !validCredentials ?
                  <div>
                    {"Incorrect username or password."}
                  </div>
                    :
                    ''
              }
            </div>
        </Grid>
      </Grid>
  );
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  loading: PropTypes.bool,
  validCredentials: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
  validCredentials: state.auth.validCredentials
});

export default connect(mapStateToProps, { login })(SignIn);
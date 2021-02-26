import {
  USER_LOADED, AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from './types';

import axios from 'axios';

export const loadUser = () => async dispatch => {
  await axios.get(`${process.env.REACT_APP_SERVER_URI}/api/auth`, {
    headers: {
      'x-auth-token': localStorage.getItem('token')
    }
  })
  .then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  }).catch(err => {
    console.log(err.message);
    dispatch({
      type: AUTH_ERROR,
    });
  });
};

export const login = (username, password) => async dispatch => {
  const requestBody = {username, password};

  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_URI}/api/auth`,
        requestBody);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    console.error(err.response.data.errors);
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => {
  return {type: LOGOUT};
};


import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  LOGOUT, AUTH_ERROR,
} from '../actions/types';
import {act} from '@testing-library/react';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  validCredentials: true
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        validCredentials: true
      };
    case LOGIN_FAIL:
      return {
        ...state,
        ...action.payload,
        isAuthenticated: false,
        loading: false,
        validCredentials: false
      };
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        validCredentials: true
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        loading: false,
        user: null,
        validCredentials: true
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        token: null,
      }
    default:
      return state;
  }
};
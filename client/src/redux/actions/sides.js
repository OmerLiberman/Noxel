import {
  FETCH_TODAY_SIDES,
  FETCH_WEEKLY_SIDES,
} from './types';

import axios from 'axios';

import {numberToDay} from '../../utils/time';


export const fetchTodaySides = () => dispatch => {
  const dateObject = new Date();
  const dayInWeek = numberToDay(dateObject.getDay());

  const route = `${process.env.REACT_APP_SERVER_URI}/api/reports/day/${dayInWeek}/sides`;

  axios.get(route).then(res => {
    dispatch({
      type: FETCH_TODAY_SIDES,
      payload: res.data.dailyReport
    });
  }).catch(err => console.error(err));
};

export const fetchWeeklySides = () => dispatch => {
  const route = `${process.env.REACT_APP_SERVER_URI}/api/reports/week?get=sides`;

  axios.get(route).then(res => {
    dispatch({
      type: FETCH_WEEKLY_SIDES,
      payload: res.data.weeklyReport
    });
  });
};
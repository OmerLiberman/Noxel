import {
  FETCH_TODAY_MEALS,
  FETCH_WEEKLY_MEALS,
} from './types';

import axios from 'axios';

import {numberToDay} from '../../utils/time';


export const fetchTodayMeals = () => dispatch => {
  const dateObject = new Date();
  const dayInWeek = numberToDay(dateObject.getDay());

  const route = `${process.env.REACT_APP_SERVER_URI}/api/reports/day/${dayInWeek}/meals`;

  axios.get(route).then(res => {
      dispatch({
        type: FETCH_TODAY_MEALS,
        payload: res.data.dailyReport
      });
  }).catch(err => console.error(err));
};

export const fetchWeeklyMeals = () => dispatch => {
  const route = `${process.env.REACT_APP_SERVER_URI}/api/reports/week/totals/meals`;

  axios.get(route).then(res => {
    dispatch({
      type: FETCH_WEEKLY_MEALS,
      payload: res.data.weeklyReport
    });
  });
};
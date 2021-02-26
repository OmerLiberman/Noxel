import {
  FETCH_TODAY_SIDES,
  FETCH_WEEKLY_SIDES,
} from '../actions/types';

const initialState = {
  weeklyReport: {},
  dailyReport: {}
}

export const sidesReducer = (state=initialState, action) =>  {
  switch (action.type) {
    case FETCH_TODAY_SIDES:
      return {
        ...state,
        dailyReport: action.payload
      }
    case FETCH_WEEKLY_SIDES:
      return {
        ...state,
        weeklyReport: action.payload
      }
    default:
      return state;
  }
}
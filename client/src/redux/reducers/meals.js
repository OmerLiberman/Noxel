import {
  FETCH_TODAY_MEALS,
  FETCH_WEEKLY_MEALS
} from '../actions/types';

const initialState = {
  weeklyReport: {},
  dailyReport: {}
}

export const mealsReducer = (state=initialState, action) =>  {
  switch (action.type) {
    case FETCH_TODAY_MEALS:
      return {
        ...state,
        dailyReport: action.payload
      }
    case FETCH_WEEKLY_MEALS:
      return {
        ...state,
        weeklyReport: action.payload
      }
    default:
      return state;
  }
}
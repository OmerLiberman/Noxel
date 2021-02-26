import {
  CLASSROOMS_NUM,
  CLASSROOMS_NUM_ERROR,
  SCHOOLS_NUM,
  SCHOOLS_NUM_ERROR,
  KIDS_NUM,
  KIDS_NUM_ERROR,
} from "../actions/types";

const initialState = {
  kids: {
    value: null,
    loading: true,
    error: false,
  },
  classrooms: {
    value: null,
    loading: true,
    error: false,
  },
  schools: {
    value: null,
    loading: true,
    error: false,
  },
};

export const statsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CLASSROOMS_NUM:
      return {
        ...state,
        classrooms: {
          value: action.payload,
          loading: false,
          error: false
        }
      };
    case SCHOOLS_NUM:
      return {
        ...state,
        schools: {
          value: action.payload,
          loading: false,
          error: false
        }
      };
    case KIDS_NUM:
      return {
        ...state,
        kids: {
          value: action.payload,
          loading: false,
          error: false
        }
      };
    case CLASSROOMS_NUM_ERROR:
      return {
        ...state,
        classrooms: {
          loading: false,
          error: true
        }
      };
    case SCHOOLS_NUM_ERROR:
      return {
        ...state,
        schools: {
          loading: false,
          error: true
        }
      };
    case KIDS_NUM_ERROR:
      return {
        ...state,
        kids: {
          loading: false,
          error: true
        }
      };
    default:
      return state;
  }
};
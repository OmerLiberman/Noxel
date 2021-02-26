import {
  CLASSROOMS_NUM,
  CLASSROOMS_NUM_ERROR,
  SCHOOLS_NUM,
  SCHOOLS_NUM_ERROR,
  KIDS_NUM,
  KIDS_NUM_ERROR,
} from "./types";

import axios from "axios";


export const fetchKidsNum = () => (dispatch) => {
  const route = `${process.env.REACT_APP_SERVER_URI}/api/stats/kids`;

  axios
    .get(route)
    .then((res) => {
      dispatch({
        type: KIDS_NUM,
        payload: res.data.kids,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: KIDS_NUM_ERROR,
      });
    });
};

export const fetchClassroomsNum = () => (dispatch) => {
  const route = `${process.env.REACT_APP_SERVER_URI}/api/stats/classrooms`;

  axios
    .get(route)
    .then((res) => {
      dispatch({
        type: CLASSROOMS_NUM,
        payload: res.data.classrooms,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: CLASSROOMS_NUM_ERROR,
      });
    });
};

export const fetchSchoolsNum = () => (dispatch) => {
  const route = `${process.env.REACT_APP_SERVER_URI}/api/stats/schools`;

  axios
    .get(route)
    .then((res) => {
      dispatch({
        type: SCHOOLS_NUM,
        payload: res.data.schools,
      });
    })
    .catch((err) => {
      console.error(err);
      dispatch({
        type: SCHOOLS_NUM_ERROR,
      });
    });
};
import * as axios from "axios";
import {
  ALL_CITIES,
  AUTH_FAILED,
  AUTH_START,
  AUTH_SUCCESS,
  CURRENT_LOCATION,
  GET_SELECTED_LOCATION_FAILED,
  GET_SELECTED_LOCATION_START,
  GET_SELECTED_LOCATION_SUCCESS,
  LOG_OUT,
  SIGN_IN_FAILED,
  SIGN_IN_START,
  SIGN_IN_SUCCESS,
  SIGN_UP
} from "./types";
import { store } from "../store";

const getTemporaryCors = "https://cors-anywhere.herokuapp.com/";

export const authCheck = () => async dispatch => {
  dispatch(authStart());
  try {
    const sessionUser = localStorage.getItem("user");
    return dispatch(
      sessionUser ? authSuccess(JSON.parse(sessionUser)) : authFailed()
    );
  } catch (e) {
    return dispatch(authFailed(e));
  }
};

export const authStart = () => {
  return {
    type: AUTH_START
  };
};

export const authSuccess = (user = {}) => {
  return {
    type: AUTH_SUCCESS,
    loggedIn: true,
    user
  };
};

export const authFailed = (error = null) => {
  return {
    type: AUTH_FAILED,
    loggedIn: false,
    error
  };
};

export const signUp = userCredentials => async dispatch => {
  dispatch({
    type: SIGN_UP,
    payload: userCredentials
  });
};

export const signIn = userCredentials => async dispatch => {
  dispatch(signInStart());
  try {
    const { login, password } = userCredentials;
    const { userRegistered } = store.getState().auth;

    if (
      !userRegistered[login] === login &&
      !userRegistered[password] === password
    )
      return signInFailed();
    const user = userCredentials;
    localStorage.setItem("user", JSON.stringify(user));
    return dispatch(signInSuccess(user));
  } catch (e) {
    return dispatch(signInFailed(e.toString()));
  }
};

const signInStart = () => {
  return {
    type: SIGN_IN_START
  };
};

const signInSuccess = (data = {}) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: data
  };
};

const signInFailed = (error = null) => {
  return {
    type: SIGN_IN_FAILED,
    error
  };
};

export const logOutUser = () => dispatch => {
  dispatch({
    type: LOG_OUT
  });
  return localStorage.removeItem("user");
};

export const getCurrentLocation = () => async dispatch => {
  const res = await axios.get("https://geoip-db.com/json/");
  const { data } = res;

  return dispatch({
    type: CURRENT_LOCATION,
    payload: data
  });
};

export const getCities = value => async dispatch => {
  try {
    value = value.toLowerCase();
    const response = await axios.get(
      `${getTemporaryCors}https://www.metaweather.com/api/location/search/?query=${value}`
    );
    const { data } = response;

    const sortedCities = [];

    data.filter(e => {
      if (e.title.toLowerCase().indexOf(value) === -1) return false;
      return sortedCities.unshift(e);
    });

    return dispatch({
      type: ALL_CITIES,
      payload: sortedCities
    });
  } catch (e) {
    return dispatch({
      type: GET_SELECTED_LOCATION_FAILED,
      error: "500 - Network Error"
    });
  }
};

export const getLocationInfo = city => async dispatch => {
  dispatch({ type: GET_SELECTED_LOCATION_START });
  try {
    city = city.toLowerCase();
    const response = await axios.get(
      `${getTemporaryCors}https://www.metaweather.com/api/location/search/?query=${city}`
    );

    if (response.data.length > 0) {
      const dataCity = response.data.filter(
        e => e.title.toLowerCase() === city
      );
      const { woeid } = dataCity[0];
      const weather = await axios.get(
        `${getTemporaryCors}https://www.metaweather.com/api/location/${woeid}`
      );
      return dispatch({
        type: GET_SELECTED_LOCATION_SUCCESS,
        payload: weather.data
      });
    }
    return dispatch({
      type: GET_SELECTED_LOCATION_FAILED,
      error: "404 - City Not Found"
    });
  } catch (e) {
    e.message = "404 - City Not Found";
    return dispatch({
      type: GET_SELECTED_LOCATION_FAILED,
      error: e.message
    });
  }
};

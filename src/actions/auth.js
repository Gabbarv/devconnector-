import axios from "axios";
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import { url } from "../url";

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types';

/*
  NOTE: we don't need a config object for axios as the
 default headers in axios are already Content-Type: application/json
 also axios stringifies and parses JSON for you, so no need for 
 JSON.stringify or JSON.parse
*/

// Load User
export const loadUser = () => async (dispatch) => {
  
  const userToken = localStorage.getItem("token");

  if (userToken) {
		setAuthToken( userToken);
    
	} 
  try {
    const res = await axios.get(`${url}/api/auth`);
   

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Register User
export const register = (formData) => async (dispatch) => {

  const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}
  try {
    const res = await axios.post(`${url}/api/users`, formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = (email, password) => async (dispatch) => {
  const body = { email, password };
  const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

  try {
    const res = await axios.post(`${url}/api/auth`, body,config);
    localStorage.setItem("token",res.data.token);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT });
dispatch({type: CLEAR_PROFILE});
localStorage.setItem("token",null);
}
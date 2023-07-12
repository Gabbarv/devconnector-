import { combineReducers } from "redux";
import alert from "./alert";
import authReducer from "./auth";
import profileReducer from "./profile";
import postReducer from "./post";
export default combineReducers(
    {
        alert,
        authReducer,
        profileReducer,
        postReducer
    });
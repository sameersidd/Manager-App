import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	SIGNUP_USER_SUCCESS,
	LOGIN_USER_FAIL,
	SIGNUP_USER_FAIL,
	LOGGING_USER
} from "./types";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const emailChanged = (text) => {
	return {
		type: EMAIL_CHANGED,
		payload: text
	};
};

export const passwordChanged = (text) => {
	return {
		type: PASSWORD_CHANGED,
		payload: text
	};
};

export const loginUser = ({ email, password }) => {
	return (dispatch) => {
		dispatch({
			type: LOGGING_USER
		});
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((user) => loginUserSuccess(dispatch, user))
			.catch((error) => {
				if (error.code === "auth/user-not-found") {
					firebase
						.auth()
						.createUserWithEmailAndPassword(email, password)
						.then((user) => SignUpUserSuccess(dispatch, user))
						.catch((err) => {
							signUpUserFail(dispatch, err);
						});
				} else {
					loginUserFail(dispatch, error);
				}
			});
	};
};

const loginUserSuccess = (dispatch, user) => {
	dispatch({
		type: LOGIN_USER_SUCCESS,
		payload: user
	});
	Actions.main();
};

const SignUpUserSuccess = (dispatch, user) => {
	dispatch({
		type: SIGNUP_USER_SUCCESS,
		payload: user
	});
	Actions.main();
};

const loginUserFail = (dispatch, error) => {
	dispatch({
		type: LOGIN_USER_FAIL,
		payload: error.code
	});
};

const signUpUserFail = (dispatch, err) => {
	dispatch({
		type: SIGNUP_USER_FAIL,
		payload: err.code
	});
};

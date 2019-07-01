import {
	EMAIL_CHANGED,
	PASSWORD_CHANGED,
	LOGIN_USER_SUCCESS,
	SIGNUP_USER_SUCCESS,
	LOGIN_USER_FAIL,
	SIGNUP_USER_FAIL,
	LOGGING_USER
} from "../actions/types";

const INITIAL_STATE = {
	email: "",
	password: "",
	user: null,
	error: "",
	loading: false
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case EMAIL_CHANGED:
			return { ...state, email: action.payload, error: "" };
		case PASSWORD_CHANGED:
			return { ...state, password: action.payload, error: "" };
		case LOGGING_USER:
			return { ...state, loading: true, error: "" };
		case LOGIN_USER_SUCCESS:
		case SIGNUP_USER_SUCCESS: {
			return { ...state, user: action.payload };
		}
		case LOGIN_USER_FAIL: {
			return {
				...state,
				...INITIAL_STATE,
				email: state.email,
				error: "Login Failed: " + action.payload
			};
		}
		case SIGNUP_USER_FAIL: {
			return {
				...state,
				...INITIAL_STATE,
				email: state.email,
				error: "SignUp Failed: " + action.payload
			};
		}
		default:
			return state;
	}
};

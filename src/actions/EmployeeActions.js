import {
	EMPLOYEE_UPDATE,
	EMPLOYEE_CREATE,
	EMPLOYEE_CREATE_FAILED,
	EMPLOYEES_FETCH_SUCCESS,
	SELECT_EMPLOYEE_ITEM,
	EMPLOYEE_UPDATE_SAVED,
	EMPLOYEE_DELETED
} from "./types";
import firebase from "firebase";
import { Actions } from "react-native-router-flux";

export const employeeUpdate = ({ prop, value }) => {
	return {
		type: EMPLOYEE_UPDATE,
		payload: { prop, value }
	};
};

export const employeeCreate = ({ name, age, address, shift, phone }) => {
	const userId = firebase.auth().currentUser.uid;

	return (dispatch) => {
		firebase
			.database()
			.ref(`/users/${userId}/employees`)
			.push({ name, age, address, shift, phone })
			.then(
				dispatch({
					type: EMPLOYEE_CREATE,
					payload: true
				})
			)
			.then(() => Actions.pop())
			.catch((err) => {
				dispatch({
					type: EMPLOYEE_CREATE_FAILED,
					payload: err
				});
			});
	};
};

export const employeesFetch = () => {
	const userId = firebase.auth().currentUser.uid;
	return (dispatch) => {
		firebase
			.database()
			.ref(`/users/${userId}/employees`)
			.on("value", (snapshot) => {
				dispatch({
					type: EMPLOYEES_FETCH_SUCCESS,
					payload: snapshot.val()
				});
			});
	};
};

export const selectEmployee = (uid) => {
	return {
		type: SELECT_EMPLOYEE_ITEM,
		payload: uid
	};
};

export const employeeSave = ({ name, age, address, shift, phone, uid }) => {
	const userId = firebase.auth().currentUser.uid;
	return (dispatch) => {
		firebase
			.database()
			.ref(`/users/${userId}/employees/${uid}`)
			.set({ name, age, address, shift, phone })
			.then(
				dispatch({
					type: EMPLOYEE_UPDATE_SAVED,
					payload: true
				})
			);
	};
};

export const employeeDelete = (uid) => {
	const userId = firebase.auth().currentUser.uid;

	return (dispatch) => {
		firebase
			.database()
			.ref(`/users/${userId}/employees/${uid}`)
			.remove()
			.then(
				dispatch({
					type: EMPLOYEE_DELETED,
					payload: uid
				})
			);
	};
};

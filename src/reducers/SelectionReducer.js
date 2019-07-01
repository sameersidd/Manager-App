import { SELECT_EMPLOYEE_ITEM } from "../actions/types";

export default (state = null, action) => {
	switch (action.type) {
		case SELECT_EMPLOYEE_ITEM:
			return action.payload;
		default:
			return state;
	}
};

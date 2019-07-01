import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import EmployeesReducer from "./EmployeesReducer";
import EmployeeFormReducer from "./EmployeeFormReducer";
import SelectionReducer from "./SelectionReducer";

export default combineReducers({
	auth: AuthReducer,
	employeeForm: EmployeeFormReducer,
	employees: EmployeesReducer,
	selected: SelectionReducer
});

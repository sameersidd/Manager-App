import React from "react";
import { Scene, Router, Actions } from "react-native-router-flux";
import LoginForm from "./LoginForm";
import EmployeeList from "./EmployeeList";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeEdit from "./EmployeeEdit";

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root" headerLayoutPreset="center" hideNavBar>
				<Scene key="auth">
					<Scene
						key="login"
						component={LoginForm}
						title="LogIn"
						titleStyle={styles.textStyle}
						initial
					/>
				</Scene>
				<Scene key="main">
					<Scene
						rightTitle="+"
						onRight={() => {
							Actions.EmployeeCreate();
						}}
						rightButtonTextStyle={{
							fontSize: 20
						}}
						key="EmployeeList"
						component={EmployeeList}
						title="Employee List"
						titleStyle={styles.textStyle}
						initial
					/>
					<Scene
						key="EmployeeCreate"
						title="Create an Employee"
						component={EmployeeCreate}
						titleStyle={styles.textStyle}
					/>
					<Scene
						key="EmployeeEdit"
						component={EmployeeEdit}
						title="Edit Employee"
						titleStyle={styles.textStyle}
					/>
				</Scene>
			</Scene>
		</Router>
	);
};

const styles = {
	textStyle: {
		fontSize: 20
	}
};

export default RouterComponent;

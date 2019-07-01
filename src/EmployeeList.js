import React, { Component } from "react";
import { ScrollView, FlatList } from "react-native";
import EmployeeItem from "./EmployeeItem";
import { connect } from "react-redux";
import { EmployeeActions } from "./actions";
import { Card } from "./common";

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.employees.length !== this.props.employees.length) {
			this.props.employeesFetch();
		}
	}

	renderItem(employee) {
		return <EmployeeItem employee={employee} />;
	}

	render() {
		const { employees } = this.props;
		return (
			<ScrollView>
				<Card>
					<FlatList
						data={employees}
						renderItem={this.renderItem}
						keyExtractor={(employee) => employee.uid}
					/>
				</Card>
			</ScrollView>
		);
	}
}

//To-Do Change this into a Flatlist version using Native ES6
//Done
const mapStateToProps = (state) => {
	const employees = Object.keys(state.employees).map((uid) => {
		return {
			...state.employees[uid],
			uid: uid
		};
	});
	return { employees };
};

export default connect(
	mapStateToProps,
	EmployeeActions
)(EmployeeList);

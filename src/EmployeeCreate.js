import React, { Component } from "react";
import { Button, Card, CardItem } from "./common";
import { connect } from "react-redux";
import { EmployeeActions } from "./actions";
import EmployeeForm from "./EmployeeForm";

class EmployeeCreate extends Component {
	onButtonPress() {
		const { name, age, address, shift, phone } = this.props;
		this.props.employeeCreate({
			name,
			age,
			address,
			shift: shift || "Monday",
			phone
		});
	}

	render() {
		return (
			<Card>
				<EmployeeForm {...this.props} />
				<CardItem>
					<Button onPress={this.onButtonPress.bind(this)}>
						Create Employee
					</Button>
				</CardItem>
			</Card>
		);
	}
}

const styles = {
	pickerLabelStyle: {
		fontSize: 18,
		paddingLeft: 20,
		paddingTop: 10,
		paddingRight: 5
	}
};

const mapStateToProps = (state) => {
	const { name, age, address, shift, phone } = state.employeeForm;
	return { name, age, address, shift, phone };
};

export default connect(
	mapStateToProps,
	EmployeeActions
)(EmployeeCreate);

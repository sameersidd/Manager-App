import React, { Component } from "react";
import _ from "lodash";
import { Button, Card, CardItem, DefaultModal } from "./common";
import { connect } from "react-redux";
import EmployeeForm from "./EmployeeForm";
import { EmployeeActions } from "./actions";
import { Actions } from "react-native-router-flux";
import Communications from "react-native-communications";

class EmployeeEdit extends Component {
	state = { showModal: false };

	componentWillMount() {
		_.each(this.props.employee, (value, prop) => {
			this.props.employeeUpdate({ prop, value });
		});
	}

	onButtonPress() {
		const { name, age, address, shift, phone } = this.props;
		this.props.employeeSave({
			name,
			age,
			address,
			shift,
			phone,
			uid: this.props.employee.uid
		});
		Actions.pop();
	}

	onTextButtonPress() {
		const { phone, shift } = this.props;
		Communications.text(phone, `Your upcoming shift is on ${shift}`);
	}

	onAccept() {
		const uid = this.props.employee.uid;
		this.props.employeeDelete(uid);
		Actions.pop();
	}

	onDecline() {
		this.setState({ showModal: false });
	}

	render() {
		return (
			<Card>
				<EmployeeForm />
				<CardItem>
					<Button onPress={this.onButtonPress.bind(this)}>Save</Button>
				</CardItem>
				<CardItem>
					<Button onPress={this.onTextButtonPress.bind(this)}>Text</Button>
				</CardItem>
				<CardItem>
					<Button
						onPress={() => this.setState({ showModal: !this.state.showModal })}
					>
						Fire
					</Button>
				</CardItem>
				<DefaultModal
					visible={this.state.showModal}
					onAccept={this.onAccept.bind(this)}
					onDecline={this.onDecline.bind(this)}
				>
					Are you sure you want to delete this?
				</DefaultModal>
			</Card>
		);
	}
}

const mapStateToProps = (state) => {
	const { name, age, address, shift, phone } = state.employeeForm;
	return { name, age, address, shift, phone };
};

export default connect(
	mapStateToProps,
	EmployeeActions
)(EmployeeEdit);

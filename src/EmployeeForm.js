import React, { Component } from "react";
import { Picker, Text, View } from "react-native";
import { CardItem, Input } from "./common";
import { connect } from "react-redux";
import { EmployeeActions } from "./actions";

class EmployeeCreate extends Component {
	render() {
		return (
			<View>
				<CardItem>
					<Input
						label="Name"
						value={this.props.name}
						type="name"
						onChangeText={(text) =>
							this.props.employeeUpdate({ prop: "name", value: text })
						}
					/>
				</CardItem>
				<CardItem>
					<Input
						label="Age"
						value={this.props.age}
						keyboardType="phone-pad"
						onChangeText={(text) =>
							this.props.employeeUpdate({ prop: "age", value: text })
						}
					/>
				</CardItem>
				<CardItem>
					<Input
						label="Address"
						value={this.props.address}
						type="fullStreetAddress"
						multiline
						onChangeText={(text) =>
							this.props.employeeUpdate({ prop: "address", value: text })
						}
					/>
				</CardItem>
				<CardItem>
					<Input
						label="Phone"
						placeholder="10 Digits"
						value={this.props.phone}
						type="telephoneNumber"
						keyboardType="phone-pad"
						onChangeText={(text) =>
							this.props.employeeUpdate({ prop: "phone", value: text })
						}
					/>
				</CardItem>
				<CardItem>
					<Text style={styles.pickerLabelStyle}>Select Shift</Text>
					<Picker
						style={{ flex: 1 }}
						selectedValue={this.props.shift}
						onValueChange={(text) =>
							this.props.employeeUpdate({ prop: "shift", value: text })
						}
					>
						<Picker.Item label="Monday" value="Monday" />
						<Picker.Item label="Tuesday" value="Tuesday" />
						<Picker.Item label="Wednesday" value="Wednesday" />
						<Picker.Item label="Thursday" value="Thursday" />
						<Picker.Item label="Friday" value="Friday" />
						<Picker.Item label="Saturday" value="Saturday" />
						<Picker.Item label="Sunday" value="Sunday" />
					</Picker>
				</CardItem>
			</View>
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

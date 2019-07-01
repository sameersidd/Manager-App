import React, { Component } from "react";
import {
	Text,
	TouchableWithoutFeedback,
	View,
	LayoutAnimation,
	Platform,
	NativeModules
} from "react-native";
import { CardItem } from "./common";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import { EmployeeActions } from "./actions";

class EmployeeItem extends Component {
	componentWillUpdate() {
		LayoutAnimation.easeInEaseOut();
	}
	onRowLongPress() {
		Actions.EmployeeEdit({ employee: this.props.employee.item });
	}

	renderDescription(employee) {
		if (this.props.expanded)
			return (
				<View>
					<CardItem>
						<Text>Phone: {employee.item.phone}</Text>
					</CardItem>
					<CardItem>
						<Text>Shift: {employee.item.shift}</Text>
					</CardItem>
					<CardItem>
						<Text>Age: {employee.item.age}</Text>
					</CardItem>
					<CardItem>
						<Text>Address: {employee.item.address}</Text>
					</CardItem>
				</View>
			);
	}

	render() {
		const { employee } = this.props;

		return (
			<TouchableWithoutFeedback
				onLongPress={this.onRowLongPress.bind(this)}
				onPress={() => this.props.selectEmployee(employee.item.uid)}
			>
				<View>
					<CardItem>
						<Text style={style.titleStyles}>{employee.item.name}</Text>
					</CardItem>
					{this.renderDescription(employee)}
				</View>
			</TouchableWithoutFeedback>
		);
	}
}

const style = {
	titleStyles: {
		fontSize: 18,
		paddingLeft: 15
	}
};

if (Platform.OS === "android") {
	const { UIManager } = NativeModules;
	UIManager.setLayoutAnimationEnabledExperimental(true);
}

const mapStateToProps = (state, ownProps) => {
	const expanded = state.selected === ownProps.employee.item.uid;
	return { expanded };
};

export default connect(
	mapStateToProps,
	EmployeeActions
)(EmployeeItem);

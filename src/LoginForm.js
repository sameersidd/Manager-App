import React, { Component } from "react";
import { View, Text } from "react-native";
import { Card, CardItem, Input, Button, Spinner } from "./common";
import { connect } from "react-redux";
import { AuthActions } from "./actions";

class LoginForm extends Component {
	onEmailChange(text) {
		this.props.emailChanged(text);
	}
	onPasswordChange(text) {
		this.props.passwordChanged(text);
	}

	onButtonPress() {
		const { email, password } = this.props;
		this.props.loginUser({ email, password });
	}

	renderButton() {
		if (this.props.loading) {
			return <Spinner size="large" />;
		}

		return <Button onPress={this.onButtonPress.bind(this)}>Login</Button>;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.loading !== nextProps.loading) this.render();
	}

	renderError() {
		if (this.props.error) {
			return (
				<View style={styles.errorVisibleStyle}>
					<Text style={styles.errorTextStyle}>{this.props.error}</Text>
				</View>
			);
		} else {
			return <View />;
		}
	}

	render() {
		return (
			<Card>
				<CardItem>
					<Input
						label="Email"
						value={this.props.email}
						placeholder="example@example.com"
						onChangeText={this.onEmailChange.bind(this)}
					/>
				</CardItem>
				<CardItem>
					<Input
						secureTextEntry
						label="Password"
						onChangeText={this.onPasswordChange.bind(this)}
						value={this.props.password}
					/>
				</CardItem>
				{this.renderError()}
				<CardItem>{this.renderButton()}</CardItem>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: "center",
		color: "white"
	},
	errorVisibleStyle: {
		backgroundColor: "red",
		height: 40,
		justifyContent: "center",
		borderColor: "black",
		borderWidth: 1
	}
};

const mapStateToProps = (state) => {
	return {
		email: state.auth.email,
		password: state.auth.password,
		error: state.auth.error,
		loading: state.auth.loading
	};
};

export default connect(
	mapStateToProps,
	AuthActions
)(LoginForm);

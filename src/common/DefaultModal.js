import React, { Component } from "react";
import { Text, View, Modal } from "react-native";
import { CardItem } from "./CardItem";
import { Button } from "./Button";

const DefaultModal = ({ children, onAccept, onDecline, visible }) => {
	const { containerStyle, cardItemStyle, textStyle } = styles;
	return (
		<Modal
			animationType="slide"
			onRequestClose={() => {}}
			transparent
			visible={visible}
		>
			<View style={containerStyle}>
				<CardItem style={cardItemStyle}>
					<Text style={textStyle}>{children}</Text>
				</CardItem>
				<CardItem>
					<Button onPress={onAccept}>Yes</Button>
					<Button onPress={onDecline}>No</Button>
				</CardItem>
			</View>
		</Modal>
	);
};

const styles = {
	cardItemStyle: {
		justifyContent: "center"
	},
	textStyle: {
		flex: 1,
		fontSize: 18,
		textAlign: "center",
		lineHeight: 40
	},
	containerStyle: {
		backgroundColor: "rgba( 0, 0, 0, 0.75)",
		position: "relative",
		flex: 1,
		justifyContent: "center"
	}
};

export { DefaultModal };

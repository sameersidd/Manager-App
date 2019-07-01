import React from "react";
import { Text, View } from "react-native";

const Header = (props) => {
	const { textStyle, viewStyle } = styles;
	return (
		<View style={viewStyle}>
			<Text style={textStyle}>{props.headerText}</Text>
		</View>
	);
};

const styles = {
	viewStyle: {
		backgroundColor: "#dddbdb",
		padding: 25,
		paddingTop: 35,
		height: 75,
		alignItems: "center",
		justifyContent: "center",
		shadowColor: "#000",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.5,
		elevation: 2,
		position: "relative"
	},
	textStyle: {
		fontSize: 20
	}
};

export { Header };

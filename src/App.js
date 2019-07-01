import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import firebase from "firebase";
import reducers from "./reducers";
import { config } from "./firebase.config";
import Router from "./Router";
import { Actions } from "react-native-router-flux";

class App extends Component {
	componentWillMount() {
		firebase.initializeApp(config);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) Actions.main();
		});
	}
	render() {
		return (
			<View
				style={{
					flex: 1,
					paddingTop: StatusBar.currentHeight
				}}
			>
				<Provider
					store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}
				>
					<Router />
				</Provider>
			</View>
		);
	}
}

export default App;

import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import DeckInfo from './DeckInfo'
import { addDeck } from '../utils/api'

export default class AddDeck extends Component {
	state = {
		value: "",
	}

	onChangeText = (text) => {
		this.setState({ value: text });
	}

	submit = (value) => {
		addDeck(value);
	}

	render() {
		let { value } = this.state;
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>What is the title of your new deck?</Text>
				<TextInput
		      style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
		      onChangeText={text => this.onChangeText(text)}
		      value={value}
		    />
		    <TouchableOpacity
	        style={styles.button}
	        onPress={() => { this.submit(this.state.value) }}>
	        <Text>SUBMIT</Text>
	      </TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	header: {
		flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 5,
	},
	headerText: {
		fontSize: 22
	},
	button: {

	},
}
import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import { addCard } from '../utils/api'

export default class AddCard extends Component {
	state = {
		question: "",
		answer: "",
	}

	changeQuestionText = (text) => {
		this.setState({question: text})
	}

	changeAnswerText = (text) => {
		this.setState({answer: text})	
	}

	submit = async () => {
		if (this.state.question === "" || this.state.answer === "") {
			alert("Values cannot be empty");
			return;
		}

		let deck = this.props.navigation.state.params.deck;
		let { question, answer } = this.state;
		await addCard(deck, { question, answer });
		// this.props.navigation.navigate('DeckList', { refresh: true });
		this.props.navigation.navigate('DeckPage', { deck, refresh_decks:this.props.refresh_decks})
	}

  render() {
  	let { question, answer } = this.state;

		return (
			<View style={styles.container}>
				<Text style={styles.headerText}>Question</Text>
				<TextInput
					style={styles.input}
		      onChangeText={text => this.changeQuestionText(text)}
		      value={question}
		    />
		    <Text style={styles.headerText}>Answer</Text>
				<TextInput
					style={styles.input}
		      onChangeText={text => this.changeAnswerText(text)}
		      value={answer}
		    />
		    <TouchableOpacity
		    	style={styles.button}
	        onPress={() => { this.submit() }}>
	        <Text style={styles.container}>SUBMIT</Text>
	      </TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	container:{
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'space-around',
		margin: 20,
	},
	headerText: {
		fontSize: 24,
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		height: 45,
	},
	button: {
  	backgroundColor: '#808080',
  	height: 65,
  	borderRadius: 5,
  	margin: 40,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  buttonText: {
  	fontSize: 22,
  	color: '#FFFFFF',
  },
}

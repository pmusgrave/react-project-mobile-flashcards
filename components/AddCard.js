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
		let deck = this.props.navigation.state.params.deck;
		let { question, answer } = this.state;
		await addCard(deck, { question, answer });
		this.props.navigation.navigate('DeckList', { refresh: true });
	}

  render() {
  	let { question, answer } = this.state;

		return (
			<View>
				<Text>Question</Text>
				<TextInput
		      onChangeText={text => this.changeQuestionText(text)}
		      value={question}
		    />
		    <Text>Answer</Text>
				<TextInput
		      onChangeText={text => this.changeAnswerText(text)}
		      value={answer}
		    />
		    <TouchableOpacity
	        onPress={() => { this.submit() }}>
	        <Text>SUBMIT</Text>
	      </TouchableOpacity>
			</View>
		);
	}
}

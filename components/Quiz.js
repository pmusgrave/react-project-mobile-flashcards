import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

export default class Quiz extends Component {
	state = {
		total_cards: 0,
		answered: 0,
		answered_correctly: 0,
		current_card: {},
		current_card_index: 0,
		deck: {},
		show_answer: false,
	}

	componentDidMount() {
		let { deck } = this.props.navigation.state.params;
		if (deck.cards !== undefined && deck.cards.length > 0) {
			this.setState({
				deck,
				total_cards: deck.cards.length,
				current_card: deck.cards[0],
				current_card_index: 0,
			})
		}
	}

	show_answer = () => {
		this.setState({ show_answer: true });
	}

	hide_answer = () => {
		this.setState({ show_answer: false });	
	}

	correct = () => {
		this.setState((current_state) => ({
			...current_state,
			answered: current_state.answered + 1,
			answered_correctly: current_state.answered_correctly + 1,
			show_answer: false,
			current_card_index: current_state.current_card_index + 1,
			current_card: current_state.deck.cards[current_state.current_card_index + 1],
		}))
	}

	incorrect = () => {
		this.setState((current_state) => ({
			...current_state,
			answered: current_state.answered + 1,
			show_answer: false,
			current_card_index: current_state.current_card_index + 1,
			current_card: current_state.deck.cards[current_state.current_card_index + 1],
		}))
	}

	reset_quiz = () => {
		this.setState({
			answered: 0,
			answered_correctly: 0,
			show_answer: false,
			current_card: this.state.deck.cards[0],
			current_card_index: 0,
		})
	}

  render() {
  	if (this.state.answered < this.state.total_cards) {
			return (
				<View>

					<Text>
						{this.state.current_card.question}
					</Text>

					{this.state.show_answer 
					? <View>
							<Text>
								{this.state.current_card.answer}
							</Text>
							<TouchableOpacity
		        		onPress={ this.correct }>
		        		<Text>Correct</Text>
		      		</TouchableOpacity>
		      		<TouchableOpacity
		        		onPress={ this.incorrect }>
		        		<Text>Incorrect</Text>
		      		</TouchableOpacity>
						</View>
					: <View>
							<TouchableOpacity
		        		onPress={ this.show_answer }>
		        		<Text>SHOW ANSWER</Text>
		      		</TouchableOpacity>
	      		</View>
					}

				</View> 
			);
  	}
		else {
			return (
				<View>
					<Text>
						Your answered {this.state.answered_correctly} out of {this.state.total_cards} cards correctly.
					</Text>
					<TouchableOpacity
	      		onPress={ this.reset_quiz }>
	      		<Text>Restart Quiz</Text>
	    		</TouchableOpacity>
	    		<TouchableOpacity
	      		onPress={ () => this.props.navigation.navigate('DeckPage', { deck: this.state.deck }) }>
	      		<Text>Back to Deck</Text>
	    		</TouchableOpacity>
				</View>
			)
		}
	}
}

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
  	if (this.state.total_cards === 0) {
  		return (
  			<View style={styles.container}>
					<Text style={styles.headerText}>
						There are no cards in this deck
					</Text>
				</View>
			)
  	}
  	else if (this.state.answered < this.state.total_cards) {
			return (
				<View style={styles.container}>
					<Text style={styles.headerText}>
						{this.state.total_cards - this.state.answered} cards remaining
					</Text>

					<Text style={styles.headerText}>
						Question: {this.state.current_card.question}
					</Text>

					{this.state.show_answer 
					? <View>
							<Text style={styles.headerText}>
								Answer: {this.state.current_card.answer}
							</Text>
							<TouchableOpacity
								style={styles.button}
		        		onPress={ this.correct }>
		        		<Text style={styles.buttonText}>Correct</Text>
		      		</TouchableOpacity>
		      		<TouchableOpacity
		      			style={styles.button}
		        		onPress={ this.incorrect }>
		        		<Text style={styles.buttonText}>Incorrect</Text>
		      		</TouchableOpacity>
						</View>
					: <View>
							<TouchableOpacity
								style={styles.button}
		        		onPress={ this.show_answer }>
		        		<Text style={styles.buttonText}>SHOW ANSWER</Text>
		      		</TouchableOpacity>
	      		</View>
					}

				</View> 
			);
  	}
		else {
			return (
				<View style={styles.container}>
					<Text style={styles.headerText}>
						Your answered {this.state.answered_correctly} out of {this.state.total_cards} cards correctly.
					</Text>
					<TouchableOpacity
						style={styles.button}
	      		onPress={ this.reset_quiz }>
	      		<Text style={styles.buttonText}>Restart Quiz</Text>
	    		</TouchableOpacity>
	    		<TouchableOpacity
	    			style={styles.button}
	      		onPress={ () => this.props.navigation.navigate('DeckPage', { deck: this.state.deck }) }>
	      		<Text style={styles.buttonText}>Back to Deck</Text>
	    		</TouchableOpacity>
				</View>
			)
		}
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

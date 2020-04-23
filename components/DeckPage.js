import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { removeDeck } from '../utils/api'
import DeckInfo from './DeckInfo'

export default class DeckPage extends Component {
	addCard = (deck) => {
		this.props.navigation.navigate('AddCard', { deck, });
	}

	startQuiz = (deck) => {
		this.props.navigation.navigate('Quiz', { deck, });
	}

	delete = async (deck) => {
		await removeDeck(deck);
		this.props.navigation.state.params.refresh_decks();
		this.props.navigation.navigate('DeckList');
	}
	
	render() {
		const { deck } = this.props.navigation.state.params;

		return (
			<View>
				<DeckInfo deck={deck}/>
				<TouchableOpacity
	        style={styles.button}
	        onPress={ () => this.addCard(deck) }>
	        <Text>ADD CARD</Text>
	      </TouchableOpacity>
	      <TouchableOpacity
	        style={styles.button}
	        onPress={ () => this.startQuiz(deck) }>
	        <Text>START QUIZ</Text>
	      </TouchableOpacity>
				<TouchableOpacity
	        style={styles.button}
	        onPress={ () => this.delete(deck) }>
	        <Text>DELETE DECK</Text>
	      </TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 22,
  },
  cards: {
		flex: 1,
    color: '#808080',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
  },
  button: {

  },
});

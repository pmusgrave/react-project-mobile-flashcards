import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { removeDeck } from '../utils/api'
import DeckInfo from './DeckInfo'

export default class DeckPage extends Component {
	delete = async (deck) => {
		await removeDeck(deck);
		this.props.refresh_decks();
		this.props.resetView();
	}
	render() {
		const { deck } = this.props;

		return (
			<View>
				<DeckInfo deck={deck}/>
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

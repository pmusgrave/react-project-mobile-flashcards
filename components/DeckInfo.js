import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'

export default class DeckInfo extends Component {
  render() {
		const { deck } = this.props;

		return (
			<View>
				<Text style={styles.deck}>
					{deck.name === undefined ? null : deck.name}
				</Text>
				<Text style={styles.cards}>
					{deck.cards.length} cards
				</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  deck: {
    fontSize: 22,
  },
  cards: {
    color: '#808080',
    fontSize: 18,
  }
});

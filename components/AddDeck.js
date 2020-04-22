import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

export default class AddDeck extends Component {
	render() {
		const { decks } = this.props;
		return (
			<View>
				<Text>Add Deck</Text>
			</View>
		);
	}
}

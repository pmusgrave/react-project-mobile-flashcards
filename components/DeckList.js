import React, { Component } from 'react'
import { View, Text, FlatList } from 'react-native'

export default class DeckList extends Component {
	renderItem = ({ item }) => {
		return (
			<View>
				<Text>
					{item.name === undefined ? null : item.name}
				</Text>
			</View>
		);
	}

	render() {
		const { decks } = this.props;
		return (
			<View>
				<FlatList 
					data={decks}
					renderItem={this.renderItem}
				/>
			</View>
		);
	}
}

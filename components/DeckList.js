import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'

export default class DeckList extends Component {
  state = {
    decks: [{
    	name: "Deck 1",
    },{
    	name: "Deck 2",
    }],
  };
  
  add_deck = () => {

  }

  remove_deck = () => {

  }

	renderItem = ({ item }) => {
		return (
			<View style={styles.deck}>
				<Text>
					{item.name === undefined ? null : item.name}
				</Text>
			</View>
		);
	}

	render() {
		const { decks } = this.state;
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

const styles = StyleSheet.create({
  deck: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


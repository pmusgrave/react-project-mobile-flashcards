import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { getAllDecks, addDeck } from '../utils/api'
import DeckPage from './DeckPage'
import DeckInfo from './DeckInfo'
import AddDeck from './AddDeck'

export default class DeckList extends Component {
  renderItem = (navigation, item, refresh_decks) => {
		return (
			<View style={styles.deck}
				key={item.id}>
				<TouchableOpacity
	        style={styles.button}
	        onPress={() => { navigation.navigate('DeckPage', {
	        	deck: item,
	        	refresh_decks,
	        }) }}>
		      <DeckInfo deck={item}/>
	      </TouchableOpacity>
			</View>
		);
	}

	render() {
		const { decks, selected, navigation, refresh_decks } = this.props;

		if(navigation.state.params && navigation.state.params.refresh) {
			refresh_decks();
		}

		return (
			<View>
				<FlatList 
					data={decks}
					renderItem={(e) => this.renderItem(navigation, e.item, refresh_decks)}
					keyExtractor={(item, index) => index.toString()}
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
    margin: 5
  },
  button: {
  	flex: 1,
  },
});

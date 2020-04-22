import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { getAllDecks, addDeck } from '../utils/api'
import DeckInfo from './DeckInfo'
import AddDeck from './AddDeck'

export default class DeckList extends Component {
  state = {
    
  };

  async componentDidMount() {
  	let data = await getAllDecks();
  	data = JSON.parse(data);
  	let decks = data.decks;
  	decks = Object.values(decks);
  	this.setState({ decks, })
  }
  
  add_deck = (deck) => {
  	addDeck(deck);
  }

  remove_deck = () => {

  }

  onPress = (deck) => {
  	console.log(deck);
  }

	renderItem = ({ item }) => {
		return (
			<View style={styles.deck}>
				<TouchableOpacity
	        style={styles.button}
	        onPress={() => { this.onPress(item.name) }}>
		      <DeckInfo deck={item}/>
	      </TouchableOpacity>
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
    margin: 5
  },
  button: {

  },
});

import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { getDeck, getAllDecks, addDeck } from '../utils/api'
import DeckPage from './DeckPage'
import DeckInfo from './DeckInfo'
import AddDeck from './AddDeck'

export default class DeckList extends Component {
  state = {
  	decks: [],
    selected: null,
  };

  refresh_decks = async () => {
  	let data = await getAllDecks();
  	data = JSON.parse(data);
  	if (data === null) {
  		return;
  	}
  	else {
  		let decks = data.decks;
	  	decks = Object.values(decks);
  		this.setState({ decks, })	
  	}
  }

  componentDidMount() {
  	this.refresh_decks();
  }

  onPress = async (deck) => {
  	this.setState({ selected: deck })
  }

  resetView = () => {
  	this.setState({ selected: null });
  }

	renderItem = ({ item }) => {
		return (
			<View style={styles.deck}>
				<TouchableOpacity
	        style={styles.button}
	        onPress={() => { this.onPress(item) }}>
		      <DeckInfo deck={item}/>
	      </TouchableOpacity>
			</View>
		);
	}

	render() {
		const { decks, selected } = this.state;

		if (selected === null) {
			return (
				<View>
					<FlatList 
						data={decks}
						renderItem={this.renderItem}
					/>
				</View>
			);
		}
		else {
			return (
				<DeckPage
					deck={selected}
					resetView={this.resetView.bind(this)}
					refresh_decks={this.refresh_decks.bind(this)}/>
			);
		}
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

import React, { Component } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { getAllDecks, addDeck } from '../utils/api'
import DeckPage from './DeckPage'
import DeckInfo from './DeckInfo'
import AddDeck from './AddDeck'

export default class DeckList extends Component {
  componentDidMount() {
  	this.props.refresh_decks();
  }

  renderItem = ({ item }) => {
		return (
			<View style={styles.deck}>
				<TouchableOpacity
	        style={styles.button}
	        onPress={() => { this.props.select(item) }}>
		      <DeckInfo deck={item}/>
	      </TouchableOpacity>
			</View>
		);
	}

	render() {
		const { decks, selected } = this.props;
		
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
					resetView={this.props.resetView}
					refresh_decks={this.props.refresh_decks}/>
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

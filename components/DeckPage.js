import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, BackHandler } from 'react-native'
import { removeDeck } from '../utils/api'
import DeckInfo from './DeckInfo'

export default class DeckPage extends Component {
	componentDidMount = () => {
    BackHandler.addEventListener('hardwareBackPress', this.back_handler);
  };

  componentWillUnmount = () => {
    BackHandler.removeEventListener('hardwareBackPress', this.back_handler);
  };

  back_handler = () => {
    this.props.refresh_decks();
    return false;
  }

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
			<View style={styles.container}>
				<DeckInfo deck={deck}/>
				<View style={styles.containter}>
					<TouchableOpacity
		        style={styles.button}
		        onPress={ () => this.addCard(deck) }>
		        <Text style={styles.buttonText}>ADD CARD</Text>
		      </TouchableOpacity>
		      <TouchableOpacity
		        style={styles.button}
		        onPress={ () => this.startQuiz(deck) }>
		        <Text style={styles.buttonText}>START QUIZ</Text>
		      </TouchableOpacity>
					<TouchableOpacity
		        style={styles.deleteButton}
		        onPress={ () => this.delete(deck) }>
		        <Text style={styles.deleteButtonText}>DELETE DECK</Text>
		      </TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around',
	},
  button: {
  	backgroundColor: '#808080',
  	width: 250,
  	height: 65,
  	borderRadius: 5,
  	margin: 5,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  buttonText: {
  	fontSize: 22,
  	color: '#FFFFFF',
  },
  deleteButton: {
  	width: 250,
  	height: 65,
  	borderRadius: 5,
  	margin: 5,
  	alignItems: 'center',
  	justifyContent: 'center',
  	backgroundColor: '#EF314B'
  },
  deleteButtonText: {
  	fontSize: 22,
  	color: '#421D19',
  }
});

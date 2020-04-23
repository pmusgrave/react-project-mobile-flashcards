import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import DeckInfo from './DeckInfo'
import { addDeck, getAllDecks } from '../utils/api'
import { StackActions, NavigationActions } from 'react-navigation';

export default class AddDeck extends Component {
	state = {
		value: "",
	}

	onChangeText = (text) => {
		this.setState({ value: text });
	}

	submit = async (name) => {
		await addDeck({
			name,
			cards: [],
		});

		let updated_decks = await getAllDecks();
		let data = await getAllDecks();
    data = JSON.parse(data);
    let decks = data.decks;
    decks = Object.values(decks);
    let deck = decks.filter((d) => {
    	return d.name === name
    })[0]

    // this.props.set_needs_refresh();

		/////// source //////
		// https://stackoverflow.com/questions/46457420/remove-last-route-from-react-navigation-stack
		const resetAction = StackActions.reset({
	    index: 0,
	    actions: [NavigationActions.navigate({
	    	routeName: 'Home',
	    	// params: { refresh: true },
	    })],
		});
		this.props.navigation.dispatch(resetAction);
		///////////////////

		
		// this.props.navigation.navigate('DeckList', { refresh: true, new_deck: deck })
		this.props.navigation.navigate('DeckPage', { deck, refresh_decks:this.props.refresh_decks})
	}

	render() {
		let { value } = this.state;
		return (
			<View style={styles.header}>
				<Text style={styles.headerText}>What is the title of your new deck?</Text>
				<TextInput
		      style={styles.input}
		      onChangeText={text => this.onChangeText(text)}
		      value={value}
		    />
		    <TouchableOpacity
	        style={styles.button}
	        onPress={() => { this.submit(this.state.value) }}>
	        <Text>SUBMIT</Text>
	      </TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	header: {
		flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    margin: 5,
	},
	headerText: {
		fontSize: 22
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
	},
}

import React, { Component } from 'react'
import { View, Text, TextInput, TouchableOpacity, BackHandler } from 'react-native'
import DeckInfo from './DeckInfo'
import { addDeck, getAllDecks } from '../utils/api'
import { StackActions, NavigationActions } from 'react-navigation';

export default class AddDeck extends Component {
	state = {
		value: "",
	}

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

	onChangeText = (text) => {
		this.setState({ value: text });
	}

	submit = async (name) => {
		if (name === "" || name === undefined) {
			alert("Deck name cannot be empty")
			return;
		}
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
			<View style={styles.container}>
				<Text style={styles.headerText}>What is the title of your new deck?</Text>
				<TextInput
		      style={styles.input}
		      onChangeText={text => this.onChangeText(text)}
		      value={value}
		    />
		    <TouchableOpacity
	        style={styles.button}
	        onPress={() => { this.submit(this.state.value) }}>
	        <Text style={styles.buttonText}>SUBMIT</Text>
	      </TouchableOpacity>
			</View>
		);
	}
}

const styles = {
	container:{
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'space-around',
		margin: 20,
	},
	headerText: {
		fontSize: 24,
	},
	input: {
		borderColor: 'gray',
		borderWidth: 1,
		height: 45,
	},
	button: {
  	backgroundColor: '#808080',
  	height: 65,
  	borderRadius: 5,
  	margin: 50,
  	alignItems: 'center',
  	justifyContent: 'center',
  },
  buttonText: {
  	fontSize: 22,
  	color: '#FFFFFF',
  },
}

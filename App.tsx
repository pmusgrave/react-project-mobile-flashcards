import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { getAllDecks, addDeck } from './utils/api'
import DeckList from './components/DeckList'
import DeckInfo from './components/DeckInfo'
import AddDeck from './components/AddDeck'

export default class App extends Component {
  state = {
    showDeckList: true,
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

  select = async (deck) => {
    this.setState({ selected: deck })
  }

  resetView = () => {
    this.setState({ 
      selected: null,
    });
  }

  showDeckList = () => {
    this.setState({ 
      selected: null,
      showDeckList: true,
      showAddDeck: false,
    }); 
  }

  showAddDeck = () => {
    this.setState({ 
      selected: null,
      showDeckList: false,
      showAddDeck: true,
    });
  }

  render(){
    return(
      <View>
        {this.state.showDeckList && <DeckList
              decks={this.state.decks}
              selected={this.state.selected}
              select={this.select.bind(this)}
              resetView={this.resetView.bind(this)}
              refresh_decks={this.refresh_decks.bind(this)}/>}

        {this.state.showAddDeck && <AddDeck showDeckList={this.showDeckList.bind(this)}/>}

        <TouchableOpacity
          onPress={() => {
            this.setState({
              showDeckList: true,
              showAddDeck: false,
            });
            this.resetView();
          }}>
          <Text>Decks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { 
            this.setState({
              showAddDeck: true,
              showDeckList: false,
            });
            this.resetView();
          }}>
          <Text>Add Deck</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

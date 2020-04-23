import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { getAllDecks, addDeck } from './utils/api'
import DeckList from './components/DeckList'
import DeckPage from './components/DeckPage'
import DeckInfo from './components/DeckInfo'
import AddDeck from './components/AddDeck'

export default class App extends Component {
  state = {
    showDeckList: true,
    decks: [],
    selected: null,
  };

  componentDidMount() {
    this.refresh_decks();
  }

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
    const Tabs = createBottomTabNavigator({
      DeckList: {
        screen: (props) => 
          <DeckList {...props} 
            decks={this.state.decks}
            selected={this.state.selected}
            select={this.select.bind(this)}
            resetView={this.resetView.bind(this)}
            refresh_decks={this.refresh_decks.bind(this)}
          />,
        navigationOptions: {
          tabBarLabel: 'Decks',
        },
      },
      AddEntry: {
        screen: AddDeck,
        navigationOptions: {
          tabBarLabel: 'Add Deck',
        },
      },
    })

    const MainNavigator = createStackNavigator({
      Home: {
        screen: Tabs,
      },
      DeckPage: {
        screen: DeckPage,
      },
    })

    const AppContainer = createAppContainer(MainNavigator);

    return(
      <AppContainer />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  navButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'bottom',
    justifyContent: 'stretch',
  },
  navButtons: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createAppContainer, } from 'react-navigation';
import { getAllDecks, addDeck } from './utils/api'
import DeckList from './components/DeckList'
import DeckPage from './components/DeckPage'
import DeckInfo from './components/DeckInfo'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import Quiz from './components/Quiz'

export default class App extends Component {
  state = {
    showDeckList: true,
    decks: [],
  };

  componentDidMount() {
    this.refresh_decks();
  }

  refresh_decks = async () => {
    console.log('refreshing...')
    let data = await getAllDecks();
    data = JSON.parse(data);
    if (data === null) {
      return;
    }
    else {
      let decks = data.decks;
      decks = Object.values(decks);
      this.setState({ decks, refresh:false}) 
    }
  }

  render(){
    if (this.state.refresh) {
      this.state.refresh_decks();
    }
    const Tabs = createBottomTabNavigator({
      DeckList: {
        screen: (props) => 
          <DeckList {...props} 
            decks={this.state.decks}
            refresh_decks={this.refresh_decks.bind(this)}
          />,
        navigationOptions: {
          tabBarLabel: 'Decks',
        },
      },
      AddDeck: {
        screen: (props) => (<AddDeck refresh_decks={this.refresh_decks.bind(this)} {...props}/>),
        navigationOptions: {
          tabBarLabel: 'Add Deck',
        },
      },
    })

    const MainNavigator = createStackNavigator({
      Home: {
        screen: Tabs,
        navigationOptions: {
          title: "Mobile Flash Cards"
        }
      },
      DeckPage: {
        screen: DeckPage,
        navigationOptions: ({navigation}) => ({
          title: 'Deck',
          headerLeft: <HeaderBackButton onPress={() => this.refresh_decks()} />
        })
      },
      AddCard: {
        screen: AddCard,
        navigationOptions: {
          title: "Add Card"
        }
      },
      
      Quiz: {
        screen: Quiz,
        navigationOptions: {
          title: "Quiz",
        }
      }
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

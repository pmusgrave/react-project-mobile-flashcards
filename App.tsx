import React, { Component } from 'react';
import { StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  BackHandler
} from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import { createAppContainer, } from 'react-navigation';
import { Feather, Ionicons } from '@expo/vector-icons'
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
          tabBarIcon: () => <Feather name='layers' size={30} />
        },
      },
      AddDeck: {
        screen: (props) => (<AddDeck refresh_decks={this.refresh_decks.bind(this)} {...props}/>),
        navigationOptions: {
          tabBarLabel: 'Add Deck',
          tabBarIcon: () => <Ionicons name='md-add-circle-outline' size={30} />
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
        screen: (props) => (<DeckPage {...props} refresh_decks={this.refresh_decks.bind(this)}/>),
        navigationOptions: ({navigation}) => ({
          title: 'Deck',
          headerLeft: () => <HeaderBackButton
            onPress={() => this.refresh_decks()}
          />
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

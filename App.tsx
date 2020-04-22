import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'

export default function App() {
  const Tabs = createBottomTabNavigator({
    Decks: {
      screen: DeckList,
      navigationOptions: {
        //tabBarIcon: () => < />,
        tabBarLabel: "Decks",
      }
    },
    Add: {
      screen: AddDeck,
      navigationOptions: {
        //tabBarIcon: () => < />,
        tabBarLabel: "Add Deck",
      },
    }
  })
  const App = createAppContainer(Tabs);

  return(
    <App/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

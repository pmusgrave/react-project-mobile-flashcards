import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'

export default class Quiz extends Component {
  render() {
		return (
			<View>
				<Text>
					{this.props.navigation.state.params.deck.name}
				</Text>
			</View>
		);
	}
}

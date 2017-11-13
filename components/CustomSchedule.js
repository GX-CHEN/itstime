import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ListView,
  AsyncStorage,
  Text,
  View
} from 'react-native'


export default class CustomSchedule extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: "Add your own schedule"
  })

  constructor() {
    super()
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>
          Add your custom schedule
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    borderRadius: 10,
    padding: 10,
    textAlign: 'center'
  }
})

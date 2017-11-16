import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ListView,
  AsyncStorage,
  Text,
  View
} from 'react-native'

import {Calendar, CalendarList, Agenda} from 'react-native-calendars';

export default class CalendarScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.schedule
  })

  constructor() {
    super()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>
        </Text>
        <Calendar
          // onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
          // markedDates={{[this.state.selected]: {selected: true}}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
  header: {
    height: 50,
    backgroundColor: "#FFF"
  }
});
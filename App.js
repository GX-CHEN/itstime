import React from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

const instructions = Platform.select({
  ios: 'This is iOS Device, \n' +
    'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'This is Android Device, \n' + 
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends React.Component {
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
    height:50,
    backgroundColor: "#FFF"
  }
});




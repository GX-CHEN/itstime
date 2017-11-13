import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ListView,
  AsyncStorage,
  Text,
  View,
  TouchableHighlight,
  Button
} from 'react-native'


export default class CustomSchedule extends Component {

  static navigationOptions = {
    title: 'Customize this schedule'
  }

  constructor() {
    super()
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    const availableEvents = ['Get Up', '1st Walk', '2nd Walk', 'Daily Work out']
    this.state = {
      availableSchedules: availableEvents,
      dataSource: this.ds.cloneWithRows(availableEvents)
    }
  }

  render() {
    const {navigate} = this.props.navigation
    const {availableEvents, dataSource} = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.text}>The following is the list of events in this schedule. You can click to edit existing events, or add new event</Text>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(schedule) => (
            <View style={styles.button}>
              <TouchableHighlight style={styles.row}
                                  underlayColor="rgb(0, 122, 255)" onPress={() => navigate('EventDetail', schedule)}>
                <Text style={styles.text}>{schedule}</Text>
              </TouchableHighlight>
            </View>
          )}>
        </ListView>
        <View style={styles.button}>
          <Button
            title="Add new event"
            color="rgb(0, 122, 255)"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => navigate('EventDetail')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    paddingTop: 30
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, 0.5)',
    margin: 10,
    borderRadius: 2,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(255,255,255,.8)',
  },
  text: {
    borderRadius: 10,
    padding: 10,
    textAlign: 'center'
  },
  row: {
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

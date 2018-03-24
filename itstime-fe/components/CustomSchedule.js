import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  AsyncStorage,
  Text,
  View,
  TouchableHighlight,
  Image
} from 'react-native'

import { Button } from 'react-native-elements'
import { findSingleSchedule } from '../services/APIServices'

export default class CustomSchedule extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Customize this schedule'
  })

  constructor() {
    super()
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    const availableEvents = ['Get Up', '1st Walk', '2nd Walk', 'Daily Work out']
    this.state = {
      dataSource: this.ds.cloneWithRows(availableEvents)
    }
  }

  async componentDidMount() {
    let CurrentScheduleId;

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:CurrentScheduleId');
      CurrentScheduleId = JSON.parse(data);
    } catch (err) {
      console.error('Error loading CurrentScheduleId', err)
    }

    let scheduleEventWrapper = await findSingleSchedule(CurrentScheduleId);

    this.setState({ dataSource: this.ds.cloneWithRows(scheduleEventWrapper[0].scheduleItems) })
  }

  render() {
    const { navigate } = this.props.navigation
    const { dataSource } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.instructions}>The following is the list of events in this schedule. /n You can click to edit existing
          events, or add new event</Text>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(schedule, sectionId, rowId) => (
            <View style={styles.button}>
              <Button
                title={schedule.name}
                backgroundColor='#42a5f5'
                fontWeight='bold'
                onPress={() => navigate('EventDetail', { schedule: schedule, id: rowId, action: "edit" })}
              />
            </View>
          )}>
        </ListView>
        <View style={styles.button}>
          <Button
            title="Add New Event"
            backgroundColor='#4527a0'
            fontWeight='bold'
            onPress={() => navigate('EventDetail', { action: "add" })}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch'
  },
  button: {
    marginBottom: 15,
    alignSelf: 'stretch'
  },
  instructions: {
    margin: 15
  }
})

import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  AsyncStorage,
  Text,
  View
} from 'react-native'

import { Button } from 'react-native-elements'
import { findItemByName } from '../model/utils'


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
      dataSource: this.ds.cloneWithRows(availableEvents)
    }
  }

  async componentDidMount() {
    let AvailableScheduleEvents;
    let CurrentScheduleName;

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleEvents');
      AvailableScheduleEvents = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:CurrentScheduleName');
      CurrentScheduleName = JSON.parse(data);
    } catch (err) {
      console.error('Error loading CurrentScheduleName', err)
    }

    let currentScheduleEvents = findItemByName(CurrentScheduleName, AvailableScheduleEvents.schedules);

    this.setState({ dataSource: this.ds.cloneWithRows(currentScheduleEvents) })
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
                onPress={() => navigate('EventDetail', { schedule: schedule, id: rowId })}
              />
            </View>
          )}>
        </ListView>
        <View style={styles.button}>
          <Button
            title="Add New Event"
            backgroundColor='#4527a0'
            fontWeight='bold'
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

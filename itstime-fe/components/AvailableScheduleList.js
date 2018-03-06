import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  AsyncStorage,
  View,
} from 'react-native'

import { Button } from 'react-native-elements'
import { findPersonalSchedules } from '../services/APIServices'

export default class AvailableScheduleList extends Component {

  static navigationOptions = {
    title: 'Pre-set Schedules',
    headerLeft: null
  }

  constructor() {
    super()

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: this.ds.cloneWithRows([])
    }

  }

  async componentDidMount() {
    await AsyncStorage.getAllKeys()
      .then(AsyncStorage.mulitRemove)

    const personId = await AsyncStorage.getItem(
      '@loggedInId'
    );

    let AvailableScheduleEvents = await findPersonalSchedules(personId);

    await AsyncStorage.removeItem('@ScheduleDetails:CurrentScheduleName');

    if (!await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleEvents')) {
      await AsyncStorage.setItem(
        '@ScheduleDetails:AvailableScheduleEvents',
        JSON.stringify(
          AvailableScheduleEvents
        )
      );
    }

    try {
      const AvailableScheduleList = AvailableScheduleEvents.map(item => { return { scheduleName: item.scheduleName, scheduleId: item._id } })
      console.log(AvailableScheduleList)
      this.setState({
        dataSource: this.ds.cloneWithRows(AvailableScheduleList)
      });
      // let data = await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleList');
      // if (data) {
      //   this.setState({
      //     dataSource: this.ds.cloneWithRows(JSON.parse(data))
      //   });
      // } else {
      //   this.setState({
      //     dataSource: this.ds.cloneWithRows(['Healthy Life Style', 'Productive Day', 'Early Birds Schedule', 'Night Owls Schedule'])
      //   });
      // }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const { navigate } = this.props.navigation
    const { dataSource } = this.state
    return (
      <View style={styles.container}>
        <View>
          <Button
            large
            style={styles.button}
            icon={{ name: 'add' }}
            backgroundColor={'#4db6ac'}
            fontWeight='bold'
            title='Add Your Own Plan'
            onPress={() => {
            }}
          />
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(schedule) => (
            <View style={styles.buttonWrapper}>
              <Button
                large
                style={styles.button}
                backgroundColor={'#42a5f5'}
                fontWeight='bold'
                title={schedule.scheduleName}
                onPress={() => navigate('Agenda', { scheduleId: schedule.scheduleId, scheduleName: schedule.scheduleName })}
              />
            </View>
          )}>

        </ListView>

        <View style={styles.button}>
          <Button
            title="Logout"
            backgroundColor='red'
            fontWeight='bold'
            onPress={() => navigate('Home')}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 30,
    justifyContent: 'center'
  },
  buttonWrapper: {
    marginTop: 10
  },
  button: {
    // borderWidth: 1,
    // borderColor: 'white',
    borderRadius: 2,
    alignSelf: 'stretch',
    marginBottom: 10
  }
})

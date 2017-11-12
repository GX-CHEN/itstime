import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ListView,
  AsyncStorage,
  Text,
  View
} from 'react-native'


export default class AvailableScheduleList extends Component {

  static navigationOptions = {
    title: 'Pre-set Schedules'
  }

  constructor() {
    super()
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    const availableSchedules = ['Health Life', 'Weight Control', 'Gain Weight', 'Work out']
    this.state = {
      availableSchedules,
      dataSource: this.ds.cloneWithRows(availableSchedules)
    }
  }

  render() {
    const {navigate} = this.props.navigation
    const {availableSchedules, dataSource} = this.state
    return (
      <View>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(schedule) => (
            <Text onPress={() => navigate('Calendar', schedule)}>{schedule}</Text>
          )}>

        </ListView>
        <Text onPress={() => navigate('Calendar')}>Hello There!</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: 'lightgrey',
    padding: 10,
    paddingTop: 20,
    fontSize: 30,
    textAlign: 'center'
  }
})

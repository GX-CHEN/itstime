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
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            title="Add your own plan"
            color="rgb(0, 122, 255)"
            accessibilityLabel="Learn more about this purple button"
            onPress={() => navigate('CustomSchedule')}
          />
        </View>
        <ListView
          enableEmptySections={true}
          dataSource={dataSource}
          renderRow={(schedule) => (
            <View style={styles.button}>
              <TouchableHighlight style={styles.row}
                                  underlayColor="rgb(0, 122, 255)" onPress={() => navigate('Agenda', schedule)}>
                <Text style={styles.text}>{schedule}</Text>
              </TouchableHighlight>
            </View>
          )}>

        </ListView>
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

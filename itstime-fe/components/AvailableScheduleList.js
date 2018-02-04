import React, {Component} from 'react'
import {
  StyleSheet,
  ListView,
  AsyncStorage,
  View,
} from 'react-native'

import { Button, Header } from 'react-native-elements'
import {findAllSchedules} from '../services/APIServices'

export default class AvailableScheduleList extends Component {

  static navigationOptions = ({navigation}) => {
    return {
      header: <Header
      centerComponent={{ text: 'Pre-set Schedules', style: { color: '#fff', fontWeight: 'bold', fontSize: 20 } }}
    />}
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
    await AsyncStorage.clear()
    let AvailableScheduleEvents = await findAllSchedules();

    await AsyncStorage.setItem(
      '@ScheduleDetails:CurrentScheduleName',
      JSON.stringify("")
    );

    if (!await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleEvents')) {
      await AsyncStorage.setItem(
        '@ScheduleDetails:AvailableScheduleEvents',
        JSON.stringify(
          AvailableScheduleEvents
        )
      );
    }

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleList');
      if (data) {
        this.setState({
          dataSource: this.ds.cloneWithRows(JSON.parse(data))
        });
      } else {
        this.setState({
          dataSource: this.ds.cloneWithRows(['Healthy Life Style', 'Productive Day', 'Early Birds Schedule', 'Night Owls Schedule'])
        });
      }
    } catch (err) {
      console.error(err)
    }
  }

  render() {
    const {navigate} = this.props.navigation
    const {dataSource} = this.state
    return (
      <View style={styles.container}>
        <View>
          <Button
            large
            style={styles.button}
            icon={{name: 'add'}}
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
                  title={schedule}
                  onPress={() => navigate('Agenda', {schedule})}
                />
              </View>
          )}>

        </ListView>
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
    justifyContent:'center'
  },
  buttonWrapper: {
    marginTop: 15
  },
  button: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 2,
    alignSelf: 'stretch'
  }
})

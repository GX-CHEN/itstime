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

    AsyncStorage.setItem(
      '@ScheduleDetails:CurrentScheduleName',
      JSON.stringify("")
    );

    AsyncStorage.setItem(
      '@ScheduleDetails:AvailableScheduleEvents',
      JSON.stringify(
        {
          'Healthy Life Style': [
            {
              name: 'Wake up',
              time: '7:00',
              description: 'According to chronobiologists (specialists in the study of the body\'s physiological rhythms), our internal alarm clocks are programmed to go off after seven to eight hours sleep, which means I, like most people, get a biological wake-up call at around 7am.'
            }, {
              name: 'Eat Breakfast',
              time: '9:25',
              description: 'Studies at the University of Leeds by Professor John Blundell have shown that people who eat a breakfast that is high in carbohydrate and low in fat are less likely to binge on high-calories foods later in the day.'
            }, {
              name: 'Take light lunch',
              time: '12:20',
              description: 'The body\'s digestive processes reach top speed at around midday, so now is the time to stop for a light meal.'
            }, {
              name: 'Work out',
              time: '17:15',
              description: 'It is no coincidence that many Olympic records are broken at around this time - in fact, very few have ever been set before noon.'
            }, {
              name: 'Dinner',
              time: '18:00',
              description: 'Eating too much at this time of day can overload the digestive system. '
            }, {
              name: 'Bed Time',
              time: '22:15',
              description: 'Between 10pm and 11pm is said to be the best time to go to bed.\n' +
              'As heart-rate falls slowly this is when my body releases a further surge of sleep hormones.'
            }
          ],
          'Productive Day': [
            {
              name: 'Wake up',
              time: '6:00',
              description: 'Never use the snooze button again as it confuses your brain and body'
            }, {
              name: 'Eat Breakfast',
              time: '7:30',
              description: 'Shower, workout before breakfast'
            }, {
              name: 'Working on demanding tasks',
              time: '9:00',
              description: 'Ignore social media in the morning'
            }, {
              name: 'Packed lunch or order in',
              time: '13:00',
              description: 'You can also meet a business partner over lunch'
            }, {
              name: 'Working on easier and monotonous tasks',
              time: '14:00',
              description: 'Use the Pomodoro Technique, work in 25-minute intervals, with 5-minute breaks.'
            }, {
              name: 'Going to sleep',
              time: '23:00',
              description: 'Your brain needs at least 7H of sleep every night.'
            }
          ]
        }
      )
    );

    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.state = {
      dataSource: this.ds.cloneWithRows([])
    }

  }

  async componentDidMount() {
    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleList');
      if (data) {
        this.setState({
          dataSource: this.ds.cloneWithRows(JSON.parse(data))
        });
      } else {
        this.setState({
          dataSource: this.ds.cloneWithRows(['Healthy Life Style', 'Productive Day', 'Early Bird Schedule', 'Night Owl Schedule'])
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
                                  underlayColor="rgb(0, 122, 255)" onPress={() => navigate('Agenda', {schedule})}>
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

import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ListView,
  AsyncStorage,
  Button,
  Text,
  TextInput,
  View
} from 'react-native'


export default class EventDetail extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Input/Change Event details'
  })

  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state
    console.log(params.id)
    this.state = {
      id: params.id,
      time: params.schedule.time,
      name: params.schedule.name,
      description: params.schedule.description,
      previousSchedule: params.schedule,
      navigate: this.props.navigation.navigate,
      availableScheduleEvents: null,
      currentScheduleEvents: null,
      currentScheduleName: ""
    };
  }

  async componentDidMount() {
    let availableScheduleEvents;
    let currentScheduleName;

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:AvailableScheduleEvents');
      availableScheduleEvents = JSON.parse(data);
    } catch (err) {
      console.log(err);
    }

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:CurrentScheduleName');
      currentScheduleName = JSON.parse(data);
    } catch (err) {
      console.error('Error loading CurrentScheduleName', err)
    }

    let currentScheduleEvents = availableScheduleEvents[currentScheduleName];
    this.setState({availableScheduleEvents, currentScheduleEvents, currentScheduleName})
  }

  submitChange() {
    let updatedEntry = {
      time: this.state.time,
      name: this.state.name,
      description: this.state.description
    }
    let updatedScheduleEvents = this.state.currentScheduleEvents
    updatedScheduleEvents[this.state.id] = updatedEntry

    let updatedAvailableScheduleEvents = this.state.availableScheduleEvents
    updatedAvailableScheduleEvents[this.state.currentScheduleName] = updatedScheduleEvents

    AsyncStorage.setItem(
      '@ScheduleDetails:AvailableScheduleEvents',
      JSON.stringify(updatedAvailableScheduleEvents))

    this.state.navigate("Agenda", {schedule: this.state.currentScheduleName})
  }

  deleteEvent() {
    let updatedScheduleEvents = this.state.currentScheduleEvents
    updatedScheduleEvents.splice(this.state.id, 1)

    let updatedAvailableScheduleEvents = this.state.availableScheduleEvents
    updatedAvailableScheduleEvents[this.state.currentScheduleName] = updatedScheduleEvents

    AsyncStorage.setItem(
      '@ScheduleDetails:AvailableScheduleEvents',
      JSON.stringify(updatedAvailableScheduleEvents))

    this.state.navigate('Agenda', {schedule: this.state.currentScheduleName})
  }

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start Time</Text>
        <TextInput
          style={[{height: 40}, styles.input]}
          onChangeText={(time) => this.setState({time})}
          value={this.state.time}
        />

        <Text style={styles.text}>Event Name</Text>
        <TextInput
          style={[{height: 40}, styles.input]}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />

        <Text style={styles.text}>Description</Text>
        <TextInput
          style={[{height: 120}, styles.input]}
          multiline={true}
          numberOfLines={3}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />

        <View style={styles.button}>
          <Button
            title="Submit Change"
            color="rgb(0, 122, 255)"
            onPress={() => this.submitChange()}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete Event"
            color="rgb(255, 122, 0)"
            onPress={() => this.deleteEvent()}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
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
    marginTop: 25,
    color: 'rgba(0,0,0,0.5)'
  },
  row: {
    borderRadius: 2,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    fontSize:15,
    borderWidth: (Platform.OS === 'ios') ? 1 : 0,
    borderRadius: 2,
    borderColor: 'rgba(125, 125, 125, 0.5)',
    padding: (Platform.OS === 'ios') ? 10 : 0,
  }
})
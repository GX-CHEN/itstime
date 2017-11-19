import React, {Component} from 'react'
import {
  StyleSheet,
  AsyncStorage,
  View
} from 'react-native'

import {Button, FormLabel, FormInput} from 'react-native-elements';


export default class EventDetail extends Component {

  static navigationOptions = ({navigation}) => ({
    title: 'Input/Change Event details'
  })

  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state

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

  async submitChange() {
    let updatedEntry = {
      time: this.state.time,
      name: this.state.name,
      description: this.state.description
    }
    let updatedScheduleEvents = this.state.currentScheduleEvents
    updatedScheduleEvents[this.state.id] = updatedEntry

    let updatedAvailableScheduleEvents = this.state.availableScheduleEvents
    updatedAvailableScheduleEvents[this.state.currentScheduleName] = updatedScheduleEvents

    await AsyncStorage.setItem(
      '@ScheduleDetails:AvailableScheduleEvents',
      JSON.stringify(updatedAvailableScheduleEvents))

    this.state.navigate("Agenda", {schedule: this.state.currentScheduleName})
  }

  async deleteEvent() {
    let updatedScheduleEvents = this.state.currentScheduleEvents
    updatedScheduleEvents.splice(this.state.id, 1)

    let updatedAvailableScheduleEvents = this.state.availableScheduleEvents
    updatedAvailableScheduleEvents[this.state.currentScheduleName] = updatedScheduleEvents

    await AsyncStorage.setItem(
      '@ScheduleDetails:AvailableScheduleEvents',
      JSON.stringify(updatedAvailableScheduleEvents))

    this.state.navigate('Agenda', {schedule: this.state.currentScheduleName})
  }

  render() {

    return (
      <View style={styles.container}>
        <FormLabel>Start Time</FormLabel>
        <FormInput
          containerStyle={{margin: 10}}
          inputStyle={{width: '100%', color: 'black'}}
          onChangeText={(time) => this.setState({time})}
          value={this.state.time}
        />

        <FormLabel>Event Name</FormLabel>
        <FormInput
          containerStyle={{margin: 10}}
          inputStyle={{width: '100%', color: 'black'}}
          onChangeText={(name) => this.setState({name})}
          value={this.state.name}
        />

        <FormLabel>Description</FormLabel>
        <FormInput
          containerStyle={{margin: 10}}
          inputStyle={{width: '100%', color: 'black', marginBottom: 10}}
          multiline={true}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />

        <View style={styles.button}>
          <Button
            title="Submit Change"
            backgroundColor="rgb(0, 122, 255)"
            onPress={() => this.submitChange()}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Delete Event"
            backgroundColor="rgb(255, 122, 0)"
            onPress={() => this.deleteEvent()}
          />
        </View>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 20,
    alignSelf: 'stretch'
  }
})
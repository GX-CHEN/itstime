import React, { Component } from 'react'
import {
  StyleSheet,
  AsyncStorage,
  View
} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { removeScheduleItem, addScheduleItem, updateScheduleItem } from '../services/APIServices';

export default class EventDetail extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Input/Change Event details',
    headerLeft: null
  })

  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state

    this.state = {
      id: params.id,
      action: params.action,
      itemId: params.schedule ? params.schedule._id: null,
      time: params.schedule ? params.schedule.time: null,
      name: params.schedule ? params.schedule.name: null,
      description: params.schedule ? params.schedule.description: null,
      previousSchedule: params.schedule,
      navigate: this.props.navigation.navigate,
      currentScheduleName: ""
    };
  }

  async componentDidMount() {
    let currentScheduleName;

    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:CurrentScheduleName');
      currentScheduleName = JSON.parse(data);
    } catch (err) {
      console.error('Error loading CurrentScheduleName', err)
    }

    this.setState({ currentScheduleName })
  }

  async submitChange() {
    const currentScheduleId = await AsyncStorage.getItem(
      '@ScheduleDetails:CurrentScheduleId'
    );
    const {time, name, description, action} = this.state;
    if (action == "add") {
      addScheduleItem(currentScheduleId, name, time, description);
    } else {
      updateScheduleItem(currentScheduleId, this.state.itemId, name, time, description);
    }
    
    this.state.navigate("Agenda", { schedule: this.state.currentScheduleName })
  }

  async deleteEvent() {
    const currentScheduleId = await AsyncStorage.getItem(
      '@ScheduleDetails:CurrentScheduleId'
    );

    await removeScheduleItem(currentScheduleId, this.state.itemId);
    this.state.navigate('Agenda', { schedule: this.state.currentScheduleName })
  }

  render() {
    return (
      <View>
        <FormLabel>Start Time</FormLabel>
        <FormInput
          containerStyle={{ margin: 10 }}
          inputStyle={{ width: '100%', color: 'rgba(0,0,0,0.6)' }}
          onChangeText={(time) => this.setState({ time })}
          value={this.state.time}
        />

        <FormLabel>Event Name</FormLabel>
        <FormInput
          containerStyle={{ margin: 10 }}
          inputStyle={{ width: '100%', color: 'rgba(0,0,0,0.6)' }}
          onChangeText={(name) => this.setState({ name })}
          value={this.state.name}
        />

        <FormLabel>Description</FormLabel>
        <FormInput
          containerStyle={{ margin: 10 }}
          inputStyle={{ width: '100%', color: 'rgba(0,0,0,0.6)', paddingBottom: 10 }}
          multiline={true}
          onChangeText={(description) => this.setState({ description })}
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
    marginBottom: 15,
    alignSelf: 'stretch'
  }
})
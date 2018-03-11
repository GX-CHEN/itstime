import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  AsyncStorage
} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';
import { addSchedule } from '../services/APIServices';

export default class NewSchedules extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'New Schedules',
    headerLeft: null
  })

  constructor(props) {
    super(props);

    this.state = {
      scheduleName: null,
    }
  }

  async submitChange() {
    const { scheduleName } = this.state;

    if (!scheduleName) {
      this.setState({ errorMessage: "all the fields must be field" })
    } else {
      const personId = await AsyncStorage.getItem(
        '@loggedInId'
      );
      await addSchedule(personId, scheduleName);
      const { navigate } = this.props.navigation
      navigate('AvailableScheduleList')
    }

  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ padding: 20 }}>
        <ScrollView>
          <FormLabel>New Schedules Name</FormLabel>
          <FormInput
            placeholder='New Schedule'
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(scheduleName) => this.setState({ scheduleName })} />

          <Button
            title="Submit"
            style={styles.button}
            backgroundColor="rgb(255, 122, 0)"
            onPress={this.submitChange.bind(this)}
          />
        </ScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    marginBottom: 15,
    alignSelf: 'stretch',
    marginTop: 20
  },
  error: {
    padding: 15,
    color: 'red',
    fontSize: 18
  }
})
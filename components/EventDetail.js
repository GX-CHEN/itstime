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

  static navigationOptions = ({ navigation }) => ({
    title: 'Input/Change Event details'
  })

  constructor(props) {
    super(props);
    const {params} = this.props.navigation.state
    console.log(params)
    this.state = {
      time: params.schedule.time,
      eventName:  params.schedule.name,
      description: params.schedule.description
    };
  }

  render() {
    const {navigate} = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start Time</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(time) => this.setState({time})}
          value={this.state.time}
        />

        <Text style={styles.text}>Event Name</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(eventName) => this.setState({eventName})}
          value={this.state.eventName}
        />

        <Text style={styles.text}>Description</Text>
        <TextInput
          style={{height: 200}}
          multiline={true}
          onChangeText={(description) => this.setState({description})}
          value={this.state.description}
        />

        <View style={styles.button}>
          <Button
            title="Submit Change"
            color="rgb(0, 122, 255)"
            onPress={() => navigate('CustomSchedule')}
          />
        </View>


        <View style={styles.button}>
          <Button
            title="Delete Event"
            color="rgb(255, 122, 0)"
            onPress={() => navigate('CustomSchedule')}
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
})
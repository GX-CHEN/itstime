import React, {Component} from 'react'
import {
  Platform,
  StyleSheet,
  ListView,
  AsyncStorage,
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
    this.state = {
      startTime: "",
      endTime: "",
      eventName: "",
      details: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Start Time</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(startTime) => this.setState({startTime})}
          value={this.state.startTime}
        />

        <Text style={styles.text}>End Time</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(endTime) => this.setState({endTime})}
          value={this.state.endTime}
        />

        <Text style={styles.text}>Event Name</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(eventName) => this.setState({eventName})}
          value={this.state.eventName}
        />

        <Text style={styles.text}>Details</Text>
        <TextInput
          style={{height: 40}}
          onChangeText={(details) => this.setState({details})}
          value={this.state.details}
        />
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
import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import { Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { singupService } from '../services/APIServices'

export default class Signup extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up'
  })

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      confirmPassword: null,
      errorMessage: null
    }
  }

  async submitChange() {
    const { navigate } = this.props.navigation
    const { username, password, confirmPassword } = this.state;

    if (!(username && password && confirmPassword)) {
      this.setState({ errorMessage: "all the fields must be field" })
    } else if (password != confirmPassword) {
      this.setState({ errorMessage: "passowrd must match" })
    } else {
      const res = await singupService(username, password);

      if (res == "signup success") {
        navigate('AvailableScheduleList')
      } else if (res == "user already exist") {
        this.setState({ errorMessage: res })
      }
    }


  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ padding: 20 }}>
        {this.state.errorMessage
          && <Text style={styles.error}>{this.state.errorMessage}
          </Text>}
        <ScrollView>
          <FormLabel>Username/Email</FormLabel>
          <FormInput
            placeholder='Username'
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(username) => this.setState({ username })} />

          <FormLabel>Password</FormLabel>
          <FormInput
            placeholder='Password'
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(password) => this.setState({ password })} />

          <FormLabel>Confirm Password</FormLabel>
          <FormInput
            placeholder='Password'
            containerStyle={{ marginBottom: 10 }}
            onChangeText={(confirmPassword) => this.setState({ confirmPassword })} />

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
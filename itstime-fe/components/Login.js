import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import { Button, FormLabel, FormInput, Text } from 'react-native-elements';
import { loginService } from '../services/APIServices';

export default class Login extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerLeft: null
  })

  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      errorMessage: null
    }
  }

  async submitChange() {
    const { username, password } = this.state;

    if (!(username && password)) {
      this.setState({ errorMessage: "all the fields must be field" })
    } else {
      const res = await loginService(username, password);

      if (res == "login success") {
        const { navigate } = this.props.navigation
        navigate('AvailableScheduleList')
      } else if (res == "login fail") {
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

          <Button
            title="Submit"
            style={styles.button}
            backgroundColor="rgb(255, 122, 0)"
            onPress={this.submitChange.bind(this)}
          />
        </ScrollView>

        <View style={styles.button}>
          <Button
            title="Create New Account"
            backgroundColor='#4527a0'
            fontWeight='bold'
            onPress={() => navigate('Signup')}
          />
        </View>
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
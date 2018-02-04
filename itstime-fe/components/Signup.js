import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';
import { Button, FormLabel, FormInput } from 'react-native-elements';

export default class Signup extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up'
  })

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={{ padding: 20 }}>
        <ScrollView>
          <FormLabel>Username/Email</FormLabel>
          <FormInput placeholder='Username'
            containerStyle={{ marginBottom: 10 }} />

          <FormLabel>Password</FormLabel>
          <FormInput placeholder='Password'
            containerStyle={{ marginBottom: 10 }} />

          <FormLabel>Confirm Password</FormLabel>
          <FormInput placeholder='Password'
            containerStyle={{ marginBottom: 10 }} />

          <Button
            title="Submit"
            style={styles.button}
            backgroundColor="rgb(255, 122, 0)"
            onPress={() => navigate('AvailableScheduleList')}
          />
        </ScrollView>

        <View style={styles.button}>
          <Button
            title="Create New Account"
            backgroundColor='#4527a0'
            fontWeight='bold'
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
  }
})
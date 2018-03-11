import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage,
  Image,
  TouchableHighlight
} from 'react-native';
import { Agenda } from 'react-native-calendars';
import { findSingleSchedule } from '../services/APIServices'

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentScheduleId: this.props.navigation.state.params.scheduleId,
      currentScheduleName: this.props.navigation.state.params.scheduleName,
      currentScheduleEvents: [],
      navigate: this.props.navigation.navigate
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.schedule,
    headerLeft: (
      <TouchableHighlight onPress={() => navigation.navigate('AvailableScheduleList')}>
        <Image source={require('../asset/backButton.png')} style={{height: 30, width: 30, marginLeft: 15}}/>
      </TouchableHighlight>)
  })

  async componentDidMount() {
    let currentScheduleId;
    if (this.state.currentScheduleId) {
      currentScheduleId = this.state.currentScheduleId;
      await AsyncStorage.setItem(
        '@ScheduleDetails:CurrentScheduleId',
        JSON.stringify(this.state.currentScheduleId)
      );
    } else {
      currentScheduleId = await AsyncStorage.getItem(
        '@ScheduleDetails:CurrentScheduleId'
      );
      currentScheduleId = currentScheduleId.replace(/['"]+/g, '')
    }

    const scheduleEventWrapper = await findSingleSchedule(currentScheduleId);
    await this.setState({ currentScheduleEvents: scheduleEventWrapper[0].scheduleItems });
  }

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2018-02-01'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  async loadItems(day) {

    setTimeout(() => {
      for (let i = -7; i < 30; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const availableEvents = this.state.currentScheduleEvents
          for (let event of availableEvents) {
            this.state.items[strTime].push({
              name: event.time + ' ' + event.name,
              description: event.description
            });
          }
        }
      }

      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    const { currentScheduleName } = this.state
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text style={styles.text}
          onPress={() => this.state.navigate('CustomSchedule', { currentScheduleName })}>{item.name}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text onPress={() => this.state.navigate('CustomSchedule')}>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  text: {
    alignSelf: 'stretch',
    color: '#1976d2'
  },
  description: {
    alignSelf: 'stretch',
    color: 'gray',
    fontSize: 10
  }
});
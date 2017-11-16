import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  AsyncStorage
} from 'react-native';
import {Agenda} from 'react-native-calendars';

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: {},
      currentSchedule: this.props.navigation.state.params.schedule,
      navigate: this.props.navigation.navigate
    };
    
    AsyncStorage.setItem(
      '@ScheduleDetails:CurrentScheduleName',
      JSON.stringify(this.state.currentSchedule)
    );
  }

  static navigationOptions = ({navigation}) => ({
    title: navigation.state.params.schedule
  })

  render() {
    return (
      <Agenda
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={'2017-05-16'}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
      />
    );
  }

  async loadItems(day) {
    try {
      let data = await AsyncStorage.getItem('@ScheduleDetails:CurrentScheduleName');
      console.log('currentScheduleName ' + JSON.parse(data))
    } catch (err) {
      console.error('Error loading CurrentScheduleName', err)
    }

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const availableEvents = ['Get Up', '1st Walk', '2nd Walk', 'Daily Work out']
          for (let event of availableEvents) {
            this.state.items[strTime].push({
              name: event + ' ' + strTime,
              height: 50
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
    return (
      <View style={[styles.item, {height: item.height}]}><Text style={styles.text}
                                                               onPress={() => this.state.navigate('CustomSchedule')}>{item.name + this.state.currentSchedule}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
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
    alignSelf: 'stretch'
  }
});
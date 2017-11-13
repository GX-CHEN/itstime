import React from 'react';
import {StackNavigator} from 'react-navigation'

import CalendarScreen from './components/CalendarScreen'
import AvailableScheduleList from './components/AvailableScheduleList'
import AgendaScreen from './components/AgendaScreen'
import CustomSchedule from './components/CustomSchedule'

const App = StackNavigator({
  Home: {screen: AvailableScheduleList},
  Calendar: {screen: CalendarScreen},
  Agenda: {screen: AgendaScreen},
  CustomSchedule: {screen: CustomSchedule }
})

export default App





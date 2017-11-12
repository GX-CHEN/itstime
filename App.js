import React from 'react';
import {StackNavigator} from 'react-navigation'

import CalendarScreen from './components/CalendarScreen'
import AvailableScheduleList from './components/AvailableScheduleList'

const App = StackNavigator({
  Home: {screen: AvailableScheduleList},
  Calendar: {screen: CalendarScreen}
})

export default App





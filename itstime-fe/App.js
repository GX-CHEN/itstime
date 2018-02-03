import {StackNavigator} from 'react-navigation'

import AvailableScheduleList from './components/AvailableScheduleList'
import AgendaScreen from './components/AgendaScreen'
import CustomSchedule from './components/CustomSchedule'
import EventDetail from './components/EventDetail'

const App = StackNavigator({
  Home: {screen: AvailableScheduleList},
  Agenda: {screen: AgendaScreen},
  CustomSchedule: {screen: CustomSchedule},
  EventDetail: {screen: EventDetail}
})

export default App

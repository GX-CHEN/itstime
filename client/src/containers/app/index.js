import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../pages/login';
import Register from '../pages/register';
import ScheduleList from '../pages/scheduleList';
import CalendarEvents from '../pages/calendarEvents';
import AddSchedule from '../pages/addSchedule';
import EventView from '../pages/eventView';

const App = () => (
  <div>
    <main>
      <Route exact path="/" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/scheduleList" component={ScheduleList} />
      <Route exact path="/addSchedule" component={AddSchedule} />
      <Route exact path="/calendarEvents" component={CalendarEvents} />
      <Route exact path="/eventView" component={EventView} />
    </main>
  </div>
);

export default App;

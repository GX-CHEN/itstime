import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listEvent } from '../../action/schedule';
import { map } from 'lodash';
import { Icon, Layout, Divider } from 'antd';
import Sidebar from '../components/sidebar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

class CalendarEvents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  componentDidMount() {
    const localStorageScheduleId = localStorage.getItem('scheduleId');
    const { location, listEvent } = this.props;
    if (location.state && location.state.scheduleId) {
      listEvent(location.state.scheduleId);
    } else if (localStorageScheduleId) {
      listEvent(localStorageScheduleId);
    }
  }

  componentWillReceiveProps(nextProps) {
    function getEventItem(item) {
      let { name, time, description, _id } = item;
      const splitTime = time.split(':');
      const hour = splitTime[0];
      const minute = splitTime[1];
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour, minute);
      const end = new Date(start.getTime() + 15 * 60000);
      return { id: _id, title: name, start, end, description };
    }

    const { singleSchedule } = nextProps;
    const eventList = singleSchedule[0].scheduleItems;
    let processedEventList = { ...eventList };
    this.setState({ events: map(processedEventList, getEventItem) });
  }

  goToEvent = (event, actionType) => {
    this.props.changePage('/eventView', { event, actionType });
  };

  render() {
    if (!localStorage.getItem('userId')) {
      this.props.changePage('/');
    }

    return (
      <div>
        <Layout className="full-height">
          <Sidebar changePage={this.props.changePage} />
          <Layout>
            <Divider
              style={{
                fontSize: 22,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 400
              }}>
              Calendar Events
            </Divider>
            <div>
              <BigCalendar
                selectable
                events={this.state.events}
                defaultView="day"
                views={['day']}
                defaultDate={new Date()}
                onSelectEvent={event => this.goToEvent(event, 'update')}
                // onSelectSlot={slotInfo =>
                //   alert(
                //     `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
                //       `\nend: ${slotInfo.end.toLocaleString()}` +
                //       `\naction: ${slotInfo.action}`
                //   )
                // }
              />
            </div>
            <Icon
              onClick={() => this.goToEvent(null, 'add')}
              type="plus-circle"
              style={{
                fontSize: 40,
                color: 'rgba(0, 136, 204, 0.8)',
                position: 'fixed',
                bottom: 18,
                right: 18
              }}
            />
          </Layout>
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    singleSchedule: state.schedule.payload,
    userId: state.credential.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listEvent,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CalendarEvents);

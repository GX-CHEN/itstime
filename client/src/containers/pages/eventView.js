import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addEvent, removeEvent, updateEvent } from '../../action/schedule';
import { Form, TimePicker, Button, Input, Divider, Layout } from 'antd';
import moment from 'moment';
import Sidebar from '../components/sidebar';
import { confirmationModal } from '../components/confirmationModal';
import PropTypes from 'prop-types';

const FormItem = Form.Item;
const { TextArea } = Input;

class FormView extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      // Should format date value before submit.
      const values = {
        ...fieldsValue,
        time: fieldsValue['time'].format('HH:mm')
      };
      const localStorageScheduleId = localStorage.getItem('scheduleId');
      if (this.props.actionType === 'add') {
        this.props.addEvent(localStorageScheduleId, values['name'], values['time'], values['description']);
      } else {
        this.props.updateEvent(
          localStorageScheduleId,
          this.props.eventId,
          values['name'],
          values['time'],
          values['description']
        );
      }
    });
  };

  goToCalendar = () => {
    this.props.changePage('/calendarEvents');
  };

  deleteEvent = () => {
    confirmationModal({
      content: 'Are you sure you wish to delete this schedule?',
      onOk: () => {
        this.props.removeEvent(localStorage.getItem('scheduleId'), this.props.eventId);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const timeFormat = 'HH:mm';
    return (
      <Layout className="full-height">
        <Sidebar changePage={this.props.changePage} />
        <Layout>
          <Form onSubmit={this.handleSubmit} className="event-view-form">
            <Divider
              style={{
                fontSize: 22,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 400
              }}>
              Selected Event
            </Divider>
            <FormItem label="Event Name">
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{ required: true, message: 'Event Name is required!' }]
              })(<Input placeholder="Event Name" autoComplete="off" />)}
            </FormItem>
            <FormItem label="Start Time">
              {getFieldDecorator('time', {
                initialValue: moment(this.props.time || '08:00', timeFormat),
                rules: [{ type: 'object', required: true, message: 'Please select time!' }]
              })(<TimePicker style={{ width: '100%' }} format={timeFormat} />)}
            </FormItem>
            <FormItem label="Event Description">
              {getFieldDecorator('description', {
                initialValue: this.props.description,
                rules: [{ required: true, message: 'Event Name is required!' }]
              })(<TextArea placeholder="Event Description" rows={3} autoComplete="off" />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </FormItem>
            <FormItem>
              <Button type="danger" style={{ width: '100%' }} onClick={() => this.deleteEvent()}>
                Delete
              </Button>
            </FormItem>
            <FormItem>
              <Button style={{ width: '100%', border: 'none', color: '#1890ff' }} onClick={() => this.goToCalendar()}>
                Cancel
              </Button>
            </FormItem>
          </Form>
        </Layout>
      </Layout>
    );
  }
}

FormView.propTypes = {
  location: PropTypes.object,
  changePage: PropTypes.func,
  nextPage: PropTypes.string,
  form: PropTypes.object,
  time: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string,
  actionType: PropTypes.string,
  eventId: PropTypes.string,
  addEvent: PropTypes.func,
  updateEvent: PropTypes.func,
  removeEvent: PropTypes.func
};

const WrappedTimeRelatedForm = Form.create()(FormView);

class EventView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      eventId: '',
      description: '',
      time: null,
      actionType: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextPage === 'calendarEvents') {
      this.props.changePage('/calendarEvents');
    }
  }

  componentDidMount() {
    const { location } = this.props;

    if (location.state) {
      const { event, actionType } = location.state;
      if (event) {
        this.setState({
          name: event.title,
          eventId: event.id,
          description: event.description,
          time: `${event.start.getHours()}:${event.start.getMinutes()}`,
          actionType
        });
      } else {
        this.setState({ actionType });
      }
    }
  }

  render() {
    if (!localStorage.getItem('userId')) {
      this.props.changePage('/');
    }

    const { name, eventId, description, time, actionType } = this.state;
    return (
      <WrappedTimeRelatedForm
        className="form-wrapper"
        changePage={this.props.changePage}
        name={name}
        eventId={eventId}
        description={description}
        time={time}
        actionType={actionType}
        addEvent={this.props.addEvent}
        updateEvent={this.props.updateEvent}
        removeEvent={this.props.removeEvent}
      />
    );
  }
}

EventView.propTypes = {
  location: PropTypes.object,
  changePage: PropTypes.func,
  nextPage: PropTypes.string,
  addEvent: PropTypes.func,
  updateEvent: PropTypes.func,
  removeEvent: PropTypes.func
};

const mapStateToProps = state => {
  return {
    nextPage: state.schedule.nextPage,
    actionStatus: state.schedule.actionStatus,
    eventId: state.schedule.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addEvent,
      updateEvent,
      removeEvent,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventView);

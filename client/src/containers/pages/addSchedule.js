import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSchedule, deleteSchedule } from '../../action/schedule';
import { Form, Button, Input, Divider, Layout } from 'antd';
import Sidebar from '../components/sidebar';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class FormView extends Component {
  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }

      const values = {
        ...fieldsValue
      };
      const localStorageUserId = localStorage.getItem('userId');

      this.props.createSchedule(localStorageUserId, values['name']);
    });
  };

  goToScheduleList = () => {
    this.props.changePage('/scheduleList');
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Layout className="full-height">
        <Sidebar changePage={this.props.changePage} />
        <Layout>
          <Form onSubmit={this.handleSubmit} className="schedule-view-form">
            <Divider
              style={{
                fontSize: 22,
                textAlign: 'center',
                color: 'rgba(0, 0, 0, 0.65)',
                fontWeight: 400
              }}>
              Add Schedule
            </Divider>
            <FormItem label="Schedule Name">
              {getFieldDecorator('name', {
                initialValue: this.props.name,
                rules: [{ required: true, message: 'Schedule Name is required!' }]
              })(<Input placeholder="Schedule Name" autoComplete="off" />)}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Submit
              </Button>
            </FormItem>
            <FormItem>
              <Button
                style={{ width: '100%', border: 'none', color: '#1890ff' }}
                onClick={() => this.goToScheduleList()}>
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
  form: PropTypes.object,
  createSchedule: PropTypes.func,
  name: PropTypes.string
};

const WrappedAddScheduleForm = Form.create()(FormView);

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      scheduleId: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nextPage === 'scheduleList') {
      this.props.changePage('/scheduleList');
    }
  }

  render() {
    if (!localStorage.getItem('userId')) {
      this.props.changePage('/');
    }

    const { name, scheduleId } = this.state;
    return (
      <WrappedAddScheduleForm
        className="form-wrapper"
        changePage={this.props.changePage}
        name={name}
        scheduleId={scheduleId}
        createSchedule={this.props.createSchedule}
      />
    );
  }
}

AddSchedule.propTypes = {
  location: PropTypes.object,
  changePage: PropTypes.func,
  nextPage: PropTypes.string,
  createSchedule: PropTypes.func
};

const mapStateToProps = state => {
  return {
    nextPage: state.schedule.nextPage,
    actionStatus: state.schedule.actionStatus,
    scheduleId: state.schedule.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createSchedule,
      deleteSchedule,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddSchedule);

import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSchedule, deleteSchedule } from '../../action/schedule';
import { map } from 'lodash';
import { List, Card, Icon, Layout, Divider } from 'antd';
import Sidebar from '../components/sidebar';
import { confirmationModal } from '../components/confirmationModal';

class ScheduleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleListWithDesc: []
    };
  }

  componentDidMount() {
    this.fetchScheduleList();
  }

  componentWillReceiveProps(nextProps) {
    function getShortDesc(item) {
      let { scheduleItems, scheduleName, _id } = item;
      let desc = '';
      scheduleItems.forEach(element => {
        desc = `${desc}${element.name}, `;
      });
      return { _id, name: scheduleName, desc };
    }

    const { scheduleList, actionStatus } = nextProps;
    if (actionStatus === 'remove_schedule_succeed') {
      this.fetchScheduleList();
    } else {
      let scheduleListWithDesc = { ...scheduleList };
      this.setState({
        scheduleListWithDesc: map(scheduleListWithDesc, getShortDesc)
      });
    }
  }

  fetchScheduleList = () => {
    const localStorageUserId = localStorage.getItem('userId');
    const { location, listSchedule } = this.props;
    if (location.state && location.state.userId) {
      listSchedule(location.state.userId);
    } else if (localStorageUserId) {
      listSchedule(localStorageUserId);
    } else {
      this.props.changePage('/');
    }
  };

  goToAgenda = id => {
    localStorage.setItem('scheduleId', id);
    this.props.changePage('/calendarEvents', { scheduleId: id });
  };

  handleDeleteSchedule = id => {
    confirmationModal({
      content: 'Are you sure you wish to delete this schedule?',
      onOk: () => {
        this.props.deleteSchedule(id);
      }
    });
  };

  render() {
    if (!localStorage.getItem('userId')) {
      this.props.changePage('/');
    }

    return (
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
            Schedule List
          </Divider>
          <div>
            <div style={{ margin: 30 }}>
              <List
                grid={{ gutter: 16, xs: 1, sm: 2, md: 2, lg: 2, xl: 3, xxl: 3 }}
                dataSource={this.state.scheduleListWithDesc}
                renderItem={item => (
                  <List.Item>
                    <Card
                      title={<a onClick={this.goToAgenda.bind(this, item._id)}>{item.name}</a>}
                      style={{
                        height: 240,
                        minWidth: 240,
                        overflow: 'hidden'
                      }}>
                      <p onClick={this.goToAgenda.bind(this, item._id)}>{item.desc || 'Nothing now :) Add your events.'}</p>
                      <Icon
                        onClick={() => this.handleDeleteSchedule(item._id)}
                        type="delete"
                        style={{
                          fontSize: 24,
                          color: 'red',
                          position: 'absolute',
                          bottom: 18,
                          right: 18
                        }}
                      />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </div>
          <Icon
            onClick={() => this.props.changePage('addSchedule')}
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
    );
  }
}

const mapStateToProps = state => {
  return {
    actionStatus: state.schedule.actionStatus,
    scheduleList: state.schedule.payload,
    userId: state.credential.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listSchedule,
      deleteSchedule,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);

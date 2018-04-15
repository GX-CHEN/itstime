import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { listSchedule } from '../../action/schedule';
import { map } from 'lodash';
import { List, Card, Icon, Layout, Divider } from 'antd';
import Sidebar from '../components/sidebar';

class ScheduleList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scheduleListWithDesc: []
    };
  }

  async componentDidMount() {
    const localStorageUserId = await localStorage.getItem('userId');
    const { location, listSchedule } = this.props;
    if (location.state && location.state.userId) {
      listSchedule(location.state.userId);
    } else if (localStorageUserId) {
      listSchedule(localStorageUserId);
    } else {
      this.props.changePage('/');
    }
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

    const { scheduleList } = nextProps;
    let scheduleListWithDesc = { ...scheduleList };
    this.setState({
      scheduleListWithDesc: map(scheduleListWithDesc, getShortDesc)
    });
  }

  goToAgenda = id => {
    localStorage.setItem('scheduleId', id);
    this.props.changePage('/calendarEvents', { scheduleId: id });
  };

  render() {
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
                      <p onClick={this.goToAgenda.bind(this, item._id)}>{item.desc}</p>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </div>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    scheduleList: state.schedule.payload,
    userId: state.credential.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      listSchedule,
      changePage: (route, params) => push(route, params)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);

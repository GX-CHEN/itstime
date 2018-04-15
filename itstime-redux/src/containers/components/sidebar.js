import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const { Sider } = Layout;

class Sidebar extends React.Component {
  routeToScheduleList = () => {
    this.props.changePage('/scheduleList');
  };

  routeToLogin = () => {
    localStorage.setItem('userId', "");
    this.props.changePage('/');
  };

  routeToAddSchedule = () => {
    this.props.changePage('/addSchedule');
  };
  render() {
    return (
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        // onCollapse={(collapsed, type) => {
        //   console.log(collapsed, type);
        // }}
      >
        <div className="logo">ITS TIME</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Icon type="layout" />
            <span className="nav-text" onClick={this.routeToScheduleList}>
              Schedule List
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="plus-circle-o" />
            <span className="nav-text" onClick={this.routeToAddSchedule}>
              Add Schedule
            </span>
          </Menu.Item>
          <Menu.Item key="3" style={{ position: 'absolute', bottom: 20 }}>
            <Icon type="poweroff" style={{ color: 'red' }} />
            <span className="nav-text" style={{ color: 'red' }} onClick={this.routeToLogin}>
              Logout
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Sidebar;

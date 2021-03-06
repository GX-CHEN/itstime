import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';
import { confirmationModal } from '../components/confirmationModal';
import { logout } from '../../action/credential';
import PropTypes from 'prop-types';

const { Sider } = Layout;

class Sidebar extends React.Component {
  routeToScheduleList = () => {
    this.props.changePage('/scheduleList');
  };

  handleLogout = () => {
    confirmationModal({
      title: 'Confirm Logout',
      content: 'Are you sure to logout?',
      onOk: () => {
        this.props.logout();
        sessionStorage.setItem('userId', '');
        this.props.changePage('/');
      }
    });
  };

  routeToAddSchedule = () => {
    this.props.changePage('/addSchedule');
  };

  render() {
    return (
      <Sider breakpoint="lg" collapsedWidth="0">
        <div className="logo">ITS TIME</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1" onClick={this.routeToScheduleList}>
            <Icon type="layout" />
            <span className="nav-text">Schedule List</span>
          </Menu.Item>
          <Menu.Item key="2" onClick={this.routeToAddSchedule}>
            <Icon type="plus-circle-o" />
            <span className="nav-text">Add Schedule</span>
          </Menu.Item>
          <Menu.Item key="3" style={{ position: 'absolute', bottom: 25 }} onClick={this.handleLogout}>
            <Icon type="poweroff" style={{ color: 'red' }} />
            <span className="nav-text" style={{ color: 'red', fontSize: 18 }}>
              Logout
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  location: PropTypes.object,
  changePage: PropTypes.func,
  logout: PropTypes.func
};

const mapStateToProps = state => {
  return {
    userId: state.credential.payload
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logout
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);

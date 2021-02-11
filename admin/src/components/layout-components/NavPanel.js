import React, { Component } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { connect } from "react-redux";

export class NavPanel extends Component {
	state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.reload()
  }

  onClose = () => {
    this.setState({
      visible: false,
    });
	};
	
	render() {
		return (
      <>
        <Menu mode="horizontal">
          <Menu.Item onClick={this.showDrawer}>
            <Button onClick = {() => {this.onLogout()}} className="bg-danger text-white">Log Out</Button>
          </Menu.Item>
        </Menu>
        {/* <Drawer
          title="Theme Config"
          placement="right"
          width={350}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          NavPanel Contents here!
        </Drawer> */}
      </>
    );
	}
}

const mapStateToProps = ({ theme }) => {
  const { locale } =  theme;
  return { locale }
};

export default connect(mapStateToProps)(NavPanel);
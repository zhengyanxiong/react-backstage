import React from 'react'
import {Icon, Badge, Dropdown, Menu, Modal} from 'antd'
import {isAuthenticated, clearName,clearToken} from "../../util/Cookie"
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import "../../App.css"

class HeaderBar extends React.Component {
    constructor(props) {
        super(props)
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    state = {
        icon: 'arrows-alt',
        count: 100,
        visible: false,
        avatar: require('./img/04.jpg')
    };

    toggle = () => {
        this.props.onToggle()

    };

    logout = () => {
        clearName();
        clearToken();
        this.context.router.history.push("/");
    };

    render() {
        const {icon, count, visible, avatar} = this.state
        const {appStore, collapsed, location} = this.props
        const notLogin = (
            <div>
                <Link to={{pathname: '/login', state: {from: location}}}
                      style={{color: 'rgba(0, 0, 0, 0.65)'}}>登录</Link>&nbsp;
                <img src={require('../../assets/img/defaultUser.jpg')} alt=""/>
            </div>
        );
        const menu = (
            <Menu className='menu'>
                <Menu.ItemGroup title='用户中心' className='menu-group'>
                    <Menu.Item>你好 - {isAuthenticated()}</Menu.Item>
                    <Menu.Item>个人信息</Menu.Item>
                    <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='设置中心' className='menu-group'>
                    <Menu.Item>个人设置</Menu.Item>
                    <Menu.Item>系统设置</Menu.Item>
                </Menu.ItemGroup>
            </Menu>
        );
        const login = (
            <Dropdown overlay={menu}>
                <img src={avatar} alt=""/>
            </Dropdown>
        );
        return (
            <div id='headerbar'>
                <div style={{lineHeight: '64px', float: 'right'}}>
                    <ul className='header-ul'>
                        <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
                        <li onClick={() => this.setState({count: 0})}>
                            <Badge count={99} overflowCount={99} style={{marginRight: -17}}>
                                <Icon type="notification"/>
                            </Badge>
                        </li>
                        <li>
                            {login}
                        </li>
                    </ul>
                </div>
                <Modal
                    footer={null} closable={false}
                    visible={visible}
                    wrapClassName="vertical-center-modal"
                    onCancel={() => this.setState({visible: false})}>
                    <img src={avatar} alt="" width='100%'/>
                </Modal>
            </div>
        )
    }
}

export default HeaderBar
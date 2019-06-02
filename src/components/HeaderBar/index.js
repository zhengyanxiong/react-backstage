import React from 'react'
import {Icon, Badge, Dropdown, Menu, Modal,Tag,Button} from 'antd'
import {isAuthenticated, clearName,clearToken} from "../../util/Cookie"
import {Link, withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import "../../App.css"
import UpdateSu from "../../components/HeaderBar/modal/updateSu";
import {_updateAdCheck} from "../../api/userAdmin";
import {_updateAdmin} from "../../api/userAdmin";
import {getAdmin} from "../../util/Cookie"


class HeaderBar extends React.Component {
    constructor(props) {
        super(props);
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    state = {
        icon: 'arrows-alt',
        count: 100,
        visible: false,
        avatar: require('./img/04.jpg'),
        upVisible:false,
        suDetail:{
            password:'',
            passwordNew:'',
            adminName:''
        },
        isOk:"true",
        key:1,
        footer:null
    };

    toggle = () => {
        this.props.onToggle()

    };

    async updateAdCheck(data) {
        const res = await _updateAdCheck(data);
        if (res=='Y'){
            this.setState({
                footer:[
                    <Button key="back" onClick={this.handleCancel}>取消</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        确定
                    </Button>,
                ],
                key:2
            })
        }
    }

    async updateAdmin(data) {
        const res = await _updateAdmin(data);
       Modal.success({
            title: '修改成功',
                content: '管理员信息修改成功！',
        });
    }

    logout = () => {
        clearName();
        clearToken();
        this.context.router.history.push("/");
    };
    toSpringAdmin=()=>{
        window.open('about:blank').location.href='http://localhost:8769/login'
    };
    //modal取消事件通用
    handleCancel = () => {
        this.setState({
            upVisible: false
        });
    };
    //获取子菜单元素数据等
    formUpSuRef = (ref) => {
        this.childUpSu = ref
    };
    clickToUp=()=>{
        this.setState({
            upVisible: true
        });
    };
    handleOkOne=()=>{
        const form = this.formUpSuRef.props.form;
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields((err, values) => {
            if (err) {
                return;
            } else {
                // console.log("formEndUpRef:", this.formUpAdminRef);
                var suDetail = this.childUpSu.getUpItemsValueSu();
                //console.log("aaa",getAdmin());
                var data = {
                    adminId:1,
                    adminPassword: suDetail.password
                };
                //console.log('修改表单数据: ', data);
                this.updateAdCheck(data);
            }
            form.resetFields();
        });
    };
    render() {
        const {icon, count, visible, avatar} = this.state;
        const {appStore, collapsed, location} = this.props;
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
                    <Menu.Item><span onClick={this.logout}>退出登录</span></Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='设置中心' className='menu-group'>
                    <Menu.Item onClick={this.clickToUp}>
                        修改密码
                    </Menu.Item>
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
                        <li><label>如果你是技术管理员，请点击<Tag style={{marginLeft: "4px"}} color="volcano" onClick={this.toSpringAdmin}>这里</Tag></label></li>
                        <li><Icon type={icon} onClick={this.screenfullToggle}/></li>
                        <li onClick={() => this.setState({count: 0})}>
                                <Icon type="notification"/>
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
                <UpdateSu visible={this.state.upVisible}
                          onOk={this.handleOkOne} onCancel={this.handleCancel}
                          wrappedComponentRef={(form) => this.formUpSuRef = form}
                          formUpSuRef={this.formUpSuRef}
                          isOk={this.state.isOk}
                          key={this.state.key}
                          footer={this.state.footer}
                          handleOkOne={this.handleOkOne}
                />

            </div>
        )
    }
}

export default HeaderBar
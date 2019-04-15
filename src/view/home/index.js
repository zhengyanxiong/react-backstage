import React, {Component} from "react"
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom"
import '../../App.css';
import HeaderBar from "../../components/HeaderBar"
import MainContent from "../../components/MainContent"
import {isAuthenticated, isSupAdmin} from "../../util/Cookie"

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;

class Index extends Component {
    constructor(props) {
        super(props)
        if (!isAuthenticated())
            this.props.history.push("/login");
        else {
            this.props.history.push("/index/homePage")
        }
    }

    state = {
        adminType: true,
        collapsed: false,
    };

    toggle = () => {
        console.log("collapsed", this.state);
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    componentDidMount() {
        this.setState({
            adminType: isSupAdmin()
        })
    }

    render() {
        let {routes} = this.props;
        let _this = this.state;
        return (
            <Layout>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                    mode="inline"
                >
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Link to="/index/homePage">
                                <Icon type="home"/>
                                <span>首页</span>
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="team"/><span>用户信息管理</span></span>}
                        >
                            <Menu.Item key="4">
                                <Link to="/index/userManagement">
                                    <span>用户信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <Link to="/index/checkUserManagement">
                                    <span>审核注册</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="dropbox"/><span>闲置管理</span></span>}
                        >
                            <Menu.Item key="12">
                                <Link to="/index/goodsManagement">
                                    <span>闲置信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="13">
                                <Link to="/index/goodsClassManagement">
                                    <span>闲置分类</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub3"
                            title={<span><Icon type="fire"/><span>活动管理</span></span>}
                        >
                            <Menu.Item key="14">
                                <Link to="/index/activeManagement">
                                    <span>活动信息</span>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="15">
                                <Link to="/index/activeEnterManagement">
                                    <span>活动报名</span>
                                </Link>
                            </Menu.Item>
                        </SubMenu>
                        <Menu.Item key="10">
                            <Link to="/index/orderManagement">
                                <Icon type="check-circle"/>
                                <span>订单管理</span>
                            </Link>
                        </Menu.Item>
                        {_this.adminType === "false" ? <Menu.Item key="3">
                            <Link to="/index/adminManagement"><Icon type="team"/><span>管理员管理</span></Link>
                        </Menu.Item> : ""}
                        <Menu.Item key="2">
                            <Link to="/index/dataAnalysis">
                                <Icon type="dot-chart"/>
                                <span>数据分析</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="8">
                            <Link to="/index/aboutManagement">
                                <Icon type="info-circle-o"/>
                                <span>关于</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{background: '#fff', padding: 0}}>
                        <Icon
                            className="trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                        <HeaderBar/>
                    </Header>
                    <Content>
                        <MainContent routes={routes}/>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2019 Created by campus-put team
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Index;
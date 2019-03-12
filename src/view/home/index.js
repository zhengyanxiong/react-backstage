import React, {Component} from "react"
import {Layout, Menu, Icon} from 'antd';
import {Link} from "react-router-dom"
import '../../App.css';
import HeaderBar from "../../components/HeaderBar"
import MainContent from "../../components/MainContent"
import {isAuthenticated} from "../../util/Cookie"

const {SubMenu} = Menu;
const {Header, Content, Sider, Footer} = Layout;

class Index extends Component {
    constructor(props){
        super(props)
        if(!isAuthenticated())
            this.props.history.push("/login")
        else
            this.props.history.push("/index/homePage")
    }
    state = {
        collapsed: false,
    };

    toggle = () => {
        console.log("collapsed", this.state)
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }


    componentDidMount() {
        //this.props.history.push("/index/homePage")
    }

    render() {
        let {routes} = this.props
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
                        <Menu.Item key="2">
                            <Link to="/index/dataAnalysis">
                                <Icon type="desktop"/>
                                <span>数据分析</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to="/index/adminManagement"><Icon type="team"/><span>管理员管理</span></Link>
                        </Menu.Item>
                        <SubMenu
                            key="sub1"
                            title={<span><Icon type="user"/><span>用户信息管理</span></span>}
                        >
                            <Menu.Item key="4">用户信息</Menu.Item>
                            <Menu.Item key="5">审核注册</Menu.Item>
                        </SubMenu>
                        <SubMenu
                            key="sub2"
                            title={<span><Icon type="appstore"/><span>物品信息管理</span></span>}
                        >
                            <Menu.Item key="6">发布</Menu.Item>
                            <Menu.Item key="7"><Link to="/index/dataAnalysis">....</Link></Menu.Item>
                        </SubMenu>

                        <Menu.Item key="8">
                            <Icon type="info-circle-o"/>
                            <span>关于</span>
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
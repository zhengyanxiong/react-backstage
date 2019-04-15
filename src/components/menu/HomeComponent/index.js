import React, {Component} from "react"
import {Layout, Col, Row,Badge} from 'antd';
import Icon from '../../Utils/Icon/Icon.js';
import {_getUserByUserState} from '../../../api/user'
import {_getActiveCount} from '../../../api/active'
import {_getOrderCount} from '../../../api/order'
import 'echarts/map/js/china';
import BaseComponent from '../../Utils/BaseComponent';
import Panel from '../../Utils/Panel';
import G2 from '../../Utils/Charts/G2';
import DataSet from '@antv/data-set';
import './index.less';
import '../../../components/Utils/assets/styles/index.less'
const {Content} = Layout;
const {Chart, Axis, Geom, Tooltip, Legend, Coord, Label} = G2;
const rankingListData = [];

// https://alibaba.github.io/BizCharts/demo-detail.html?code=demo/line/series
const Line1 = props => {
    const data = [
        {month: '一月', user: 7.0, order: 3.9},
        {month: '二月', user: 6.9, order: 4.2},
        {month: '三月', user: 9.5, order: 5.7},
        {month: '四月', user: 14.5, order: 8.5},
        {month: '五月', user: 18.4, order: 11.9},
        {month: '六月', user: 21.5, order: 15.2},
        {month: '七月', user: 25.2, order: 17.0},
        {month: '八月', user: 26.5, order: 16.6},
        {month: '九月', user: 23.3, order: 14.2},
        {month: '十月', user: 18.3, order: 10.3},
        {month: '十一月', user: 13.9, order: 6.6},
        {month: '十二月', user: 9.6, order: 4.8}
    ];
    const ds = new DataSet();
    const dv = ds.createView().source(data);
   /* const cols = {
        user: { alias: '活跃用户' },
        order: { alias: '成交量' }
    };*/
    dv.transform({
        type: 'fold',
        fields: ['user', 'order'], // 展开字段集
        key: 'data', // key字段
        value: 'value' // value字段
    });

    const cols = {
        month: {
            range: [0, 1]
        }
    };
    return (
        <Chart data={dv} scale={cols}>
            <Legend/>
            <Axis name="month"/>
            <Axis name="value" label={{formatter: val => `${val}`}}/>
            <Tooltip crosshairs={{type: 'y'}}/>
            <Geom type="line" position="month*value" size={2} color={'data'}/>
            <Geom
                type="point"
                position="month*value"
                size={4}
                shape={'circle'}
                color={'data'}
                style={{stroke: '#fff', lineWidth: 1}}
            />
        </Chart>
    );
};
for (let i = 0; i < 7; i += 1) {
    rankingListData.push({
        title: `用户 ${i} 号店`,
        total: 323234
    });
}

class HomeComponent extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            show:true,
            count:0,
            countState:0,
            activeCount:0,
            orderCount:0,
            homeLoading:true
        }
    }
    componentDidMount() {
        this.getUserByUserState({params:{"userState":1}});
        this.getActiveCount();
        this.getUser({params:{"userState":2}});
        this.getOrderCount();
    }

    async getUser(data) {
        const res = await _getUserByUserState(data);
        console.log("返回数据count：", res);
        this.setState({
            count: res
        })
    }
    async getActiveCount(data) {
        const res = await _getActiveCount(data);
        console.log("返回数据count：", res);
        this.setState({
            activeCount: res
        })
    }
    async getOrderCount(data) {
        const res = await _getOrderCount(data);
        console.log("返回数据count：", res);
        this.setState({
            orderCount: res
        })
    }
    async getUserByUserState(data) {
        const res = await _getUserByUserState(data);

        console.log("返回数据count：", res);
        this.setState({
            countState: res
        })
        /*localStorage.setItem('username',res.data.data.name)
          this.props.history.push({pathname:'/home'});*/
        //alert(this.state.count);
    }

    clickUserNo=()=>{
        const {from} = this.props.location.state || {from: {pathname: '/index/checkUserManagement'}};
        this.props.history.push(from)
    };
    clickActive=()=>{
        const {from} = this.props.location.state || {from: {pathname: '/index/activeManagement'}};
        this.props.history.push(from)
    };
    render() {
        return (
            <div>
                <Layout className="full-layout page dashboard-page">

                    <Content>
                        <Row gutter={20}>
                            <Col md={6} onClick={this.clickUserNo}>
                                <Panel className="qq" header={false} cover >
                                    <Icon type="aliwangwang" antd/>

                                        <Badge dot={this.state.show} style={{ marginTop: 10 }}>
                                            <h2>
                                                <b>{this.state.countState}</b>
                                            </h2>
                                        </Badge>

                                    <h5 className="text-muted">未读消息</h5>
                                </Panel>
                            </Col>
                            <Col md={6}>
                                <Panel className="wechat" header={false} cover>
                                    <Icon type="user" antd/>
                                    <h2>
                                        <b>{this.state.count}</b>
                                    </h2>
                                    <h5 className="text-muted">已注册</h5>
                                </Panel>
                            </Col>
                            <Col md={6}>
                                <Panel className="skype" header={false} cover>
                                    <Icon type="rise" antd/>
                                    <h2>
                                        <b>{this.state.orderCount}</b>
                                    </h2>
                                    <h5 className="text-muted">成交量</h5>
                                </Panel>
                            </Col>
                            <Col md={6}onClick={this.clickActive}>
                                <Panel className="github" header={false} cover>
                                    <Icon type="sound" antd/>
                                    <Badge dot={this.state.show} style={{ marginTop: 10 }}>
                                        <h2>
                                            <b>{this.state.activeCount}</b>
                                        </h2>
                                    </Badge>
                                    <h5 className="text-muted">活动</h5>
                                </Panel>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Panel title="数据面板">
                                    <div className="flex">
                                        <div className="flex-auto-hidden flex flex-column">
                                            <h4 className="flex-none">用户与销售量分布</h4>
                                            <div className="flex-auto-hidden">
                                                <Line1 />
                                            </div>
                                        </div>
                                        <div className="flex-none sales-order">
                                            <h4>销售额排名</h4>
                                            <ul>
                                                {rankingListData.map((item, i) => (
                                                    <li key={item.title}>
                                                        <span>{i + 1}</span>
                                                        <span>{item.title}</span>
                                                        <span>{item.total}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </Panel>
                            </Col>
                        </Row>
                    </Content>
                </Layout>
            </div>
        )
    }
}


export default HomeComponent;
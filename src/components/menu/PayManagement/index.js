import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {_getPayListInPage} from "../../../api/pay";
import moment from 'moment';
import {
    Form, Input, Modal, Icon, Cascader, Button, Table, Tooltip, Tag, DatePicker,Row,Col
} from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tData: [],
            count: 0,
            page: 1,
            limit: 10,
            record: 0,
            rowkey: 0,
            selectedRowKeys: [],
            loading: false,
            payDetail: {
                username: '',
                payTime: '',
            },
            index: '',
            visible: false,
            payLoading: true,
        }
    }

    componentDidMount() {
        this.getPayListInPage({
            params: {
                page: 1,
                limit: 10,
            }
        })
    }

    async getPayListInPage(data) {
        const res = await _getPayListInPage(data);
        //console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            payLoading: false
        })
    }

    //判读是否为空,通用
    isNull = (charts) => {
        if (charts == null || charts == "" || charts == "undefined" || charts === undefined) {
            return true
        } else
            return false
    };
    //modal取消事件通用
    handleCancel = () => {
        this.setState({
            visible: false,
            payDetailVisible: false,
        });
    };

    //获取table行的记录以及行主键
    handleRecord = (record, rowkey) => {
        this.setState({
            record: record,
            rowkey: rowkey,
            //endpointDetaeilVisible: false
        })
    };

    //按条件查询
    getPayByName = (page, limit) => {
        if (!this.isNull(this.state.tData)) {
            // console.log('page：', page);
            //console.log('limit：', limit);
            var data = {
                params: {
                    page: page,
                    limit: limit
                }
            };
            var orderNum = this.props.form.getFieldValue("orderNum");
            var payEndTime = this.props.form.getFieldValue("payEndTime");
            var payStartTime = this.props.form.getFieldValue("payStartTime");
            if (this.isNull(limit)) {
                if (!this.isNull(orderNum)) {
                    data = {
                        params: {
                            orderNum: orderNum,
                            payEndTime:payEndTime,
                            payStartTime:payStartTime,
                            page: this.state.page,
                            limit: this.state.limit
                        }
                    }
                } else {
                    data = {
                        params: {
                            payEndTime:payEndTime,
                            payStartTime:payStartTime,
                            page: this.state.page,
                            limit: this.state.limit
                        }
                    }
                }
            } else {
                if (!this.isNull(orderNum)) {
                    data = {
                        params: {
                            payEndTime:payEndTime,
                            payStartTime:payStartTime,
                            orderNum: orderNum,
                            page: page,
                            limit: limit
                        }
                    }
                }
            }
            // console.log("传的data参数:", data)
            this.getPayListInPage(data);
            setTimeout(() => {
                this.setState({
                    payLoading: false
                });
            }, 3000);
        } else {
            Modal.error({
                title: '查询支付信息失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };
    isNull = (charts) => {
        if (charts == null || charts == "" || charts == "undefined" || charts === undefined) {
            return true
        } else
            return false
    };

    render() {
        const _this = this;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        const formItemLayout1 = {
            labelCol: {span: 7},
            wrapperCol: {span: 16}
        };
        const {getFieldDecorator} = _this.props.form;
        //选择框
        const columns = [{
            title: '序号',
            align: 'center',
            fixed: 'left',
            dataIndex: 'key',
            width: 70,
            render: (text, record, index) => `${((_this.state.page) - 1) * (_this.state.limit) + index + 1}`

        }, {
            title: '用户名',
            dataIndex: 'username',
            width:90,
            render(text, record, index) {
            if (_this.isNull(_this.state.tData[index].username)){
                    return <Tag color="red">{_this.state.tData[index].userId}</Tag>
                }else {
                return _this.state.tData[index].username
            }
            }
        }, {
            title: '订单号',
            dataIndex: 'payExpand4',
        }, {
            title: '订单名称',
            dataIndex: 'payExpand5',
        }, {
            title: '支付金额',
            dataIndex: 'payMoney',
            width:100,
            render(payMoney) {
                return <Tag color="red">￥{payMoney}</Tag>
            }
        }, {
            title: '支付宝交易号',
            dataIndex: 'payExpand3',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 180,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        }, {
            title: '支付报文',
            dataIndex: 'payExpand2',
            onCell: () => {
                return {
                    style: {
                        maxWidth: 180,
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                    }
                }
            },
            render: (text) => <Tooltip placement="topLeft" title={text}>{text}</Tooltip>
        }, {
            title: '支付状态',
            dataIndex: 'payState',
            render(payState) {
                if (payState == 0) {
                    return <Tag color="red">未支付</Tag>
                } else if (payState == 1) {
                    return <Tag color="green">已支付</Tag>
                }
            }
        }, {
            title: '支付时间',
            dataIndex: 'formatTime',
        }];

        //分页
        const pagination = {
            total: _this.state.count,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
                _this.getPayByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            },
            onChange(current, pageSize) {
                //console.log('Current: ', typeof (current));
                _this.getPayByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            }
        };

        return (
            <div>
                <CustomBreadcrumb arr={["支付管理"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <Row>
                                <Col span={7} style={{textAlign: 'left'}}>
                                    <FormItem label="订单号："
                                              {...formItemLayout}
                                    >
                                        {getFieldDecorator('orderNum')(
                                            <Input placeholder="请输入..."/>
                                        )}

                                    </FormItem>
                                </Col>
                                <Col span={7} style={{textAlign: 'left'}}>

                                <FormItem label="支付开始时间："
                                          {...formItemLayout1}>
                                    {getFieldDecorator('payStartTime')(
                                        <DatePicker
                                            placeholder="开始时间"
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={this.disabledDate}
                                            disabledTime={this.disabledDateTime}
                                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                                        />
                                    )}
                                </FormItem>
                                </Col>
                                <Col span={7} style={{textAlign: 'left'}}>

                                <FormItem label="结束时间："
                                          {...formItemLayout}>
                                    {getFieldDecorator('payEndTime')(
                                        <DatePicker
                                            placeholder="结束时间"
                                            format="YYYY-MM-DD HH:mm:ss"
                                            disabledDate={this.disabledDate}
                                            disabledTime={this.disabledDateTime}
                                            showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                                        />
                                    )}
                                </FormItem>
                                </Col>
                                <Col span={2} >
                                    <FormItem {...formItemLayout} style={{
                                        float: "left"
                                    }}>
                                        <Button type="primary" className="btn" style={{margin: "4px 0 0 0"}}
                                                onClick={this.getPayByName}>
                                            <Icon type="search"/>查询
                                        </Button>
                                    </FormItem>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <Table
                        className="ant-table-thead ant-table-tbody"
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.payId}
                        columns={columns}
                        loading={this.state.payLoading}
                    >
                    </Table>
                </div>
            </div>
    )
    }
    }

    Index = Form.create()(Index);
    export default Index;
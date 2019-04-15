import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {_getOrderListInPage} from "../../../api/order";
import {_getOrderAllInfoById} from "../../../api/order";
import OrderDetail from "../../menu/OrderManagement/modal/orderDetail";

import {
    Form, Input, Modal, Icon, Cascader, Button, Table, Tag, Select,message
} from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const {Option} = Select;


class Index extends Component {
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
            orderDetail: {
                orders: {
                    orderId: 0,
                    receiptId: 0,
                    userId: 0,
                    orderGoodsCount: 0,
                    orderNum: "",
                    confirmReceiptTime: "",
                    orderAmount: 0,
                    orderState: 0,
                    orderTime: "",
                    sellname: "",
                    username: "",
                    studentId: "",
                    addressName: "",
                    comment: "",
                    serviceNum: 0,
                    descriptionNum: 0,
                    damageNum: 0,
                    commentCreatedTime:""
                },
                goodsList: [{
                    goodsId: 0,
                    userId: 0,
                    goodClassNum: 0,
                    goodsNum: "",
                    goodsName: "",
                    goodsPrice: 0.0,
                    isNegotiable: false,
                    goodsPublishTime: "",
                    goodsUpdatedTime: "",
                    goodsActivePrice: 0.0,
                    goodsStock: 0,
                    goodsState: 0,
                    goodsDescription: "",
                    goodClassName: "",
                    goodImge: "",
                    goodsCounts: ""
                }]

            },
            commentList:[{
                comment: "",
                serviceNum: 0,
                descriptionNum: 0,
                damageNum: 0,
                commentCreatedTime:""
            }],
            index: '',
            visible: false,
            orderDetailVisible: false,
            orderCommentVisible: false,
            orderLoading: true,
            userId: 0
        }
    }

    componentDidMount() {
        var userId = localStorage.getItem("userId");
        var userSellId = localStorage.getItem("userSellId");
        var orderNum = localStorage.getItem("orderNum");
        var goodsId = localStorage.getItem("goodsId");
        console.log("orderNum", orderNum);
        if (!this.isNull(userId)) {
            this.setState({
                userId: userId
            });
            this.getOrderListInPage({
                params: {
                    userId: userId,
                    page: 1,
                    limit: 10,
                }
            });
            localStorage.removeItem("userId");
        } else if (!this.isNull(userSellId)) {
            this.getOrderListInPage({
                params: {
                    userSellId: userSellId,
                    page: 1,
                    limit: 10,
                }
            });
            localStorage.removeItem("userSellId");
        }  else if (!this.isNull(orderNum)) {
            this.getOrderListInPage({
                params: {
                    orderNum: orderNum,
                    page: 1,
                    limit: 10,
                }
            });
            localStorage.removeItem("orderNum");
        } else if (!this.isNull(goodsId)) {
            this.getOrderListInPage({
                params: {
                    goodsId: goodsId,
                    page: 1,
                    limit: 10,
                }
            });
            localStorage.removeItem("goodsId");
        } else {
            this.getOrderListInPage({
                params: {
                    page: 1,
                    limit: 10,
                }
            })
        }
    }

    async getOrderListInPage(data) {
        const res = await _getOrderListInPage(data);
        console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            orderLoading: false
        })
        /*localStorage.setItem('username',res.data.data.name)
          this.props.history.push({pathname:'/home'});*/
        //alert(this.state.count);
    }

    async getOrderAllInfoById(data) {
        const res = await _getOrderAllInfoById(data);
        console.log("list返回数据：", res);
        this.setState({
            orderDetail: res,
            commentList:[{
                comment: res.orders.comment,
                serviceNum: res.orders.serviceNum,
                descriptionNum: res.orders.descriptionNum,
                damageNum: res.orders.damageNum,
                commentCreatedTime:res.orders.commentCreatedTime
            }]
        })
    }

    handleOrderDetail = () => {
        this.setState({
            orderDetailVisible: true
        });
        var data = {
            params: {
                orderId: this.state.record.orderId
            }
        };
        console.log(data);
        this.getOrderAllInfoById(data)
    };

    handleCancel = () => {
        this.setState({
            orderDetailVisible: false
        })
    };
    orderToComment=()=>{
        if (this.state.orderDetail.orders.comment == null) {
            message.warning('用户还没有对此订单发表评价');
        }else {
            this.setState({
                orderDetailVisible: false,
                orderCommentVisible: true
            });
        }
    };
    //获取table行的记录以及行主键
    handleRecord = (record, rowkey) => {
        console.log("orderId：" + record.orderId);
        this.setState({
            record: record,
            rowkey: rowkey,
            //endpointDetaeilVisible: false
        })
    };
    //判读是否为空,通用
    isNull = (charts) => {
        if (charts == null || charts == "" || charts == "undefined" || charts === undefined) {
            return true
        } else
            return false
    };
    getOrderByName = (page, limit) => {
        if (!this.isNull(this.state.tData)) {
            console.log('page：', page);
            console.log('limit：', limit);
            var data = {
                params: {
                    page: page,
                    limit: limit
                }
            };
            var orderNum = this.props.form.getFieldValue("orderNum");
            var orderState = this.props.form.getFieldValue("orderState");
            if (this.isNull(limit)) {
                if (!this.isNull(this.state.userId)) {
                    if (!this.isNull(orderNum)) {
                        if (!this.isNull(orderState)) {
                            if (orderState == 5) {
                                data = {
                                    params: {
                                        userId: this.state.userId,
                                        orderNum: orderNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            } else {
                                data = {
                                    params: {
                                        orderState: orderState,
                                        userId: this.state.userId,
                                        orderNum: orderNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            }

                        } else {
                            data = {
                                params: {
                                    userId: this.state.userId,
                                    orderNum: orderNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    } else {
                        if (!this.isNull(orderState)) {
                            if (orderState == 5) {
                                data = {
                                    params: {
                                        userId: this.state.userId,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            } else {
                                data = {
                                    params: {
                                        orderState: orderState,
                                        userId: this.state.userId,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            }

                        } else {
                            data = {
                                params: {
                                    userId: this.state.userId,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    }
                } else {
                    if (!this.isNull(orderNum)) {
                        if (!this.isNull(orderState)) {
                            if (orderState == 5) {
                                data = {
                                    params: {
                                        orderNum: orderNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            } else {
                                data = {
                                    params: {
                                        orderState: orderState,
                                        orderNum: orderNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            }

                        } else {
                            data = {
                                params: {
                                    orderNum: orderNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    } else {
                        if (!this.isNull(orderState)) {
                            if (orderState == 5) {
                                data = {
                                    params: {
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            } else {
                                data = {
                                    params: {
                                        orderState: orderState,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            }

                        } else {
                            data = {
                                params: {
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    }
                }

            } else {
                if (!this.isNull(orderNum)) {
                    data = {
                        params: {
                            orderNum: orderNum,
                            page: page,
                            limit: limit
                        }
                    }
                }
            }
            console.log("传的data参数:", data);
            this.getOrderListInPage(data);
        } else {
            Modal.error({
                title: '查询order失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };

    render() {
        const _this = this;
        const showDeleteConfirm = this.showDeleteConfirm;
        const formItemLayout = {
            labelCol: {span: 8},
            wrapperCol: {span: 7}
        };
        const {getFieldDecorator} = _this.props.form;
        //选择框
        const {loading, selectedRowKeys} = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChanges
        };
        const hasSelected = selectedRowKeys.length > 0;
        const columns = [{
            title: '序号',
            align: 'center',
            fixed: 'left',
            dataIndex: 'key',
            width: 70,
            render: (text, record, index) => `${((_this.state.page) - 1) * (_this.state.limit) + index + 1}`

        }, {
            title: '订单号',
            dataIndex: 'orderNum',
        }, {
            title: '店家',
            dataIndex: 'sellname',
        }, {
            title: '买家',
            dataIndex: 'username',
        }, {
            title: '商品数量',
            dataIndex: 'orderGoodsCount',
            render(orderGoodsCount) {
                return orderGoodsCount + "件"
            }
        }, {
            title: '收货地址',
            dataIndex: 'addressName',
            width: 200,
            render(addressName) {
                return <label style={{fontSize: "12px"}}>{addressName}</label>
            }
        }, {
            title: '金额',
            dataIndex: 'orderAmount',
            render(orderAmount) {
                return <Tag color="#f50">￥{orderAmount}</Tag>
            }
        }, {
            title: '订单状态',
            dataIndex: 'orderState',
            align: 'center',
            render(orderState) {
                if (orderState == 1) {
                    return <Tag color="orange">待收货</Tag>
                } else if (orderState == 2) {
                    return <Tag color="blue">待评价</Tag>
                } else if (orderState == 3) {
                    return <Tag color="purple">已完成</Tag>
                } else if (orderState == 4) {
                    return <Tag color="green">已取消</Tag>
                } else {
                    return <Tag color="red">待付款</Tag>
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 110,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => (
                <Button.Group>
                    < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                             onClick={_this.handleOrderDetail}>详情</Button>
                </Button.Group>
            ),
        }];

        //分页
        const pagination = {
            total: _this.state.count,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                _this.getOrderByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            },
            onChange(current, pageSize) {
                //console.log('Current: ', typeof (current));
                _this.getOrderByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            }
        };

        return (
            <div>
                <CustomBreadcrumb arr={["订单管理"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <FormItem label="订单号："
                                      {...formItemLayout} style={{width: "710px"}}
                            >
                                {getFieldDecorator('orderNum')(
                                    <Input placeholder="请输入..."/>
                                )}
                            </FormItem>
                            <FormItem label="订单状态："{...formItemLayout} style={{
                                width: "500px", float: "left",
                                margin: "-64px 0px 9px 360px"
                            }}>
                                {getFieldDecorator('orderState')(
                                    <Select placeholder="全部">
                                        <Option value="5">全部</Option>
                                        <Option value="0">待付款</Option>
                                        <Option value="1">待收货</Option>
                                        <Option value="2">待评价</Option>
                                        <Option value="3">已完成</Option>
                                        <Option value="4">已取消</Option>
                                    </Select>
                                )}
                                <Button type="primary" className="btn" onClick={this.getOrderByName}>
                                    <Icon type="search"/>查询
                                </Button>
                            </FormItem>
                            <div style={{float: "left", margin: "-59px 0"}}>
                                <Button
                                    icon="usergroup-delete" type="danger"
                                    onClick={this.startDelete}
                                    disabled={!hasSelected}
                                    loading={loading}
                                >
                                    批量下架
                                </Button>
                                <span
                                    style={{marginLeft: 8}}> {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''} </span>
                            </div>
                        </Form>
                    </div>
                    <OrderDetail title="订单详情" visible={_this.state.orderDetailVisible} loading={loading}
                                 onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef = form}
                                 orderDetail={_this.state.orderDetail}
                                 orderToComment={_this.orderToComment}
                                 commentList={_this.state.commentList}
                    />
                    {/*  <UpdateOrder title="修改管理员" visible={_this.state.updateOrderVisible}
                                 onOk={_this.handleUpdateOrder} onCancel={_this.handleCancel}
                                 orderDetail={_this.state.orderDetail}
                                 wrappedComponentRef={(form) => this.formUpOrderRef = form}
                                 formUpOrderRef={_this.formUpOrderRef}/>  */}
                    <Table
                        className="ant-table-thead ant-table-tbody"
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.orderId}
                        columns={columns}
                        loading={this.state.orderLoading}
                    >
                    </Table>
                </div>
            </div>

        )
    }
}

Index = Form.create()(Index);
export default Index;
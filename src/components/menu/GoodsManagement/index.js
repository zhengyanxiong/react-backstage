import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {_getGoodsListInPage} from "../../../api/goods";
import {_updateGoods} from "../../../api/goods";
import {_getAllInfoById} from "../../../api/goods";
import GoodsDetail from "../../menu/GoodsManagement/modal/goodsDetail";
import {
    Form, Input, Modal, Icon, Cascader, Button, Table, Tag, Select, Row, Col
} from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const {Option} = Select;

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailLoading:false,
            tData: [],
            classList:[],
            count: 0,
            page: 1,
            limit: 10,
            record: 0,
            rowkey: 0,
            selectedRowKeys: [],
            loading: false,
            goodsDetail: {
                allCount: 0,
                sellCount: 0,
                goods: {
                    goodsId: 0,
                    userId: 0,
                    goodClassNum: 1,
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
                    className: "",
                    goodClassName: "",
                    goodImge: '',
                    username: "",
                    studentId: ""
                }
            },
            goodImge: [],
            index: '',
            visible: false,
            goodsDetailVisible: false,
            goodsLoading: true,
            userId: 0
        }
    }

    componentDidMount() {
        var userId = localStorage.getItem("userId");
        if (!this.isNull(userId)) {
            this.setState({
                userId: userId
            });
            this.getGoodsListInPage({
                params: {
                    userId: userId,
                    page: 1,
                    limit: 10,
                }
            });
            localStorage.removeItem("userId");
        } else {
            this.getGoodsListInPage({
                params: {
                    page: 1,
                    limit: 10,
                }
            })
        }
    }

    async getGoodsListInPage(data) {
        const res = await _getGoodsListInPage(data);
      //  console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            goodsLoading: false,
            classList:res.classList
        })
    }

    async updateGoods(data) {
        const res = await _updateGoods(data);
        //console.log("list返回数据：", res);
        this.getGoodsListInPage({
            params: {
                page: this.state.page,
                limit: 10,
            }
        });
        Modal.success({
            title: '成功',
            content: '商品强制下架成功!',
        });

    }

    async getAllInfoById(data) {
        const res = await _getAllInfoById(data);
        //console.log("list返回数据：", res);

        if (!this.isNull(res.goods.goodImge)) {
            let str = res.goods.goodImge.split(",");
           // console.log("str:", str);
            this.setState({
                detailLoading:false,
                goodsDetail: res,
                goodImge: str
            });
        } else {
            this.setState({
                detailLoading:false,
                goodsDetail: res,
                goodImge: []
            });
        }

    }

    unique=(arr)=>{
        var hash=[];
        for (var i = 0; i < arr.length; i++) {
            for (var j = i+1; j < arr.length; j++) {
                if(arr[i]===arr[j]){
                    ++i;
                }
            }
            hash.push(arr[i]);
        }
        return hash;
    };
    //获取table行的记录以及行主键
    handleRecord = (record, rowkey) => {
        //console.log("goodsId：" + record.goodsId);
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
    getGoodsByName = (page, limit) => {
        this.setState({
            goodsLoading:true
        })
        if (!this.isNull(this.state.tData)) {
           // console.log('page：', page);
           // console.log('limit：', limit);
            var data = {
                params: {
                    page: page,
                    limit: limit
                }
            };
            var goodsName = this.props.form.getFieldValue("goodsName");
            var goodsNum = this.props.form.getFieldValue("goodsNum");
            var goodClassNum = this.props.form.getFieldValue("goodClassNum");
            var goodsState = this.props.form.getFieldValue("goodsState");
            if (this.isNull(limit)) {
                if (!this.isNull(this.state.userId)) {
                    if (!this.isNull(goodsName)) {
                        if (!this.isNull(goodsState)) {
                            if (goodsState == 0) {
                                data = {
                                    params: {
                                        userId: this.state.userId,
                                        goodsName: goodsName,
                                        goodsNum: goodsNum,
                                        goodClassNum: goodClassNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            } else {
                                data = {
                                    params: {
                                        userId: this.state.userId,
                                        goodsState: goodsState,
                                        goodsName: goodsName,
                                        goodsNum: goodsNum,
                                        goodClassNum: goodClassNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            }

                        } else {
                            data = {
                                params: {
                                    userId: this.state.userId,
                                    goodsName: goodsName,
                                    goodsNum: goodsNum,
                                    goodClassNum: goodClassNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    } else {
                        if (!this.isNull(goodsState)) {
                            if (goodsState == 0) {
                                data = {
                                    params: {
                                        userId: this.state.userId,
                                        goodsNum: goodsNum,
                                        goodClassNum: goodClassNum,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            } else {
                                data = {
                                    params: {
                                        userId: this.state.userId,
                                        goodsNum: goodsNum,
                                        goodClassNum: goodClassNum,
                                        goodsState: goodsState,
                                        page: this.state.page,
                                        limit: this.state.limit
                                    }
                                }
                            }
                        } else {
                            data = {
                                params: {
                                    userId: this.state.userId,
                                    goodsNum: goodsNum,
                                    goodClassNum: goodClassNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    }
                } else {
                    if (!this.isNull(goodsName)) {
                        if (!this.isNull(goodsState)) {
                            data = {
                                params: {
                                    goodsState: goodsState,
                                    goodsName: goodsName,
                                    goodsNum: goodsNum,
                                    goodClassNum: goodClassNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        } else {
                            data = {
                                params: {
                                    goodsName: goodsName,
                                    goodsNum: goodsNum,
                                    goodClassNum: goodClassNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    } else {
                        if (!this.isNull(goodsState)) {
                            data = {
                                params: {
                                    goodsState: goodsState,
                                    goodsNum: goodsNum,
                                    goodClassNum: goodClassNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        } else {
                            data = {
                                params: {
                                    goodsNum: goodsNum,
                                    goodClassNum: goodClassNum,
                                    page: this.state.page,
                                    limit: this.state.limit
                                }
                            }
                        }

                    }
                }

            } else {
                if (!this.isNull(goodsName)) {
                    data = {
                        params: {
                            goodsName: goodsName,
                            goodsNum: goodsNum,
                            goodClassNum: goodClassNum,
                            page: page,
                            limit: limit
                        }
                    }
                }
            }
           // console.log("传的data参数:", data);
            this.getGoodsListInPage(data);
        } else {
            Modal.error({
                title: '查询goods失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };
    showDoGoodsUp = () => {
        let that = this;
        Modal.confirm({
            title: '您确定此刻强制下架该商品吗?',
            content: '用户商品信息很重要，请务必仔细核实！',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                if (that.state.record.goodsState != 3) {
                    var data = {
                        goodsId: that.state.record.goodsId,
                        goodsState: 3,
                        goods_stock: 0
                    };
                    //  console.log('修改表单数据: ', data);
                    that.updateGoods(data);
                } else {
                    Modal.error({
                        title: '失败！',
                        content: '商品已经被下架了!',
                    });
                }

            },
            onCancel() {
            }
        });
    };
    handleGoodsDetail = () => {
        this.setState({
            goodsId: this.state.record.goodsId,
            goodsDetailVisible: true,
            detailLoading:true
        });
        var data = {
            params: {
                goodsId: this.state.record.goodsId
            }
        };
        this.getAllInfoById(data)
    };
    handleToSelledOrder = () => {
        localStorage.setItem("goodsId", this.state.record.goodsId);
        const {from} = this.props.location.state || {from: {pathname: '/index/orderManagement'}};
        this.props.history.push(from);
        this.setState({
            goodsDetailVisible: false
        });
    };
    handleCancel = () => {
        this.setState({
            goodsDetailVisible: false
        });
    };

    render() {
        const _this = this;
        const showDeleteConfirm = this.showDeleteConfirm;
        const formItemLayout = {
            labelCol: {span: 12},
            wrapperCol: {span: 10}
        };
        const formItemLayout1 = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        const formItemLayout2 = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
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
            title: '店家',
            dataIndex: 'username',
        }, {
            title: '商品名',
            dataIndex: 'goodsName',
        }, {
            title: '商品类别',
            width: 100,
            dataIndex: 'goodClassName',
        }, {
            title: '商品单价',
            dataIndex: 'goodsPrice',
            render(goodsPrice) {
                return "￥" + goodsPrice
            }
        }, {
            title: '活动价格',
            dataIndex: 'goodsActivePrice',
            render(goodsActivePrice) {
                if (goodsActivePrice == null) {
                    return <Tag color="#2db7f5">未参加活动</Tag>
                } else {
                    var goodsActivePrice1 = "￥" + goodsActivePrice;
                    return <Tag color="#f50">{goodsActivePrice1}</Tag>
                }
            }
        }, {
            title: '商品状态',
            dataIndex: 'goodsState',
            align: 'center',
            render(goodsState) {
                if (goodsState == 1) {
                    return <Tag color="green">已上架</Tag>
                } else if (goodsState == 2) {
                    return <Tag color="blue">已卖出</Tag>
                } else if (goodsState == 3) {
                    return <Tag color="orange">已下架</Tag>
                } else {
                    return <Tag color="red">活动中</Tag>
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 190,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => (
                <Button.Group>
                    < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                             onClick={_this.handleGoodsDetail}>详情</Button>
                    <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                            onClick={_this.showDoGoodsUp}> 强制下架 </Button>
                </Button.Group>
            ),
        }];

        //分页

        const pagination = {
            total: _this.state.count,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
                _this.getGoodsByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            },
            onChange(current, pageSize) {
                //console.log('Current: ', typeof (current));
                _this.getGoodsByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            }
        };
           return (
            <div>
                <CustomBreadcrumb arr={["闲置管理"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <Row>
                                <Col span={9} style={{textAlign: 'left'}}>

                                    <FormItem label="商品名称："
                                              {...formItemLayout}
                                    >
                                        {getFieldDecorator('goodsName')(
                                            <Input placeholder="请输入..."/>
                                        )}

                                    </FormItem>
                                    <FormItem label="商品类别："{...formItemLayout} style={{
                                }}>
                                    {getFieldDecorator('goodClassNum')(
                                        <Select placeholder="全部">
                                            <Option value="">全部</Option>
                                            {this.state.classList.map(it => (
                                                <Option key={it.goodClassNum} value={it.goodClassNum}>
                                                    {it.goodClassName}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </FormItem>
                                </Col>

                                <Col span={6} style={{textAlign: 'left'}}>
                                    <FormItem label="商品编号："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('goodsNum')(
                                            <Input placeholder="请输入..."/>
                                        )}

                                    </FormItem>
                                    <FormItem {...formItemLayout2} style={{
                                        float: "left"
                                    }}>
                                        <Button type="primary" className="btn" onClick={this.getGoodsByName}>
                                            <Icon type="search"/>查询
                                        </Button>
                                    </FormItem>
                                </Col>
                                <Col span={6} style={{textAlign: 'left'}}>
                                    <FormItem label="商品状态："{...formItemLayout1} style={{
                                    }}>
                                        {getFieldDecorator('goodsState')(
                                            <Select placeholder="全部">
                                                <Option value="">全部</Option>
                                                <Option value="1">已上架</Option>
                                                <Option value="2">已卖出</Option>
                                                <Option value="3">已下架</Option>
                                                <Option value="4">活动中</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                            </Row>
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
                    <GoodsDetail title="商品详情" visible={_this.state.goodsDetailVisible} loading={this.state.detailLoading}
                                 onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef = form}
                                 goodsDetail={_this.state.goodsDetail}
                                 goodImge={_this.state.goodImge}
                                 handleToSelledOrder={_this.handleToSelledOrder}

                    />
                    {/*     <UpdateGoods title="修改管理员" visible={_this.state.updateGoodsVisible}
                                 onOk={_this.handleUpdateGoods} onCancel={_this.handleCancel}
                                 goodsDetail={_this.state.goodsDetail}
                                 wrappedComponentRef={(form) => this.formUpGoodsRef = form}
                                 formUpGoodsRef={_this.formUpGoodsRef}/>  */}
                    <Table
                        className="ant-table-thead ant-table-tbody" rowSelection={rowSelection}
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.goodsId}
                        columns={columns}
                        loading={this.state.goodsLoading}
                    >
                    </Table>
                </div>
            </div>

        )
    }
}

Index = Form.create()(Index);
export default Index;
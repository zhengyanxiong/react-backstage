import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {_getUserComplaintListInPage} from "../../../api/user";
import {_getUserComplaintById} from "../../../api/user";
import {_updatePersonal} from "../../../api/user";
import {_updateUserCompById} from "../../../api/user";
import UserCompDetail from "../../../components/menu/ComplaintManagement/modal/userCompDetail";

import {
    Form, Input, Modal, Icon, Cascader, Popconfirm, message, Button, Table, Tag, Row, Col, Select, notification
} from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const {Option} = Select;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailLoading:false,
            tData: [],
            count: 0,
            page: 1,
            limit: 10,
            record: [{
                userComplaintId: 0
            }],
            rowkey: 0,
            userCompDeatil: {
                compImgList: [''],
                userComplaint: {
                    userComplaintId: 0,
                    userComId: 0,
                    userComedStuId: '',
                    userComName: '',
                    userComedName: '',
                    userComplaintDes: '',
                    userComStuId: '',
                    userComedId: 0,
                    userComplaintState: 0,
                    userComCreateTime: '',
                    userComReplyTime: '',
                    userComplaintExp1: '',
                    userComplaintExp2: 0,
                }
            },
            compImgList: [],
            index: '',
            userCompDeatilVisible: false,
            userCompLoading: true,
        }
    }

    componentDidMount() {
        this.getUserComplaintListInPage({
            page: 1,
            limit: 10
        })
    }

    async getUserComplaintListInPage(data) {
        const res = await _getUserComplaintListInPage(data);
        // console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            userCompLoading: false
        })
    }

    async updatePersonal(data) {
        await _updatePersonal(data);
        var data1 = {
            toCheckState: 2,
            userComplaintId: this.state.record.userComplaintId,
            userComAdminId: 1
        };
        this.updateUserCompById(data1);//更新投诉事件
        notification["warning"]({
            message: '请注意！',
            description: "点击此按钮，默认该申请解冻事件已处理;" +
            "处理结果为：被举报者申请解冻申请成功，请知晓!",
            duration: 0
        });
    }

    async updateUserCompById(data) {
        await _updateUserCompById(data);

        //  console.log("list返回数据：", res);
        this.getUserComplaintListInPage({
            page: this.state.page,
            limit: 10
        });
    }

    async getUserComplaintById(data) {
        const res = await _getUserComplaintById(data);
        this.setState({
            userCompDeatil: res,
            detailLoading:false
        });
        if (!this.isNull(res.compImgList)) {
            // console.log("str:", str);
            this.setState({
                compImgList: res.compImgList
            });
        } else {
            this.setState({
                compImgList: []
            });
        }
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
            userCompDeatilVisible: false,
        });
        //this.formEndUpRef.props.form.resetFields();
    };
    //获取table行的记录以及行主键
    handleRecord = (record, rowkey) => {
        // console.log("userComplaintId：" + record.userComplaintId)
        this.setState({
            record: record,
            rowkey: rowkey,
        })
    };
    getUserByName = (page, limit) => {
        this.setState({
            userCompLoading:true
        })
        if (!this.isNull(this.state.tData)) {
            //  console.log('page：', page);
            // console.log('limit：', limit);
            var data = {
                page: page,
                limit: limit
            };

            var userComName = this.props.form.getFieldValue("userComName");
            var userComedName = this.props.form.getFieldValue("userComedName");
            var userComplaintDes = this.props.form.getFieldValue("userComplaintDes");
            var userComplaintState = this.props.form.getFieldValue("userComplaintState");
            var userComplaintExp2 = this.props.form.getFieldValue("userComplaintExp2");
            if (this.isNull(limit)) {
                data = {
                    userComName: userComName,
                    userComedName: userComedName,
                    userComplaintDes: userComplaintDes,
                    userComplaintState: userComplaintState,
                    userComplaintExp2: userComplaintExp2,
                    page: this.state.page,
                    limit: this.state.limit

                }
            } else {
                data = {
                    page: this.state.page,
                    limit: this.state.limit
                }
            }

            // console.log("传的data参数:", data)
            this.getUserComplaintListInPage(data);
            setTimeout(() => {
                this.setState({
                    userCompLoading:false
                });
            }, 3000);
        } else {
            Modal.error({
                title: '查询失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };


    //解冻用户
    showThawConfirm = () => {
        var _this = this;
        confirm({
            title: '你确定要解冻该用户吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            //删除行
            onOk() {
                if (!_this.isNull(_this.state.record.userComplaintId)) {
                    var data = {
                        userId: _this.state.record.userComedId,
                        userState: 2
                    };
                    _this.updatePersonal(data);//跟新用户状态

                }
            },
            onCancel() {
                //console.log('取消');
            },
        });
    };
    toUserWho = () => {
        localStorage.setItem("userComId", this.state.userCompDeatil.userComplaint.userComId);
        this.setState({
            userCompDeatil: false
        });
        const {from} = {from: {pathname: '/index/userManagement'}};
        this.props.history.push(from)
    };
    toUserWhoed = () => {
        localStorage.setItem("userComedId", this.state.userCompDeatil.userComplaint.userComedId);
        this.setState({
            userCompDeatil: false
        });
        const {from} = {from: {pathname: '/index/userManagement'}};
        this.props.history.push(from)
    };

    //详情点击事件
    handleUserCompDeatil = () => {
        if (!this.isNull(this.state.record.userComplaintId)) {
            var data = {
                params: {
                    userComplaintId: this.state.record.userComplaintId
                }
            };
            this.setState({
                detailLoading:true,
                userCompDeatilVisible: true
            });
            //console.log('qqq' + data);
            this.getUserComplaintById(data);
        }
    };

    //获取子菜单元素数据等
    /*  formSubUserRef = (ref) => {
         this.childSub = ref
     };
     formUpUserRef = (ref) => {
         this.childUp = ref
     };*/

    checkCancel = () => {
        notification["warning"]({
            message: '请注意！',
            description: "点击此按钮，默认该举报事件已处理;" + " " + " " + " " + " " +
            "处理结果为：举报不实，未对被举报者采取任何措施，请知晓。",
            duration: 0
        });
        var data = {
            toCheckState: 0,
            userComplaintId: this.state.record.userComplaintId,
            userComedId: this.state.record.userComedId,
            userComAdminId: 1
        };
        this.updateUserCompById(data);
        //message.warning('点击此按钮，默认该举报事件已处理，处理结果为：举报不实，未对被举报者采取任何措施，请知晓！',15);

    };

    checkConfirm = () => {
        notification["warning"]({
            message: '请注意！',
            description: '点击此按钮，默认该举报事件已处理;处理结果为：举报属实，将对被举报者采取停用措施，请知晓。',
            duration: 0
        });
        var data = {
            toCheckState: 1,
            userComplaintId: this.state.record.userComplaintId,
            userComedId: this.state.record.userComedId,
            userComAdminId: 1
        };
        this.updateUserCompById(data);
    };

    render() {

        const _this = this;
        const showThawConfirm = this.showThawConfirm;
        const formItemLayout1 = {
            labelCol: {span: 8},
            wrapperCol: {span: 16}
        };
        const formItemLayout2 = {
            labelCol: {span: 8},
            wrapperCol: {span: 14}
        };
        const {getFieldDecorator} = _this.props.form;

        const columns = [{
            title: '序号',
            align: 'center',
            fixed: 'left',
            dataIndex: 'key',
            width: 70,
            render: (text, record, index) => `${((_this.state.page) - 1) * (_this.state.limit) + index + 1}`

        }, {
            title: '举报者',
            dataIndex: 'userComName',
            render(username) {
                if (username == null) {
                    return <Tag color="red">未设置昵称</Tag>
                } else {
                    return <label style={{fontSize: "12px"}}>{username}</label>
                }
            }
        }, {
            title: '被举报者',
            dataIndex: 'userComedName',
        }, {
            title: '举报原因',
            dataIndex: 'userComplaintDes',
            width: 280,
            render(userComplaintDes) {
                return <label style={{fontSize: "12px"}}>{userComplaintDes}</label>
            }
        }, {
            title: '处理结果',
            dataIndex: 'userComplaintState',
            render(userComplaintState) {
                if (userComplaintState == 0) {
                    return <Tag color="red">未处理：等待管理员核实</Tag>
                } else if (userComplaintState == 10) {
                    return <Tag color="green">已处理：描述不实，未停用被举报者</Tag>
                } else if (userComplaintState == 11) {
                    return <Tag color="green">已处理：描述属实，已停用被举报者</Tag>
                }
            }
        }, {
            title: '是否申请解冻',
            dataIndex: 'userComplaintExp2',
            render(userComplaintExp2) {
                if (userComplaintExp2 == null) {
                    return <Tag color="red">举报事件未处理</Tag>
                } else if (userComplaintExp2 == 0) {
                    return <Tag color="red">还未申请解冻</Tag>
                } else if (userComplaintExp2 == 1) {
                    return <Tag color="red">等待管理员处理解冻</Tag>
                } else if (userComplaintExp2 == 2) {
                    return <Tag color="green">被举报者未被停用冻结</Tag>
                } else if (userComplaintExp2 == 10) {
                    return <Tag color="green">处理结果：已解冻</Tag>
                } else if (userComplaintExp2 == 11) {
                    return <Tag color="green">处理结果：未解冻</Tag>
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 180,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => {
                if (_this.state.tData[index].userComplaintState == 0) {
                    return <Button.Group>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserCompDeatil}>详情</Button>
                        <Popconfirm title="您希望怎么处理这个举报事件呢?" overlayStyle={{width: "22%"}} placement="topRight"
                                    onConfirm={_this.checkConfirm} onCancel={_this.checkCancel} okText="停用该举报者"
                                    cancelText="与被举报者无关">
                            <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                            >前去处理</Button>
                        </Popconfirm>
                    </Button.Group>
                } else if (_this.state.tData[index].userComplaintState == 11 && _this.state.tData[index].userComplaintExp2==1) {
                    return <Button.Group>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserCompDeatil}>详情</Button>
                        <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                                onClick={() => showThawConfirm(index)}>解冻 </Button>
                    </Button.Group>
                } else {
                    return < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                    onClick={_this.handleUserCompDeatil}>详情</Button>
                }
            }
        }];

        //分页
        const pagination = {
            total: _this.state.count,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                //     console.log('Current: ', current, '; PageSize: ', pageSize)
                _this.getUserByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            },
            onChange(current, pageSize) {
                //console.log('Current: ', typeof (current));
                _this.getUserByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            }
        };

        return (
            <div>
                <CustomBreadcrumb arr={["举报投诉处理"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <Row>
                                <Col span={5} style={{textAlign: 'left'}}>
                                    <FormItem label="举报者："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('userComName')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>

                                </Col>
                                <Col span={5} style={{textAlign: 'left'}}>

                                    <FormItem label="被举报者："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('userComedName')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={5} style={{textAlign: 'left'}}>

                                    <FormItem label="举报处理："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('userComplaintState')(
                                            <Select placeholder="全部">
                                                <Option value="">全部</Option>
                                                <Option value="0">举报未处理</Option>
                                                <Option value="1">举报已处理</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={7} style={{textAlign: 'left'}}>
                                    <FormItem label="申请解冻处理："
                                              {...formItemLayout2}
                                    >
                                        {getFieldDecorator('userComplaintExp2')(
                                            <Select placeholder="全部">
                                                <Option value="">全部</Option>
                                                <Option value="1">申请解冻未处理</Option>
                                                <Option value="0">未申请解冻</Option>
                                            </Select>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={1} style={{textAlign: 'left'}}>
                                    <Button type="primary" className="btn" onClick={this.getUserByName}>
                                        <Icon type="search"/>查询
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <UserCompDetail title="举报详情" visible={_this.state.userCompDeatilVisible}
                                    loading={_this.state.detailLoading}
                                    onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                    wrappedComponentRef={(form) => this.formRef = form}
                                    userCompDeatil={_this.state.userCompDeatil}
                                    compImgList={_this.state.compImgList}
                                    toUserWho={this.toUserWho}
                                    toUserWhoed={this.toUserWhoed}
                    />
                    <Table
                        className="ant-table-thead ant-table-tbody"
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.userComplaintId}
                        columns={columns}
                        loading={this.state.userCompLoading}
                    >
                    </Table>
                </div>
            </div>
        )
    }
}

Index = Form.create()(Index);
export default Index;

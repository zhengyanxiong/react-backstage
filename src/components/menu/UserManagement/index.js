import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import UserDetail from "../../../components/menu/UserManagement/modal/userDetail";
import UserComment from "../../../components/menu/UserManagement/modal/userComment";
/*import SubmitUser from "../../../components/menu/UserManagement/modal/submitUser";
import UpdateUser from "../../../components/menu/UserManagement/modal/updateUser";*/
import {_getMemberListInPage} from "../../../api/user";
import {_updatePersonal} from "../../../api/user";
import {_getUserAllByUserId} from "../../../api/user";

import {
    Form, Input, Modal, Icon, Cascader, Button, Table, Tag, message, Row, Col, Select, Spin
} from 'antd';

const FormItem = Form.Item;
const confirm = Modal.confirm;
const {Option} = Select;

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tData: [],
            count: 0,
            page: 1,
            limit: 10,
            record: [{
                userId: 0,
                pubCount:0
            }],
            detailLoading: false,
            commentLoading: false,
            rowkey: 0,
            selectedRowKeys: [],
            loading: false,
            userDetail: {
                commentList: [
                    {
                        commentId: 0,
                        orderId: 0,
                        commentPerId: 0,
                        commentedPerId: 0,
                        serviceNum: 5,
                        descriptionNum: 0,
                        logisticsNum: 0,
                        damageNum: 0,
                        commentExpand1: "",
                        comment: "",
                        username: "",
                        studentId:"",
                        orderNum: "",
                        headImge: "",
                        creatTime: "",
                    }],
                commentedList: [
                    {
                        commentId: 0,
                        orderId: 0,
                        commentPerId: 0,
                        commentedPerId: 0,
                        serviceNum: 5,
                        descriptionNum: 0,
                        logisticsNum: 0,
                        damageNum: 0,
                        commentExpand1: "",
                        comment: "",
                        username: "",
                        studentId:"",
                        orderNum: "",
                        headImge: "",
                        creatTime: "",
                    }],
                userInfo: {
                    userId: 0,
                    schoolId: 0,
                    studentId: 0,
                    username: "",
                    headImag: "",
                    phoneNum: "",
                    sex: "",
                    email: "",
                    realName: "",
                    idCard: "",
                    stuCardFront: "",
                    stuCardBack: "",
                    registerDate: "",
                    userCreatedTime: "",
                    userUpdatedTime: "",
                    userState: 0,
                    creditNum: 0,
                    loveValue: 0,
                    sumGrade: 0,
                    schoolName: ""
                },
                userBuyCount: 0,
                publishGoodsCount: 0,
                userSellCount: 0,
                goodsList: [],
                goodsOnCount: 0,
                goodsSellCount: 0,
                goodsUpCount: 0,
                goodsActiveCount: 0,
                publishClassCount: 0
            },
            receiptPlacelist: [
                {
                    receiptId: 0,
                    userId: 0,
                    addressName: "",
                    addressState: ""
                }
            ],
            index: '',
            visible: false,
            userDetailVisible: false,
            userCommentVisible: false,
            submitUserVisible: false,
            updateUserVisible: false,
            userLoading: true,
            username: '',
            studentId: '',
            phoneNum: '',
            idCard: '',
            email: '',
        }
    }

    componentDidMount() {
        var userComId = localStorage.getItem("userComId");
        var userComedId = localStorage.getItem("userComedId");
        if (!this.isNull(userComedId)) {
            this.getMemberListInPage({
                userId: parseInt(userComedId),
                state: 0,
                page: 1,
                limit: 10
            });
            localStorage.removeItem("userComedId")
        } else if (!this.isNull(userComId)) {
            this.getMemberListInPage({
                userId: parseInt(userComId),
                state: 0,
                page: 1,
                limit: 10
            });
            localStorage.removeItem("userComId")

        } else {
            this.getMemberListInPage({
                state: 2,
                page: 1,
                limit: 10
            })
        }


    }

    async getMemberListInPage(data) {
        const res = await _getMemberListInPage(data);
        // console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            userLoading: false
        });
    }

    async updatePersonal(data) {
        const res = await _updatePersonal(data);
        //  console.log("list返回数据：", res);
        this.getMemberListInPage({
            state: 1,
            page: this.state.page,
            limit: 10
        });
        Modal.success({
            title: '操作成功',
            content: '修改用户信息成功！',
        });
    }

    async getUserAllByUserId(data) {
        const res = await _getUserAllByUserId(data);
        if (0 == res.receiptPlacelist) {
            this.setState({
                detailLoading: false,
                receiptPlacelist: [{
                    addressName: "",
                    receiptId: 0
                }],
                userDetail: res,
            });
        } else {
            this.setState({
                detailLoading: false,
                userDetail: res,
                receiptPlacelist: res.receiptPlacelist
            });
        }

        //  console.log("user:", this.state.userDetail)
    }

    handleToOrder = () => {
        if (this.state.userDetail.userBuyCount == 0) {
            message.warning('该用户还没有订单哦');
        } else {
            localStorage.setItem("userId", this.state.record.userId);
            this.setState({
                userDetailVisible: false
            });
            const {from} = {from: {pathname: '/index/orderManagement'}};
            this.props.history.push(from)
        }
    };
    handleToSellOrder = () => {
        if (this.state.userDetail.userSellCount == 0) {
            message.warning('该用户还没有卖出过哦');
        } else {
            localStorage.setItem("userSellId", this.state.record.userId);
            this.setState({
                userDetailVisible: false
            });
            const {from} = {from: {pathname: '/index/orderManagement'}};
            this.props.history.push(from)
        }
    };

    handleToComment = () => {
        if (this.state.userDetail.userBuyCount == 0 && this.state.userDetail.publishGoodsCount == 0) {
            message.warning('该用户还没有发布过或者收到过评论哦');
        } else {
            this.setState({
                //commentLoading:true,
                userDetailVisible: false,
                userCommentVisible: true
            });
        }
    };

    //判读是否为空,通用
    isNull = (charts) => {
        if (charts == null || charts == "" || charts == "undefined" || charts === undefined) {
            return true
        } else
            return false
    };
    //modal取消事件通用
    handleCancel = () => {
        localStorage.removeItem("userId");
        localStorage.removeItem("commentedPerId");
        localStorage.removeItem("commentPerId");
        this.setState({
            visible: false,
            userDetailVisible: false,
            submitUserVisible: false,
            updateUserVisible: false,
            userCommentVisible: false
        });
        //this.formEndUpRef.props.form.resetFields();
    };
    toOrderOne = () => {
        var orderNum = localStorage.getItem("orderNum", orderNum);
        //alert("commentedPerId"+commentedPerId);
        if (!this.isNull(orderNum)) {
            this.setState({
                userCommentVisible: false
            });
            const {from} = {from: {pathname: '/index/orderManagement'}};
            this.props.history.push(from)
        }
    };
    start = () => {
        this.setState({loading: true});
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };
    //获取table行的记录以及行主键
    handleRecord = (record, rowkey) => {
        // console.log("userId：" + record.userId)
        this.setState({
            record: record,
            rowkey: rowkey,
            //endpointDetaeilVisible: false
        })
    };

    // checkbox状态
    onSelectChanges = (selectedRowKeys) => {
        //console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys: selectedRowKeys});
        //  console.log('stateSelectedRowKeys: ', this.state.selectedRowKeys)
        //return selectedRowKeys
    };

    getUserByName = (page, limit) => {
        this.setState({
            userLoading: true
        });
        if (!this.isNull(this.state.tData)) {
            //  console.log('page：', page);
            // console.log('limit：', limit);
            var data = {
                state: 2,
                page: page,
                limit: limit
            };

            var username = this.props.form.getFieldValue("username");
            var studentId = this.props.form.getFieldValue("studentId");
            var phoneNum = this.props.form.getFieldValue("phoneNum");
            var idCard = this.props.form.getFieldValue("idCard");
            var email = this.props.form.getFieldValue("email");
            if (this.isNull(limit)) {
                if (!this.isNull(username)) {
                    //console.log("userName不为空:", username)
                    data = {
                        state: 2,
                        username: username,
                        studentId: studentId,
                        phoneNum: phoneNum,
                        idCard: idCard,
                        email: email,
                        page: this.state.page,
                        limit: this.state.limit

                    }
                } else {
                    data = {
                        state: 2,
                        studentId: studentId,
                        phoneNum: phoneNum,
                        idCard: idCard,
                        email: email,
                        page: this.state.page,
                        limit: this.state.limit
                    }
                }
            } else {
                if (!this.isNull(username)) {
                    data = {
                        state: 2,
                        username: username,
                        studentId: studentId,
                        phoneNum: phoneNum,
                        idCard: idCard,
                        email: email,
                        page: page,
                        limit: limit
                    }
                }
            }
            // console.log("传的data参数:", data)
            this.getMemberListInPage(data);
            setTimeout(() => {
                this.setState({
                    userLoading: false
                });
            }, 3000);
        } else {
            Modal.error({
                title: '查询User失败',
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
                //    console.log("recordId:" + _this.state.record.userId);
                //   console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.userId)) {
                    var data = {
                        userId: _this.state.record.userId,
                        userState: 2
                    };
                    //console.log("data:" + data.params.userId);
                    _this.updatePersonal(data);
                }
            },
            onCancel() {
                //console.log('取消');
            },
        });
    };
    showStopConfirm = () => {
        var _this = this;
        confirm({
            title: '你确定要停用该用户吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            //删除行
            onOk() {
                //   console.log("recordId:" + _this.state.record.userId);
                //  console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.userId)) {
                    var data = {
                        userId: _this.state.record.userId,
                        userState: 3
                    };
                    //console.log("data:" + data.params.userId);
                    _this.updatePersonal(data);
                }
            },
            onCancel() {
                //console.log('取消');
            },
        });
    };
    //详情点击事件
    handleUserDetail = () => {
        if (!this.isNull(this.state.record.userId)) {
            /*console.log("recordId:" + this.state.record.userId);
            console.log("rowkey:" + this.state.rowkey);*/
            var data = {
                params: {
                    userId: this.state.record.userId
                }
            };
            this.setState({
                detailLoading: true,
                userDetailVisible: true
            });
            //console.log('qqq' + data);
            this.getUserAllByUserId(data);
        }
    };
    handleUserGoods = () => {
        if (this.state.record.pubCount!=0){
            localStorage.setItem("userId", this.state.record.userId);
            const {from} = this.props.location.state || {from: {pathname: '/index/goodsManagement'}};
            this.props.history.push(from)
        }else {
            message.warning("该用户暂无发布")
        }

    };

    //修改或添加提交表单modal
    showSubmitConfirm = () => {
        if (!this.isNull(this.state.tData)) {
            this.setState({
                submitUserVisible: true
            });
        } else {
            Modal.error({
                title: '新增管理员失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };
    showUpdateConfirm = () => {
        //     console.log(this.state.record.userId);
        //    console.log("点击修改按钮事件");
        this.getUserById({
            params: {
                userId: this.state.record.userId
            }
        });
        this.setState({
            updateUserVisible: true
        });
    };

    //获取子菜单元素数据等
    formSubUserRef = (ref) => {
        this.childSub = ref
    };
    formUpUserRef = (ref) => {
        this.childUp = ref
    };

    //确认添加点击事件
    handleSubmitUser = (e) => {
        const form = this.formSubUserRef.props.form;
        //  console.log("formSubUserRef", this.formSubUserRef);
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    submitUserVisible: false
                });
                // console.log("formSubUserRef", this.formSubUserRef);
                var userInfo = this.childSub.getSubItemsValue();
                //   console.log(this.childSub.getSubItemsValue());
                var data = {
                    username: userInfo.username,
                };
                //console.log('表单数据: ', data);
                this.submitUser(data);
            }
            form.resetFields();
        });
    };
    //更新点击事件
    handleUpdateUser = (e) => {
        //console.log("更新点击事件", this.formUpUserRef.props.form);
        const form = this.formUpUserRef.props.form;
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    updateUserVisible: false
                });
                //console.log("formEndUpRef:", this.formUpUserRef);
                var userInfo = this.childUp.getUpItemsValue();
                // console.log(this.childUp.getUpItemsValue());
                var data = {
                    userId: this.state.record.userId,
                    username: userInfo.username,
                };
                //console.log('修改表单数据: ', data);
                this.updateUser(data);
            }
            form.resetFields();
        });

    };
    //批量删
    startDelete = () => {
        var _this = this;
        //console.log("ffffffff", _this.state.selectedRowKeys);
        var idList = [];
        // console.log('selectedRowKeys:', _this.state.selectedRowKeys);
        const selectedRowKeys = _this.state.selectedRowKeys;
        for (var i = 0; i < selectedRowKeys.length; i++) {
            var selectedRowKey = selectedRowKeys[i];
            //  console.log('selectedRowKeys[i]:', selectedRowKeys[i]);
            idList.push(_this.state.tData[selectedRowKey].userId);
        }
        /*var data = {
            idList:idList
        }*/
        // console.log("idList：", idList);
        // console.log("data：", data);

        _this.deleteUserByIds(idList);
        this.setState({loading: true});

    };

    render() {
        const _this = this;
        const showThawConfirm = this.showThawConfirm;
        const showStopConfirm = this.showStopConfirm;
        const formItemLayout = {
            labelCol: {span: 12},
            wrapperCol: {span: 12}
        };
        const formItemLayout1 = {
            labelCol: {span: 6},
            wrapperCol: {span: 17}
        };
        const formItemLayout2 = {
            labelCol: {span: 4},
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
            title: '用户名',
            dataIndex: 'username',
            render(username) {
                if (username == null) {
                    return <Tag color="red">未设置昵称</Tag>
                } else {
                    return <label style={{fontSize: "12px"}}>{username}</label>
                }
            }
        }, {
            title: '学号',
            dataIndex: 'studentId',
        }, {
            title: '手机号',
            dataIndex: 'phoneNum',
        }, {
            title: '邮箱',
            dataIndex: 'email',
        }, {
            title: '学校',
            dataIndex: 'schoolName',
            render(schoolName) {
                if (schoolName == null) {
                    return <Tag color="red">未认证学校</Tag>
                } else {
                    return <label style={{fontSize: "12px"}}>{schoolName}</label>
                }
            }
        }, {
            title: '用户状态',
            dataIndex: 'userState',
            align: 'center',
            render(userState) {
                if (userState == 2) {
                    return <Tag color="green">已认证</Tag>
                } else if (userState == 3) {
                    return <Tag color="red">已停用</Tag>
                } else if (userState == 1) {
                    return <Tag color="red">未认证</Tag>
                }
            }
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 240,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => {
                //console.log("userState:",_this.state.tData[index].userState);
                if (_this.state.tData[index].userState == 3) {
                    return <Button.Group>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserDetail}>详情</Button>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserGoods}>查看发布</Button>
                        <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                                onClick={() => showThawConfirm(index)}>解冻 </Button>
                    </Button.Group>
                } else {
                    return <Button.Group>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserDetail}>详情</Button>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserGoods}>查看发布</Button>
                        <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                                onClick={() => showStopConfirm(index)}>停用 </Button>
                    </Button.Group>
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
                <CustomBreadcrumb arr={["用户信息"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <Row>
                                <Col span={6} style={{textAlign: 'left'}}>
                                    <FormItem label="用户名称："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('username')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                    <FormItem label="身份证号："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('idCard')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={6} style={{textAlign: 'left'}}>
                                    <FormItem label="手机号："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('phoneNum')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" className="btn" onClick={this.getUserByName}>
                                            <Icon type="search"/>查询
                                        </Button>
                                    </FormItem>

                                </Col>
                                <Col span={6} style={{textAlign: 'left'}}>
                                    <FormItem label="学号："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('studentId')(
                                            <Input placeholder="学号"/>
                                        )}

                                    </FormItem>

                                </Col>
                                <Col span={6} style={{textAlign: 'left'}}>
                                <FormItem label="邮箱："
                                          {...formItemLayout1}
                                >
                                    {getFieldDecorator('email')(
                                        <Input placeholder="请输入..."/>
                                    )}
                                </FormItem>
                                </Col>

                            </Row>
                        </Form>
                    </div>
                    <UserDetail title="用户详情" visible={_this.state.userDetailVisible} loading={_this.state.detailLoading}
                                onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                wrappedComponentRef={(form) => this.formRef = form}
                                userDetail={_this.state.userDetail}
                                receiptPlacelist={_this.state.receiptPlacelist}
                                record={_this.state.record}
                                handleToOrder={_this.handleToOrder}
                                handleToSellOrder={_this.handleToSellOrder}
                                handleToComment={_this.handleToComment}
                    />

                    <UserComment visible={_this.state.userCommentVisible} onCancel={_this.handleCancel}
                                 onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef1 = form}
                                 userDetail={_this.state.userDetail}
                                 toOrderOne={_this.toOrderOne}
                                 toOrderMine={_this.toOrderMine}
                                 isNull={_this.isNull}
                    />
                    <Table
                        className="ant-table-thead ant-table-tbody"
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.userId}
                        columns={columns}
                        loading={this.state.userLoading}
                    >
                    </Table>
                </div>
            </div>
        )
    }
}

Index = Form.create()(Index);
export default Index;
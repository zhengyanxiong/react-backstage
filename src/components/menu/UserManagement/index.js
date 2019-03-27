import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
/*import UserDetail from "../../../components/menu/UserManagement/modal/userDetail";
import SubmitUser from "../../../components/menu/UserManagement/modal/submitUser";
import UpdateUser from "../../../components/menu/UserManagement/modal/updateUser";*/
import {_getMemberListInPage} from "../../../api/user";
import {_updatePersonal} from "../../../api/user";
/*import {_deleteUserByIds} from "../../../api/user";
import {_getUserById} from "../../../api/user";
import {_updateUser} from "../../../api/user";*/
import {
    Form, Input, Modal, Icon, Cascader, Button, Table
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
            userDetail: {
                username: '',
                password: '',
                userState: '',
                createdTime: '',
                updatedTime: ''
            },
            index: '',
            visible: false,
            userDetailVisible: false,
            submitUserVisible: false,
            updateUserVisible: false,
            userLoading:true
        }
    }

    componentDidMount() {
        this.getMemberListInPage({
            state:2,
            page: 1,
            limit: 10
        })
    }

    async getMemberListInPage(data) {
        const res = await _getMemberListInPage(data);
       // console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            userLoading:false
        })
    }
    async updatePersonal(data) {
        const res = await _updatePersonal(data);
        console.log("list返回数据：", res);
        this.getMemberListInPage({
            state:2,
            page: this.state.page,
            limit: 10
        });
        Modal.success({
            title: '操作成功',
            content: '修改用户信息成功！',
        });
    }

    /* async getUserById(data) {
         console.log("默认UserName:" + this.state.userDetail.username);
         const res = await _getUserById(data);

         const form = this.formRef.props.form;
         this.setState({
             userDetail: {
                 username: res.username,

                 /!*createdTime: res.data.data.createdTime,
                 updatedTime: res.data.data.updatedTime*!/
             }
         });
         if (this.state.updateUserVisible == false) {
             this.setState({
                 userDetailVisible: true,
             })
         }
     }

     async updateUser(data) {
         console.log('res表单数据: ', data);
         const res = await _updateUser(data);
         console.log(res);
         this.setState({
             updateUserVisible: false
         });
         Modal.success({
             title: '成功',
             content: '管理员修改成功!',
         });
         this.getMemberListInPage({
             params: {
                 page: this.state.page,
                 limit: 10
             }
         });
     }

     async deleteUserByIds(data) {
         const res = await _deleteUserByIds(data);
         console.log(res);
         const tData = this.state.tData;
         //console.log("aaaa", this.state.selectedRowKeys);
         for (var i = 0; i < this.state.selectedRowKeys.length; i++) {
             tData.splice(this.state.selectedRowKeys[i], 1);//获取索引，后面的 1 是删除几行
         }
         this.setState({tData: tData});
         this.setState({
             selectedRowKeys: [],
             loading: false
         });
         Modal.success({
             title: '删除成功',
             content: '管理员批量删除成功！',
         });
     }*/

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
            userDetailVisible: false,
            submitUserVisible: false,
            updateUserVisible: false
        });
        //this.formEndUpRef.props.form.resetFields();
    }


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
        console.log("userId：" + record.userId)
        this.setState({
            record: record,
            rowkey: rowkey,
            //endpointDetaeilVisible: false
        })
    };

    // checkbox状态
    onSelectChanges = (selectedRowKeys) => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({selectedRowKeys: selectedRowKeys});
        console.log('stateSelectedRowKeys: ', this.state.selectedRowKeys)
        //return selectedRowKeys
    };

    getUserByName = (page, limit) => {
        if (!this.isNull(this.state.tData)) {
            console.log('page：', page);
            console.log('limit：', limit);
            var data = {
                state:2,
                    page: page,
                    limit: limit
            };
            var username = this.props.form.getFieldValue("username");
            if (this.isNull(limit)) {
                if (!this.isNull(username)) {
                    console.log("userName不为空:", username)
                    data = {
                        state:2,
                            username: username,
                            page: this.state.page,
                            limit: this.state.limit
                    }
                } else {
                    data = {
                        state:2,
                            page: this.state.page,
                            limit: this.state.limit
                    }
                }
            } else {
                if (!this.isNull(username)) {
                    data = {
                        state:2,
                            username: username,
                            page: page,
                            limit: limit
                    }
                }
            }
            console.log("传的data参数:", data)
            this.getMemberListInPage(data);
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
                console.log("recordId:" + _this.state.record.userId);
                console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.userId)) {
                    var data = {
                            userId: _this.state.record.userId,
                            userState:2
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
    showStopConfirm=()=>{
        var _this = this;
        confirm({
            title: '你确定要停用该用户吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            //删除行
            onOk() {
                console.log("recordId:" + _this.state.record.userId);
                console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.userId)) {
                    var data = {
                        userId: _this.state.record.userId,
                        userState:3
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
            console.log("recordId:" + this.state.record.userId);
            console.log("rowkey:" + this.state.rowkey);
            var data = {
                params: {
                    userId: this.state.record.userId
                }
            }
            console.log('qqq' + data);
            this.getUserById(data);
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
        console.log(this.state.record.userId);
        console.log("点击修改按钮事件");
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
        console.log("formSubUserRef", this.formSubUserRef);
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    submitUserVisible: false
                });
                console.log("formSubUserRef", this.formSubUserRef);
                var userInfo = this.childSub.getSubItemsValue();
                console.log(this.childSub.getSubItemsValue());
                var data = {
                    username: userInfo.username,
                };
                console.log('表单数据: ', data);
                this.submitUser(data);
            }
            form.resetFields();
        });
    };
    //更新点击事件
    handleUpdateUser = (e) => {
        console.log("更新点击事件", this.formUpUserRef.props.form);
        const form = this.formUpUserRef.props.form;
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    updateUserVisible: false
                });
                console.log("formEndUpRef:", this.formUpUserRef);
                var userInfo = this.childUp.getUpItemsValue();
                console.log(this.childUp.getUpItemsValue());
                var data = {
                    userId: this.state.record.userId,
                    username: userInfo.username,
                };
                console.log('修改表单数据: ', data);
                this.updateUser(data);
            }
            form.resetFields();
        });

    };
    //批量删
    startDelete = () => {
        var _this = this;
        console.log("ffffffff", _this.state.selectedRowKeys);
        var idList = [];
        console.log('selectedRowKeys:', _this.state.selectedRowKeys);
        const selectedRowKeys = _this.state.selectedRowKeys;
        for (var i = 0; i < selectedRowKeys.length; i++) {
            var selectedRowKey = selectedRowKeys[i];
            console.log('selectedRowKeys[i]:', selectedRowKeys[i]);
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
            title: '用户名',
            dataIndex: 'username',
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
            title: '用户状态',
            dataIndex: 'userState',
            render(userState) {
                if (userState == 2) {
                    return "审核正常"
                } else if (userState == 3) {
                    return "已停用"
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
                //console.log("userState:",_this.state.tData[index].userState);
                if (_this.state.tData[index].userState == 3) {
                    return <Button.Group>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserDetail}>详情</Button>

                        <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                                onClick={() => showThawConfirm(index)} >解冻 </Button>
                    </Button.Group>
                } else {
                    return <Button.Group>
                        < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                                 onClick={_this.handleUserDetail}>详情</Button>

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
                console.log('Current: ', current, '; PageSize: ', pageSize)
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
                            <FormItem label="用户名称："
                                      {...formItemLayout} style={{width: "710px"}}
                            >
                                {getFieldDecorator('username')(
                                    <Input placeholder="请输入..."/>
                                )}
                                <Button type="primary" className="btn" onClick={this.getUserByName}>
                                    <Icon type="search"/>查询
                                </Button>
                               {/* <Button type="primary" htmlType="submit" icon="user-add"
                                        onClick={this.showSubmitConfirm}
                                        style={{margin: "4px 120px", position: "absolute"}}>添加</Button>*/}
                            </FormItem>
                            <div style={{float: "left", margin: "-59px 0"}}>
                                <Button
                                    icon="usergroup-delete" type="danger"
                                    onClick={this.startDelete}
                                    disabled={!hasSelected}
                                    loading={loading}
                                >
                                    停用
                                </Button>
                                <span
                                    style={{marginLeft: 8}}> {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''} </span>
                            </div>
                        </Form>
                    </div>
                    {/*<UserDetail title="管理员详情" visible={_this.state.userDetailVisible} loading={loading}
                                 onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef = form}
                                 userDetail={_this.state.userDetail}/>
                    <SubmitUser title="新增管理员" visible={_this.state.submitUserVisible}
                                 onOk={_this.handleSubmitUser} onCancel={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formSubUserRef = form}
                                 formSubUserRef={_this.formSubUserRef}/>
                    <UpdateUser title="修改管理员" visible={_this.state.updateUserVisible}
                                 onOk={_this.handleUpdateUser} onCancel={_this.handleCancel}
                                 userDetail={_this.state.userDetail}
                                 wrappedComponentRef={(form) => this.formUpUserRef = form}
                                 formUpUserRef={_this.formUpUserRef}/>*/}
                    <Table
                        className="ant-table-thead ant-table-tbody" rowSelection={rowSelection}
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
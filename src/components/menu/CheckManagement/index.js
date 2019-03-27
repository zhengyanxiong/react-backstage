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
            checkLoading:true
        }
    }

    componentDidMount() {
        this.getMemberListInPage({
            state:1,
            page: 1,
            limit: 10
        })
    }

    async getMemberListInPage(data) {
        const res = await _getMemberListInPage(data);
        console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit,
            checkLoading:false
        })
    }
    async updatePersonal(data) {
        const res = await _updatePersonal(data);
        console.log("list返回数据：", res);
        this.getMemberListInPage({
            state:1,
            page: this.state.page,
            limit: 10
        });
        Modal.success({
            title: '操作成功',
            content: '修改用户信息成功！',
        });
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
                state:1,
                    page: page,
                    limit: limit
            };
            var username = this.props.form.getFieldValue("username");
            if (this.isNull(limit)) {
                if (!this.isNull(username)) {
                    console.log("userName不为空:", username)
                    data = {
                        state:1,
                            username: username,
                            page: this.state.page,
                            limit: this.state.limit
                    }
                } else {
                    data = {
                        state:1,
                            page: this.state.page,
                            limit: this.state.limit
                    }
                }
            } else {
                if (!this.isNull(username)) {
                    data = {
                        state:1,
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
    //获取子菜单元素数据等
    formSubUserRef = (ref) => {
        this.childSub = ref
    }
    formUpUserRef = (ref) => {
        this.childUp = ref
    }


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

    //审核通过
    showPassConfirm = () => {
        var _this = this;
        confirm({
            title: '确定审核通过该用户吗?请检查仔细哦',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            //删除行
            onOk() {
                //console.log("recordId:" + _this.state.record.userId);
                //console.log("rowkey:" + _this.state.rowkey);
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
    //审核通过
    showPassOutConfirm = () => {
        var _this = this;
        confirm({
            title: '确定该用户审核不通过吗?请检查仔细哦',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            //删除行
            onOk() {
                /*console.log("recordId:" + _this.state.record.userId);
                console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.userId)) {
                    var data = {
                        userId: _this.state.record.userId,
                        userState:1
                    };
                    //console.log("data:" + data.params.userId);
                    _this.updatePersonal(data);
                }*/

            },
            onCancel() {
                //console.log('取消');
            },
        });
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
                return <font color="#FF0000">未审核</font>
            }
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 269,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => {
                //console.log("userState:",_this.state.tData[index].userState);
                    return <div> < Button type="primary" size="small" htmlType={'button'} style={{margin: "10px",width: "52px"}}
                                     onClick={_this.handleUserDetail}>详情</Button>
                        <Button.Group>

                        <Button size="small" htmlType={'button'} style={{width: "52px"}}
                                onClick={_this.showPassConfirm} icon="check" title="审核通过" > </Button>
                            <Button type="danger" size="small" htmlType={'button'} style={{width: "52px"}}
                                    onClick={_this.showPassOutConfirm} icon="close"title="未通过"> </Button>
                    </Button.Group>
                    </div>

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
                                   审核通过
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
                        loading={this.state.checkLoading}
                    >
                    </Table>
                </div>
            </div>
        )
    }
    }

    Index = Form.create()(Index);
export default Index;
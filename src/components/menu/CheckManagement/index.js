import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import AdminDetail from "../../../components/menu/AdminManagement/modal/adminDetail";
import SubmitAdmin from "../../../components/menu/AdminManagement/modal/submitAdmin";
import UpdateAdmin from "../../../components/menu/AdminManagement/modal/updateAdmin";
import {_getAdminListInPage} from "../../../api/userAdmin";
import {_deleteAdminById} from "../../../api/userAdmin";
import {_deleteAdminByIds} from "../../../api/userAdmin";
import {_getAdminById} from "../../../api/userAdmin";
import {_submitAdmin} from "../../../api/userAdmin";
import {_updateAdmin} from "../../../api/userAdmin";
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
            adminDetail: {
                adminName: '',
                password: '',
                adminType: '',
                createdTime: '',
                updatedTime: ''
            },
            index: '',
            visible: false,
            adminDetailVisible: false,
            submitAdminVisible: false,
            updateAdminVisible: false,
        }
    }

    componentDidMount() {
        this.getAdminListInPage({
            params: {
                page: 1,
                limit: 10,
            }
        })
    }

    async getAdminListInPage(data) {
        const res = await _getAdminListInPage(data);
        console.log("list返回数据：", res);
        this.setState({
            tData: res.list,
            count: res.count,
            page: res.page,
            limit: res.limit
        })
        /*localStorage.setItem('username',res.data.data.name)
          this.props.history.push({pathname:'/home'});*/
        //alert(this.state.count);
    }

    async deleteAdminById(data) {
        const res = await _deleteAdminById(data);
        console.log(res);
        const tData = this.state.tData;
        tData.splice(this.state.rowkey, 1);//获取索引，后面的 1 是删除几行
        this.setState({tData: tData});
        Modal.success({
            title: '删除成功',
            content: '管理员删除成功！',
        });
    }

    async getAdminById(data) {
        console.log("默认adminName:" + this.state.adminDetail.adminName);
        const res = await _getAdminById(data);

        const form = this.formRef.props.form;
        this.setState({
            adminDetail: {
                adminName: res.adminName,
                adminPassword: res.adminPassword,
                adminType: res.adminType,
                /*createdTime: res.data.data.createdTime,
                updatedTime: res.data.data.updatedTime*/
            }
        });
        if (this.state.updateAdminVisible == false) {
            this.setState({
                adminDetailVisible: true,
            })
        }
    }

    async submitAdmin(data) {
        console.log('res表单数据: ', data);
        const res = await _submitAdmin(data);
        console.log(res);
        Modal.success({
            title: '管理员添加成功',
            content: '管理员类型：普通管理员',
        });
        this.getAdminListInPage({
            params: {
                page: this.state.page,
                limit: 10
            }
        });
    }

    async updateAdmin(data) {
        console.log('res表单数据: ', data);
        const res = await _updateAdmin(data);
        console.log(res);
        this.setState({
            updateAdminVisible: false
        });
        Modal.success({
            title: '成功',
            content: '管理员修改成功!',
        });
        this.getAdminListInPage({
            params: {
                page: this.state.page,
                limit: 10
            }
        });
    }

    async deleteAdminByIds(data) {
        const res = await _deleteAdminByIds(data);
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
            adminDetailVisible: false,
            submitAdminVisible: false,
            updateAdminVisible: false
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
        console.log("adminId：" + record.adminId)
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

    getAdminByName = (page, limit) => {
        if (!this.isNull(this.state.tData)) {
            console.log('page：', page);
            console.log('limit：', limit);
            var data = {
                params: {
                    page: page,
                    limit: limit
                }
            };
            var adminName = this.props.form.getFieldValue("adminName");
            if (this.isNull(limit)) {
                if (!this.isNull(adminName)) {
                    console.log("adminName不为空:", adminName)
                    data = {
                        params: {
                            adminName: adminName,
                            page: this.state.page,
                            limit: this.state.limit
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
            } else {
                if (!this.isNull(adminName)) {
                    data = {
                        params: {
                            adminName: adminName,
                            page: page,
                            limit: limit
                        }
                    }
                }
            }
            console.log("传的data参数:", data)
            this.getAdminListInPage(data);
        } else {
            Modal.error({
                title: '查询admin失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };


    //删
    showDeleteConfirm = () => {
        var _this = this;
        confirm({
            title: '你确定要删除该管理员吗?',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            //删除行
            onOk() {
                console.log("recordId:" + _this.state.record.adminId);
                console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.adminId)) {
                    var data = {
                        params: {
                            adminId: _this.state.record.adminId
                        }
                    };
                    //console.log("data:" + data.params.adminId);
                    _this.deleteAdminById(data);
                }
            },
            onCancel() {
                console.log('取消');
            },
        });
    };
    //详情点击事件
    handleAdminDetail = () => {
        if (!this.isNull(this.state.record.adminId)) {
            console.log("recordId:" + this.state.record.adminId);
            console.log("rowkey:" + this.state.rowkey);
            var data = {
                params: {
                    adminId: this.state.record.adminId
                }
            };
            console.log('qqq' + data);
            this.getAdminById(data);
        }
    };
    //修改或添加提交表单modal
    showSubmitConfirm = () => {
        if (!this.isNull(this.state.tData)) {
            this.setState({
                submitAdminVisible: true
            });
        } else {
            Modal.error({
                title: '新增管理员失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }
    };
    showUpdateConfirm = () => {
        console.log(this.state.record.adminId);
        console.log("点击修改按钮事件");
        this.getAdminById({
            params: {
                adminId: this.state.record.adminId
            }
        });
        this.setState({
            updateAdminVisible: true
        });
    };

    //获取子菜单元素数据等
    formSubAdminRef = (ref) => {
        this.childSub = ref
    };
    formUpAdminRef = (ref) => {
        this.childUp = ref
    };

    //确认添加点击事件
    handleSubmitAdmin = (e) => {
        const form = this.formSubAdminRef.props.form;
        console.log("formSubAdminRef", this.formSubAdminRef);
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    submitAdminVisible: false
                });
                console.log("formSubAdminRef", this.formSubAdminRef);
                var adminInfo = this.childSub.getSubItemsValue();
                console.log(this.childSub.getSubItemsValue());
                var data = {
                    adminName: adminInfo.adminName,
                    adminPassword: adminInfo.adminPassword,
                };
                console.log('表单数据: ', data);
                this.submitAdmin(data);
            }
            form.resetFields();
        });
    };
    //更新点击事件
    handleUpdateAdmin = (e) => {
        console.log("更新点击事件", this.formUpAdminRef.props.form);
        const form = this.formUpAdminRef.props.form;
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    updateAdminVisible: false
                });
                console.log("formEndUpRef:", this.formUpAdminRef);
                var adminInfo = this.childUp.getUpItemsValue();
                console.log(this.childUp.getUpItemsValue());
                var data = {
                    adminId: this.state.record.adminId,
                    adminName: adminInfo.adminName,
                    adminPassword: adminInfo.adminPassword
                };
                console.log('修改表单数据: ', data);
                this.updateAdmin(data);
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
            idList.push(_this.state.tData[selectedRowKey].adminId);
        }
        /*var data = {
            idList:idList
        }*/
        console.log("idList：", idList);
       // console.log("data：", data);

        _this.deleteAdminByIds(idList);
        this.setState({loading: true});

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
            title: '管理员',
            dataIndex: 'adminName',
        }, {
            title: '管理员类型',
            dataIndex: 'adminType',
            render: (text, record, index) => (
                <div>
                    普通管理员
                </div>
            )
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 259,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => (
                <Button.Group>
                    <Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                            onClick={_this.showUpdateConfirm}>修改</Button>
                    <Button type="danger" size="small" htmlType={'button'} style={{margin: "6px"}}
                            onClick={() => showDeleteConfirm(index)}> 删除 </Button>
                    < Button type="primary" size="small" htmlType={'button'} style={{margin: "6px"}}
                             onClick={_this.handleAdminDetail}>详情</Button>
                </Button.Group>
            ),
        }];

        //分页
        const pagination = {
            total: _this.state.count,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
                _this.getAdminByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            },
            onChange(current, pageSize) {
                //console.log('Current: ', typeof (current));
                _this.getAdminByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            }
        };

        return (
            <div>
                <CustomBreadcrumb arr={["审核注册"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <FormItem label="管理员名称："
                                      {...formItemLayout} style={{width: "710px"}}
                            >
                                {getFieldDecorator('adminName')(
                                    <Input placeholder="请输入..."/>
                                )}
                                <Button type="primary" className="btn" onClick={this.getAdminByName}>
                                    <Icon type="search"/>查询
                                </Button>
                                <Button type="primary" htmlType="submit" icon="user-add"
                                        onClick={this.showSubmitConfirm}
                                        style={{margin: "4px 120px", position: "absolute"}}>添加</Button>
                            </FormItem>
                            <div style={{float: "left", margin: "-59px 0"}}>
                                <Button
                                    icon="usergroup-delete" type="danger"
                                    onClick={this.startDelete}
                                    disabled={!hasSelected}
                                    loading={loading}
                                >
                                    删除
                                </Button>
                                <span
                                    style={{marginLeft: 8}}> {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''} </span>
                            </div>
                        </Form>
                    </div>
                    <AdminDetail title="管理员详情" visible={_this.state.adminDetailVisible} loading={loading}
                                 onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef = form}
                                 adminDetail={_this.state.adminDetail}/>
                    <SubmitAdmin title="新增管理员" visible={_this.state.submitAdminVisible}
                                 onOk={_this.handleSubmitAdmin} onCancel={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formSubAdminRef = form}
                                 formSubAdminRef={_this.formSubAdminRef}/>
                    <UpdateAdmin title="修改管理员" visible={_this.state.updateAdminVisible}
                                 onOk={_this.handleUpdateAdmin} onCancel={_this.handleCancel}
                                 adminDetail={_this.state.adminDetail}
                                 wrappedComponentRef={(form) => this.formUpAdminRef = form}
                                 formUpAdminRef={_this.formUpAdminRef}/>
                    <Table
                        className="ant-table-thead ant-table-tbody" rowSelection={rowSelection}
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.adminId}
                        columns={columns}>
                    </Table>
                </div>
            </div>
        )
    }
}

Index = Form.create()(Index);
export default Index;
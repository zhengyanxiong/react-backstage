import React, {Component} from "react";
import CustomBreadcrumb from "../../CustomBreadcrumb";
import ActiveDetail from "../../../components/menu/ActiveManagement/modal/activeDetail";
import PublishActive from "../../../components/menu/ActiveManagement/modal/pulishActive";
import UpdateActive from "../../../components/menu/ActiveManagement/modal/updateActive";
import {_publishActivePicture} from "../../../api/activePicture";
import {_getActiveListInPage} from "../../../api/active";
import {_deleteActiveById} from "../../../api/active";
import {_deleteActiveByIds} from "../../../api/active";
import {_getActiveById} from "../../../api/active";
import {_publishActive} from "../../../api/active";
import {_updateActive} from "../../../api/active";
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
            activePictrueUrl:'',
            activeDetail: {
                activeName: '',
                activeDescription: '',
                activeStartTime: '',
                activeEndTime: ''
            },
            index: '',
            visible: false,
            activeDetailVisible: false,
            publishActiveVisible: false,
            updateActiveVisible: false,
            fileList:[]
        }
    }

    componentDidMount() {
        this.getActiveListInPage({
            params: {
                page: 1,
                limit: 10,
            }
        })
    }

    async getActiveListInPage(data) {
        const res = await _getActiveListInPage(data);
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

    async deleteActiveById(data) {
        const res = await _deleteActiveById(data);
        console.log(res);
        const tData = this.state.tData;
        tData.splice(this.state.rowkey, 1);//获取索引，后面的 1 是删除几行
        this.setState({tData: tData});
        Modal.success({
            title: '删除成功',
            content: '活动删除成功！',
        });
    }

    async getActiveById(data) {
        //console.log("默认activeName:" + this.state.activeDetail.activeName);
        //this.getActivePicById(data);
        const res = await _getActiveById(data);
        this.setState({
            activeDetail: {
                activeId: this.state.record.activeId,
                activeName: res.activeTable.activeName,
                activeStartTime: res.activeTable.activeStartTime,
                activeEndTime: res.activeTable.activeEndTime,
                activeDescription:res.activeTable.activeDescription
            },
            fileList:[{
                uid: '-1',
                name:  res.activeTable.activeName,
                status: 'done',
                url: res.activePictrueUrl,
            }],
            activePictrueUrl:res.activePictrueUrl
        });
        if (res.activePictrueUrl==""){
            this.setState({
                activePictrueUrl:'http://47.107.228.169:8099/10/1/365bb11f3a114999a57c8fce38f5ac1c.png',
                fileList:''
            })
        }
        if (this.state.activeDetailVisible== false) {
            this.setState({
                updateActiveVisible: true,
            })
        }

    }
   /* async getActivePicById(data) {
        const res = await _getActivePicById(data);
        console.log("res:",res)
        if (res==null){
            this.setState({
                activePictrueUrl:'http://47.107.228.169:8099/10/1/365bb11f3a114999a57c8fce38f5ac1c.png',
            });
        }else {
            this.setState({
                activePictrueUrl:res,
            });
        }

        //console.log("url",this.state.activePictrueUrl)
    }*/

    async publishActive(data) {
        //console.log('res表单数据: ', data);
        const res = await _publishActive(data);
        this.publishActivePicture({
            activeId:res,
            activePictrueUrl:this.childPub.getPicUrl()
        });
        //console.log(res);
        Modal.success({
            title: '发布成功',
            content: '活动描述：'+data.activeName
        });
        /*this.getAdminListInPage({
            params: {
                page: this.state.page,
                limit: 10
            }
        });*/
    }

    async updateActive(data) {
        //console.log('res表单数据: ', data);
        const res = await _updateActive(data);
        console.log(res);
        this.setState({
            updateActiveVisible: false
        });
        Modal.success({
            title: '成功',
            content: '活动修改成功!',
        });
        this.getActiveListInPage({
            params: {
                page: this.state.page,
                limit: 10
            }
        });
    }

    async deleteActiveByIds(data) {
        const res = await _deleteActiveByIds(data);
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
            content: '活动批量删除成功！',
        });
    }

    async publishActivePicture(data) {
        //console.log('res表单数据: ', data);
        const res = await _publishActivePicture(data);
        this.getActiveListInPage({
            params: {
                page: this.state.page,
                limit: 10
            }
        })
       // console.log(res);
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
            activeDetailVisible: false,
            publishActiveVisible: false,
            updateActiveVisible: false
        });
        this.formUpActiveRef.props.form.resetFields();
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
        console.log("activeId：" + record.activeId)
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

    getActiveByName = (page, limit) => {
        if (!this.isNull(this.state.tData)) {
            console.log('page：', page);
            console.log('limit：', limit);
            var data = {
                params: {
                    page: page,
                    limit: limit
                }
            };
            var activeName = this.props.form.getFieldValue("activeName");
            if (this.isNull(limit)) {
                if (!this.isNull(activeName)) {
                    console.log("activeName不为空:", activeName)
                    data = {
                        params: {
                            activeName: activeName,
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
                if (!this.isNull(activeName)) {
                    data = {
                        params: {
                            activeName: activeName,
                            page: page,
                            limit: limit
                        }
                    }
                }
            }
            console.log("传的data参数:", data)
            this.getActiveListInPage(data);
        } else {
            Modal.error({
                title: '查询active失败',
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
                console.log("recordId:" + _this.state.record.activeId);
                console.log("rowkey:" + _this.state.rowkey);
                if (!_this.isNull(_this.state.record.activeId)) {
                    var data = {
                        params: {
                            activeId: _this.state.record.activeId
                        }
                    };
                    //console.log("data:" + data.params.activeId);
                    _this.deleteActiveById(data);
                }
            },
            onCancel() {
                console.log('取消');
            },
        });
    };
    //详情点击事件
    handleActiveDetail = () => {
        if (!this.isNull(this.state.record.activeId)) {
            //console.log("recordId:" + this.state.record.activeId);
            //console.log("rowkey:" + this.state.rowkey);
            this.setState({
                activeDetailVisible:true
            })
            var data = {
                params: {
                    activeId: this.state.record.activeId
                }
            };
            //console.log('qqq' + data);
            this.getActiveById(data);
        }
    };
    //修改或添加提交表单modal
    showPublishConfirm = () => {
        /*if (!this.isNull(this.state.tData)) {
            this.setState({
                publishActiveVisible: true
            });
        } else {
            Modal.error({
                title: '发布活动失败',
                content: '错误原因：服务器错误，请联系管理员',
            });
        }*/
        this.setState({
            publishActiveVisible: true
        });
    };
    showUpdateConfirm = () => {
        //console.log(this.state.record.activeId);
        //console.log("点击修改按钮事件");

        this.getActiveById({
            params: {
                activeId: this.state.record.activeId
            }
        });

    };

    //获取子菜单元素数据等
    formPubActiveRef = (ref) => {
        this.childPub = ref
    };
    formUpActiveRef = (ref) => {
        this.childUp = ref
    };

    //确认添加点击事件
    handlePublishActive = (e) => {
        const form = this.formPubActiveRef.props.form;
        //console.log("formPubActiveRef", this.formPubActiveRef);
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    publishActiveVisible: false
                });
                console.log("formPubActiveRef", this.formPubActiveRef);
                var activeInfo = this.childPub.getPubItemsValue();
                console.log(this.childPub.getPubItemsValue());
                var data = {
                    activeName: activeInfo.activeName,
                    activeStartTime: activeInfo.activeStartTime,
                    activeEndTime: activeInfo.activeEndTime,
                    activeDescription: activeInfo.activeDescription,
                };
                //console.log('表单数据: ', data);
                this.publishActive(data);

            }
            form.resetFields();
        });
    };
    //更新点击事件
    handleUpdateActive = (e) => {
        console.log("更新点击事件", this.formUpActiveRef.props.form);
        const form = this.formUpActiveRef.props.form;
        //调用子组件的自定义方法getItemsValue。注意：通过this.formRef 才能拿到数据
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                this.setState({
                    updateActiveVisible: false
                });
                console.log("formEndUpRef:", this.formUpActiveRef);
                var activeInfo = this.childUp.getUpItemsValue();
                var url = this.childUp.getUpPicUrl();
                console.log("this.childUp.getUpItemsValue():",this.childUp.getUpItemsValue());
                console.log("this.childUp.getUPPicUrl():",this.childUp.getUpPicUrl());
                var data = {
                    activeId:this.state.record.activeId,
                    activeName: activeInfo.activeName,
                    activeDescription: activeInfo.activeDescription,
                    activeStartTime: activeInfo.activeStartTime,
                    activeEndTime: activeInfo.activeEndTime,
                    activePictrueUrl:url
                };
                console.log('修改表单数据: ', data);
                this.updateActive(data);
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
            idList.push(_this.state.tData[selectedRowKey].activeId);
        }
        /*var data = {
            idList:idList
        }*/
        console.log("idList：", idList);
       // console.log("data：", data);

        _this.deleteActiveByIds(idList);
        this.setState({loading: true});

    };
    /**
     * 将"2018-05-19T08:04:52.000+0000"这种格式的时间转化为正常格式
     * @param time
     */
    timeFormat=(time) =>{
        var dateee = new Date(time).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

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
            width: 65,
            render: (text, record, index) => `${((_this.state.page) - 1) * (_this.state.limit) + index + 1}`
        }, {
            title: '活动名称',
            width: 110,
            dataIndex: 'activeName'
        }, {
            title: '开始时间',
            dataIndex: 'activeStartTime',
            render:(text, record, index)=>(
                this.timeFormat(_this.state.tData[index].activeStartTime)
            )
        }, {
            title: '结束时间',
            dataIndex: 'activeEndTime',
            render:(text, record, index)=>(
                this.timeFormat(_this.state.tData[index].activeEndTime)
            )
        }, {
            title: '活动描述',
            dataIndex: 'activeDescription'
        }, {
            title: '操作',
            dataIndex: 'operate',
            key: 'action',
            width: 215,
            fixed: 'right',
            align: 'center',
            render: (text, record, index) => (
                <Button.Group>
                    <Button type="primary" size="small" htmlType={'button'} style={{margin: "4px"}}
                            onClick={_this.showUpdateConfirm}>修改</Button>
                    <Button type="danger" size="small" htmlType={'button'} style={{margin: "4px"}}
                            onClick={() => showDeleteConfirm(index)}> 删除 </Button>
                    <Button type="primary" size="small" htmlType={'button'} style={{margin: "4px"}}
                             onClick={_this.handleActiveDetail}>详情</Button>
                </Button.Group>
            ),
        }];

        //分页
        const pagination = {
            total: _this.state.count,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize)
                _this.getActiveByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            },
            onChange(current, pageSize) {
                //console.log('Current: ', typeof (current));
                _this.getActiveByName(current, pageSize);
                _this.setState({
                    selectedRowKeys: []
                })
            }
        };
       /* let uploadPic=null
        if (_this.state.updateActiveVisible){
            uploadPic= <UpdateActive title="修改活动" visible={_this.state.updateActiveVisible}
                                      onOk={_this.handleUpdateActive} onCancel={_this.handleCancel}
                                      activeDetail={_this.state.activeDetail}
                                      activePictrueUrl={_this.state.activePictrueUrl}
                                      wrappedComponentRef={(form) => this.formUpActiveRef = form}
                                      formUpActiveRef={_this.formUpActiveRef}
                                      fileList={_this.state.fileList}
            />
        }*/

        return (
            <div>
                <CustomBreadcrumb arr={["活动管理"]}/>
                <div style={{padding: 24, background: '#fff', minHeight: 360}}>
                    <div style={{margin: "-11px 0px -13px 0px", width: "auto"}}>
                        <Form>
                            <FormItem label="活动名称："
                                      {...formItemLayout} style={{width: "710px"}}
                            >
                                {getFieldDecorator('activeName')(
                                    <Input placeholder="请输入..."/>
                                )}
                                <Button type="primary" className="btn" onClick={this.getActiveByName}>
                                    <Icon type="search"/>查询
                                </Button>
                                <Button type="primary" htmlType="submit" icon="notification"
                                        onClick={this.showPublishConfirm}
                                        style={{margin: "4px 120px", position: "absolute"}}>发布活动</Button>
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
                    <PublishActive title="发布活动" visible={_this.state.publishActiveVisible}
                                   onOk={_this.handlePublishActive} onCancel={_this.handleCancel}
                                   wrappedComponentRef={(form) => this.formPubActiveRef = form}
                                   formPubActiveRef={_this.formPubActiveRef}/>
                   <ActiveDetail title="活动详情" visible={_this.state.activeDetailVisible} loading={loading}
                                 onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef = form}
                                 activeDetail={_this.state.activeDetail}
                                 activePictrueUrl={_this.state.activePictrueUrl}
                                 activeDetailVisible={_this.state.activeDetailVisible}
                   />

                   <UpdateActive title="修改活动" visible={_this.state.updateActiveVisible}
                                     onOk={_this.handleUpdateActive} onCancel={_this.handleCancel}
                                     activeDetail={_this.state.activeDetail}
                                     activePictrueUrl={_this.state.activePictrueUrl}
                                     wrappedComponentRef={(form) => this.formUpActiveRef = form}
                                     formUpActiveRef={_this.formUpActiveRef}
                                     fileList={_this.state.fileList}
                                 updateActiveVisible={_this.state.updateActiveVisible}
                />
                   {/* {
                        uploadPic
                    }*/}
                    <Table
                        className="ant-table-thead ant-table-tbody" rowSelection={rowSelection}
                        dataSource={this.state.tData} bordered
                        scroll={{x: true}}
                        onRow={(record, rowkey) => ({onMouseOver: this.handleRecord.bind(this, record, rowkey)})}
                        pagination={pagination}
                        rowKey={this.state.tData.activeId}
                        columns={columns}>
                    </Table>
                </div>
            </div>
        )
    }
}

Index = Form.create()(Index);
export default Index;
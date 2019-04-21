import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import CheckDetail from "../../../components/menu/CheckManagement/modal/checkDetail";
/*import SubmitUser from "../../../components/menu/UserManagement/modal/submitUser";
import UpdateUser from "../../../components/menu/UserManagement/modal/updateUser";*/
import {_getMemberListInPage} from "../../../api/user";
import {_updatePersonal} from "../../../api/user";
import {_getUserAllByUserId} from "../../../api/user";
import CheckComment from "../../../components/menu/CheckManagement/modal/checkComment";

/*import {_deleteUserByIds} from "../../../api/user";
import {_getUserById} from "../../../api/user";
import {_updateUser} from "../../../api/user";*/
import {
    Form, Input, Modal, Icon, Cascader, Button, Table,Tag,message,Row,Col
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
                        headImag: "",
                        orderNum: "",
                        stuCardFront: "",
                        stuCardBack: "",
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
                        orderNum: "",
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
                goodsActiveCount: 0
            },
            receiptPlacelist: [
                {receiptId: 0,
                    userId: 0,
                    addressName: "",
                    addressState:""
                }
            ],
            index: '',
            visible: false,
            userDetailVisible: false,
            submitUserVisible: false,
            updateUserVisible: false,
            checkCommentVisible: false,
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
    async getUserAllByUserId(data) {
        const res = await _getUserAllByUserId(data);
        if(0==res.receiptPlacelist){
            this.setState({
                /* userDetail:{
                     username: res.username,
                     headImag: res.headImag,
                     phoneNum: res.phoneNum,
                     sex: res.sex,
                     email: res.email,
                     realName: res.realName,
                     idCard: res.idCard,
                     stuCardFront: res.stuCardFront,
                     stuCardBack: res.stuCardBack,
                     registerDate: res.registerDate,
                     userCreatedTime: res.userCreatedTime,
                     userUpdatedTime: res.userUpdatedTime,
                     userState: res.userState,
                     creditNum: res.creditNum,
                     loveValue: res.loveValue,
                     sumGrade: res.sumGrade,
                     schoolName: res.schoolName,
                 }*/
                receiptPlacelist:[{
                    addressName:"",
                    receiptId:0
                }],
                userDetail:res,
            });
        }else {
            this.setState({
                /* userDetail:{
                     username: res.username,
                     headImag: res.headImag,
                     phoneNum: res.phoneNum,
                     sex: res.sex,
                     email: res.email,
                     realName: res.realName,
                     idCard: res.idCard,
                     stuCardFront: res.stuCardFront,
                     stuCardBack: res.stuCardBack,
                     registerDate: res.registerDate,
                     userCreatedTime: res.userCreatedTime,
                     userUpdatedTime: res.userUpdatedTime,
                     userState: res.userState,
                     creditNum: res.creditNum,
                     loveValue: res.loveValue,
                     sumGrade: res.sumGrade,
                     schoolName: res.schoolName,
                 }*/
                userDetail:res,
                receiptPlacelist:res.receiptPlacelist
            });

        }
        console.log("user:",this.state.userDetail)
    }
    handleToOrder=()=>{
        /*localStorage.setItem("userDetailVisible","false");*/
        if(this.state.userDetail.userBuyCount==0){
            message.warning('该用户还没有订单哦');

        }else {
            localStorage.setItem("userId",this.state.record.userId);
            this.setState({
            userDetailVisible:false
        });
            const {from} = {from: {pathname: '/index/orderManagement'}};
            this.props.history.push(from)
        }
    };
    handleToCommentC = () => {
        if (this.state.userDetail.userBuyCount == 0) {
            message.warning('该用户还没有买过东西哦');
        }else {
            this.setState({
                userDetailVisible: false,
                checkCommentVisible: true
            });
        }
    };
    //modal取消事件通用
    handleCancel = () => {
        localStorage.removeItem("userId");
        this.setState({
            visible: false,
            userDetailVisible: false,
            submitUserVisible: false,
            updateUserVisible: false
        });
        //this.formEndUpRef.props.form.resetFields();
    };

    toOrderOne=()=>{
        var orderNum= localStorage.getItem("orderNum", orderNum);
        //alert("commentedPerId"+commentedPerId);
        if(!this.isNull(orderNum)){
            this.setState({
                checkCommentVisible: false
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
        console.log("userId：" + record.userId);
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
            var studentId = this.props.form.getFieldValue("studentId");
            var phoneNum = this.props.form.getFieldValue("phoneNum");
            var idCard = this.props.form.getFieldValue("idCard");
            var email = this.props.form.getFieldValue("email");

            if (this.isNull(limit)) {
                if (!this.isNull(username)) {
                    //console.log("userName不为空:", username)
                    data = {
                        state:1,
                        username: username,
                        studentId:studentId,
                        phoneNum:phoneNum,
                        idCard:idCard,
                        email:email,
                        page: this.state.page,
                        limit: this.state.limit
                    }
                } else {
                    data = {
                        state:1,
                        studentId:studentId,
                        phoneNum:phoneNum,
                        idCard:idCard,
                        email:email,

                        page: this.state.page,
                        limit: this.state.limit
                    }
                }
            } else {
                if (!this.isNull(username)) {
                    data = {
                        state:1,
                        username: username,
                        studentId:studentId,
                        phoneNum:phoneNum,
                        idCard:idCard,
                        email:email,

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
            /*console.log("recordId:" + this.state.record.userId);
            console.log("rowkey:" + this.state.rowkey);*/
            var data = {
                params: {
                    userId: this.state.record.userId
                }
            };
            this.setState({
                userDetailVisible:true
            });
            //console.log('qqq' + data);
            this.getUserAllByUserId(data);
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
            labelCol: {span: 12},
            wrapperCol: {span:12}
        };
        const formItemLayout1 = {
            labelCol: {span: 7},
            wrapperCol: {span: 16}
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
                if (username==null){
                    return <Tag color="red">未设置昵称</Tag>
                }else {
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
            align:'center',
            render(userState) {
                return <Tag color="orange">未审核</Tag>
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
                            <Row>
                                <Col span={10} style={{textAlign: 'left'}}>
                                    <FormItem label="用户名称："
                                              {...formItemLayout}
                                    >
                                        {getFieldDecorator('username')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                    <FormItem label="身份证号："
                                              {...formItemLayout}
                                    >
                                        {getFieldDecorator('idCard')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                </Col>
                                <Col span={7} style={{textAlign: 'left'}}>
                                    <FormItem label="手机号："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('phoneNum')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>
                                    <FormItem label="邮箱："
                                              {...formItemLayout1}
                                    >
                                        {getFieldDecorator('email')(
                                            <Input placeholder="请输入..."/>
                                        )}
                                    </FormItem>

                                </Col>
                                <Col span={7} style={{textAlign: 'left'}}>
                                    <FormItem label="学号："
                                              {...formItemLayout2}
                                    >
                                        {getFieldDecorator('studentId')(
                                            <Input placeholder="学号"/>
                                        )}

                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" className="btn" onClick={this.getUserByName}>
                                            <Icon type="search"/>查询
                                        </Button>
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
                                   审核通过
                                </Button>
                                <span
                                    style={{marginLeft: 8}}> {hasSelected ? `已选 ${selectedRowKeys.length} 项` : ''} </span>
                            </div>
                        </Form>
                    </div>
                    <CheckDetail title="用户详情" visible={_this.state.userDetailVisible} loading={loading}
                                onCancel={_this.handleCancel} onOk={_this.handleCancel}
                                wrappedComponentRef={(form) => this.formRef = form}
                                userDetail={_this.state.userDetail}
                                receiptPlacelist={_this.state.receiptPlacelist}
                                record={_this.state.record}
                                handleToOrder={_this.handleToOrder}
                                 handleToCommentC={_this.handleToCommentC}
                    />
                    <CheckComment visible={_this.state.checkCommentVisible} onCancel={_this.handleCancel}
                                 onOk={_this.handleCancel}
                                 wrappedComponentRef={(form) => this.formRef1 = form}
                                 userDetail={_this.state.userDetail}
                                 toOrderOne={_this.toOrderOne}
                    />
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
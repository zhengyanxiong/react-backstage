import React from "react";
import {Form, Select, Modal, Row, Col, Spin, Input, Tag, Tooltip, Button, Divider} from "antd";
import Zmage from 'react-zmage'
import '../../../../App.css'

const FormItem = Form.Item
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 15},
    },
};
const formItemLayout4 = {
    labelCol: {span: 7},
    wrapperCol: {span: 16}
};
const formItemLayout5 = {
    labelCol: {span: 8},
    wrapperCol: {span: 13}
};
const formItemLayout2 = {
    labelCol: {span: 3},
    wrapperCol: {span: 19}
};
const formItemLayout1 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 5},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 17},
    },
};
const UserCompDetail = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        componentDidMount() {

            //console.log("url",this.props.activePictrueUrl)
        }

        timeFormat = (time) => {
            var dateee = new Date(time).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        };

        handleCancel = () => this.setState({previewVisible: false})


        render() {
            const {
                visible, onCancel, form, loading
            } = this.props;
            const {getFieldDecorator} = form;
            var compItems = [];
            if (this.props.compImgList.length > 0) {
                {
                    for (let i = 0; i < this.props.compImgList.length; i++) {
                        compItems.push(<Zmage key={i} style={{
                            marginleft: "15px",
                            width: "120px",
                            height: "120px",
                            border: "1px solid #cec6c6",
                            borderRadius: "4px",
                            margin: "0 10px 0 0"
                        }} src={this.props.compImgList[i]}/>)
                    }
                }
            } else {
                compItems.push(<Tag key='1' color="red">举报暂无提交没有图片</Tag>)
            }
            return (
                <Modal
                    visible={visible}
                    title="举报投诉"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                    width="80%"
                > <Spin tip="加载中.." spinning={loading}>

                    <Form labelAlign="right">
                        <Divider orientation="left">举报处理详情</Divider>
                        <Row>
                            <Col span={9} style={{textAlign: 'left'}}>
                                <Form.Item label="举报者："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userComName', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tooltip title="前去查看该举报者">
                                            <Button type="primary" ghost
                                                    onClick={this.props.toUserWho}>{this.props.userCompDeatil.userComplaint.userComName == null ? this.props.userCompDeatil.userComplaint.userComStuId : this.props.userCompDeatil.userComplaint.userComName}</Button>
                                        </Tooltip>
                                    )}
                                </Form.Item>
                                <Form.Item label="被举报者：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('userComedName', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(<Tooltip title="前去查看该被举报者">
                                            <Button type="danger" ghost
                                                    onClick={this.props.toUserWhoed}>{this.props.userCompDeatil.userComplaint.userComedName == null ? this.props.userCompDeatil.userComplaint.userComedStuId : this.props.userCompDeatil.userComplaint.userComedName}</Button>
                                        </Tooltip>
                                    )}
                                </Form.Item>
                                <Form.Item label="投诉举报时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userComCreateTime', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.timeFormat(this.props.userCompDeatil.userComplaint.userComCreateTime)}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="管理员处理时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userComReplyTime', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.userCompDeatil.userComplaint.userComReplyTime == null ? "等待管理员核实" : this.timeFormat(this.props.userCompDeatil.userComplaint.userComReplyTime)}</label>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={9} style={{textAlign: 'left'}}>
                                <Form.Item label="举报者学号："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userComName', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.userCompDeatil.userComplaint.userComStuId}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="被举报者学号：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('userComedStuId', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.userCompDeatil.userComplaint.userComedStuId}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="举报状态："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userComplaintState', {
                                        initialValue: this.props.userCompDeatil.userComplaint.userComplaintState + '',
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Select disabled={true}>
                                            <Option value="0">等待管理员核实</Option>
                                            <Option value="10">已处理:描述不实,未停用被举报者</Option>
                                            <Option value="11">已处理:举报属实,已停用被举报者</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item label="举报截图：" hasFeedback {...formItemLayout2}>
                            {compItems}
                        </Form.Item>
                        <Form.Item
                            label="申请解冻描述:"
                            hasFeedback
                            {...formItemLayout2}
                        >
                            {getFieldDecorator('userComplaintDes', {
                                initialValue: this.props.userCompDeatil.userComplaint.userComplaintDes + '',
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Input.TextArea disabled rows={3}/>
                            )}
                        </Form.Item>

                        <Row>
                            <Divider orientation="left">解冻申请详情</Divider>
                            <Col span={13} style={{textAlign: 'left'}}>
                                <Form.Item
                                    label="过程描述:"
                                    hasFeedback
                                    {...formItemLayout1}
                                >
                                    {getFieldDecorator('userComplaintExp1', {
                                        initialValue: (this.props.userCompDeatil.userComplaint.userComplaintExp1 == null ? "暂未申请解冻" : this.props.userCompDeatil.userComplaint.userComplaintExp1) + '',
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Input.TextArea disabled rows={2}/>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={9} style={{textAlign: 'left'}}>
                                <Form.Item label="申请解冻处理："
                                           hasFeedback
                                           {...formItemLayout4}>
                                    {getFieldDecorator('userComplaintExp2', {
                                        initialValue: this.props.userCompDeatil.userComplaint.userComplaintExp2 + '',
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Select disabled={true}>
                                            <Option value="null">等待管理员处理</Option>
                                            <Option value="1">等待管理员处理解冻</Option>
                                            <Option value="2">举报处理结果，未冻结</Option>
                                            <Option value="0">被举报者暂未申请解冻</Option>
                                            <Option value="10">已处理：申请通过且已解冻</Option>
                                            <Option value="11">已处理：申请未通过将过段时间申请</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>

                        </Row>
                    </Form>
                </Spin>
                </Modal>
        );
        }
        }
        );
        export default Form.create()(UserCompDetail);        //创建form实例

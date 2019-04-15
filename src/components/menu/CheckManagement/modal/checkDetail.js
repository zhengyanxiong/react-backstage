import React from "react";
import {Form, Select, Modal, Rate, Row, Col, Tag} from "antd";
import Button from "antd/es/button/button";

const FormItem = Form.Item;
const desc = ['1.0', '2.0', '3.0', '4.0', '5.0'];
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 7},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 14},
    },
};
const formItemLayout1 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 7},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 15},
    },
};
const addressList = [];

const CheckDetail = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state={

            }
        }

        componentDidMount() {
            //console.log("dsfasogi", this.state)
        }

        timeFormat = (time) => {
            var dateee = new Date(time).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

        };
        render() {
            const {
                visible, onCancel, form
            } = this.props;
            const {getFieldDecorator} = form;

            return (
                <Modal
                    visible={visible}
                    title="用户详情"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                    width="85%"
                >
                    <div style={{height: "50px", marginBottom: "20px"}}>
                        <div style={{
                            float: "left",
                            background: "pink",
                            borderRadius: "50%",
                            width: "50px",
                            height: "50px",
                            margin: "-10px 7px 0 28px",
                            textAlign: "center"
                        }}>头像
                        </div>
                        <Tag color="#2db7f5"
                             style={{margin: "17px 15px 8px 10px"}}>{this.props.userDetail.userInfo.username}</Tag>
                        <Tag color="red">{this.props.userDetail.userInfo.sex}生</Tag>
                        <label>
                            共买{this.props.userDetail.userBuyCount}件
                        </label>
                        <Button type="primary" ghost style={{margin:"0px 10px 0 135px"}} onClick={this.props.handleToCommentC}>查看评论</Button>
                        <Button type="dashed" onClick={this.props.handleToOrder}>查看订单</Button>

                    </div>
                    <Form>
                        <Row>
                            <Col span={7} style={{textAlign: 'left'}}>
                                <Form.Item label="信用评分："
                                           hasFeedback
                                           {...formItemLayout}>
                                    <Rate allowHalf disabled tooltips={desc}
                                          value={this.props.userDetail.userInfo.creditNum}/>
                                    {this.props.userDetail.userInfo.creditNum ? <span
                                        className="ant-rate-text">{desc[this.props.userDetail.userInfo.creditNum - 1]}</span> : ''}
                                </Form.Item>
                                <Form.Item label="用户名：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('realName', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.userDetail.userInfo.realName}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="身份证：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('idCard', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.userDetail.userInfo.idCard}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="注册时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('registerDate')(
                                        <label>{this.timeFormat(this.props.userDetail.userInfo.registerDate)}</label>
                                    )}
                                </Form.Item>

                                <Form.Item
                                    label="用户状态:"
                                    hasFeedback
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('userState', {
                                        initialValue: this.props.userDetail.userInfo.userState + '',
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Select disabled={true}>
                                            <Option value="1">未审核</Option>
                                            <Option value="2">审核正常</Option>
                                            <Option value="3">停用</Option>
                                        </Select>
                                    )}
                                </Form.Item>
                            </Col>
                            <Col span={7} style={{textAlign: 'left'}}>
                                <Form.Item label="爱心评分："
                                           hasFeedback
                                           {...formItemLayout}>
                                    <Rate allowHalf disabled tooltips={desc} onChange={this.handleChange}
                                          value={this.props.userDetail.userInfo.loveValue}/>
                                    {this.props.userDetail.userInfo.loveValue ? <span
                                        className="ant-rate-text">{desc[this.props.userDetail.userInfo.loveValue - 1]}</span> : ''}

                                </Form.Item>
                                <Form.Item label="用户邮箱：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('email', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tag color="cyan">{this.props.userDetail.userInfo.email}</Tag>
                                    )}
                                </Form.Item>
                                <Form.Item label="用户学校：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('schoolName', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tag color="#87d068">{this.props.userDetail.userInfo.schoolName}</Tag>
                                    )}
                                </Form.Item>

                                <Form.Item label="认证时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userCreatedTime')(
                                        <label>{this.timeFormat(this.props.userDetail.userInfo.userCreatedTime)}</label>
                                    )}
                                </Form.Item><Form.Item label="学生证前面："
                                                       hasFeedback
                                                       {...formItemLayout}>
                                {getFieldDecorator('stuCardFront')(
                                    <label>{this.props.userDetail.userInfo.stuCardFront}</label>
                                )}
                            </Form.Item>

                            </Col>
                            <Col span={10} style={{textAlign: 'left'}}>
                                <Form.Item label="总体评分："
                                           hasFeedback
                                           {...formItemLayout}>
                                    <Rate allowHalf disabled tooltips={desc} onChange={this.handleChange}
                                          value={this.props.userDetail.userInfo.sumGrade}/>
                                    {this.props.userDetail.userInfo.sumGrade ? <span
                                        className="ant-rate-text">{desc[this.props.userDetail.userInfo.sumGrade - 1]}</span> : ''}
                                </Form.Item>
                                <Form.Item label="用户号码：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('phoneNum', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tag color="geekblue">{this.props.userDetail.userInfo.phoneNum}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Tag>
                                    )}
                                </Form.Item>

                            <Form.Item label="收货地址：" hasFeedback  {...formItemLayout1}>
                                    {getFieldDecorator('phoneNum', {
                                        initialValue: this.props.receiptPlacelist[0].addressName,
                                        rules: [{required: true, message: '必填!'}]
                                    })(
                                        <Select
                                            style={{fontSize:"11px"}}
                                            placeholder="请选择"
                                        >
                                            {this.props.receiptPlacelist.map(it => (
                                                <Option key={it.receiptId} value={it.receiptId}>
                                                    {it.addressName}
                                                </Option>
                                            ))}
                                        </Select>
                                    )}
                                </Form.Item>


                                <Form.Item label="上次修改时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('userUpdatedTime')(
                                        <label>{this.timeFormat(this.props.userDetail.userInfo.userUpdatedTime)}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="学生证背面："
                                                       hasFeedback
                                                       {...formItemLayout}>
                                {getFieldDecorator('stuCardBack')(
                                    <label>{this.props.userDetail.userInfo.stuCardBack}</label>
                                )}
                            </Form.Item>

                            </Col>
                        </Row>

                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(CheckDetail);        //创建form实例

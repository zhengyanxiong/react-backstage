import React from "react";
import {Form, Select, Modal} from "antd";

const FormItem = Form.Item
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 30},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 13},
    },
};
const AdminDetail = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props)
        }

        componentDidMount() {
            //console.log("dsfasogi", this.state)
        }

        render() {
            const {
                visible, onCancel, form
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="管理员详情"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                >
                    <Form layout="vertical">
                        <Form.Item label="管理员名字："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('adminName', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <label>{this.props.adminDetail.adminName}</label>
                            )}
                        </Form.Item>
                        <Form.Item label="管理员密码：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('adminPassword', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <label>{this.props.adminDetail.adminPassword}</label>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="管理员类型:"
                            hasFeedback
                            {...formItemLayout}
                        >
                            <Select value="1" disabled={true}>
                                <Option value="0">超级管理员</Option>
                                <Option value="1">普通管理员</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label="创建时间："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('createdTime')(
                                <label>{this.props.adminDetail.createdTime}</label>
                            )}
                        </Form.Item>
                        <Form.Item label="更新时间："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('updatedTime')(
                                <label>{this.props.adminDetail.updatedTime}</label>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(AdminDetail);        //创建form实例

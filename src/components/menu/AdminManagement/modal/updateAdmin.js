import React from "react";
import {Form, Select, Input, Modal} from "antd";

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
const UpdateAdmin = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);

        }

        componentDidMount() {
            this.props.formUpAdminRef(this);
        }

        getUpItemsValue = () => {    //自定义方法，用来传递数据（需要在父组件中调用获取数据）
            const values = this.props.form.getFieldsValue();
            return values;
        };

        render() {
            const {
                visible, onCancel, onOk, form
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="修改管理员信息"
                    okText="OK"
                    onCancel={onCancel}
                    onOk={onOk}
                    maskClosable={false}
                >
                    <Form layout="vertical">
                        <Form.Item label="管理员名称："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('adminName', {
                                initialValue: this.props.adminDetail.adminName,
                                rules: [{required: true, message: '必填!'}]
                            })(
                                <Input name="adminName" type="text"/>
                            )}
                        </Form.Item>
                        <Form.Item label=" 管理员密码：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('port', {
                                initialValue: this.props.adminDetail.adminPassword,
                                rules: [{required: true, message: '必填!'}]
                            })(
                                <Input type="text" name="adminPassword"/>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="管理员类型:"
                            hasFeedback
                            {...formItemLayout}
                        >{getFieldDecorator('type', {
                            initialValue: "" + 1,
                            rules: [{required: true, message: '必填!'}]
                        })(
                            <Select disabled>
                                <Option value="0">超级管理员</Option>
                                <Option value="1">普通管理员</Option>
                            </Select>
                        )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(UpdateAdmin);        //创建form实例

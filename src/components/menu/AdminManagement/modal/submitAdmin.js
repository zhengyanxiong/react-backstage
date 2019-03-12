import React from "react";
import {Form, Select, Modal,Input} from "antd";

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
const SubmitAdmin = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props)
        }
        componentDidMount() {
            this.props.formSubAdminRef(this)
        }

        getSubItemsValue = () => {    //自定义方法，用来传递数据（需要在父组件中调用获取数据）
            const values = this.props.form.getFieldsValue();//getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
            return values;
        }

        render() {
            const {
                visible, onCancel, onOk, form
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="添加管理员"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onOk}
                    maskClosable={false}
                >
                    <Form layout="vertical">
                        <Form.Item label="管理员名字："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('adminName', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>
                        <Form.Item label=" 管理员密码：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('adminPassword', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Input/>
                            )}

                        </Form.Item>
                        <Form.Item
                            label="管理员类型:"
                            hasFeedback
                            {...formItemLayout}
                        >{getFieldDecorator('adminType', {
                            initialValue:''+1,
                            rules: [{required: true, message: '必填!'}]
                        })(
                            <Select disabled={true}>
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
export default Form.create()(SubmitAdmin);        //创建form实例

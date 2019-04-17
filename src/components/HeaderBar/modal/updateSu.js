import React from "react";
import {Form, Select, Modal,Tabs ,Input} from "antd";
import {getAdmin} from "../../../util/Cookie"
const FormItem = Form.Item;
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
const UpdateSu = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props)
        }

        componentDidMount() {
            this.props.formUpSuRef(this);
        }
        getUpItemsValueSu = () => {    //自定义方法，用来传递数据（需要在父组件中调用获取数据）
            const values = this.props.form.getFieldsValue();
            console.log(values)
            return values;
        };

        timeFormat=(time) =>{
            var dateee = new Date(time).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')

        };
        render() {
            const {
                visible, onCancel,onOk, form
            } = this.props;
            const {getFieldDecorator} = form;
            const TabPane = Tabs.TabPane;
            return (
                <Modal
                    visible={visible}
                    title="修改信息"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onOk}
                    maskClosable={false}
                >
                    <Tabs defaultActiveKey="1" activeKey={this.props.key}>
                        <TabPane tab="确认密码" key="1">
                            <FormItem label="旧密码："
                                hasFeedback
                                {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '必填!'}]
                                })(
                                    <Input name="password" type="text"/>
                                )}
                            </FormItem>
                        </TabPane>
                        <TabPane tab="修改密码"  key="2">
                            <FormItem label="您的名称："
                                      hasFeedback
                                      {...formItemLayout}>
                                {getFieldDecorator('adminName', {
                                  initialValue:getAdmin().adminName,

                                })(
                                    <Input name="adminName" type="text"/>
                                )}
                            </FormItem>
                            <FormItem label="新密码："
                                      hasFeedback
                                      {...formItemLayout}>
                                {getFieldDecorator('passwordNew', {

                                })(
                                    <Input name="passwordNew" type="text"/>
                                )}
                            </FormItem>
                            <FormItem label="确认密码："
                                      hasFeedback
                                      {...formItemLayout}>
                                {getFieldDecorator('passwordN', {

                                })(
                                    <Input name="passwordN" type="text"/>
                                )}
                            </FormItem>
                        </TabPane>
                    </Tabs>
                </Modal>
            );
        }
    }
);
export default Form.create()(UpdateSu);        //创建form实例

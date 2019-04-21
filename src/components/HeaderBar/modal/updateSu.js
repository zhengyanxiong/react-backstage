import React from "react";
import {Form, Select, Modal,Tabs ,Input,Row,Col} from "antd";
import {getAdmin} from "../../../util/Cookie"
import Button from "antd/es/button/button";
const FormItem = Form.Item;
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 7},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 6},
        sm: {span: 15},
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
                    footer={this.props.footer}
                >
                    <Tabs defaultActiveKey='1'>
                        <TabPane tab="确认密码" key="1" disabled>
                            <Form>
                                <Row>
                                    <Col span={15}>
                                <FormItem label="旧密码："
                                hasFeedback
                                {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '必填!'}]
                                })(
                                    <Input name="password" type="text"/>
                                )}

                                </FormItem>
                                    </Col>
                                    <Col>
                                <Button type="primary" style={{marginTop: "4px"}} onClick={this.props.handleOkOne}>下一步</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </TabPane>
                        <TabPane tab="修改密码"  key="2" disabled>
                            <Form>
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
                            </Form>
                        </TabPane>
                    </Tabs>
                </Modal>
            );
        }
    }
);
export default Form.create()(UpdateSu);        //创建form实例

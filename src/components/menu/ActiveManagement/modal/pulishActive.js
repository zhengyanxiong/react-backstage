import React from "react";
import {Form, Select, Modal,Input,DatePicker} from "antd";
import moment from 'moment';
const FormItem = Form.Item;
const {Option} = Select;
const { MonthPicker, RangePicker } = DatePicker;
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
const PublishAdmin = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props)
        }
        componentDidMount() {
            this.props.formPubActiveRef(this)
        }

        getPubItemsValue = () => {    //自定义方法，用来传递数据（需要在父组件中调用获取数据）
            const values = this.props.form.getFieldsValue();//getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
            return values;
        };
        range=(start, end)=> {
            const result = [];
            for (let i = start; i < end; i++) {
                result.push(i);
            }
            return result;
        };
        disabledDate=(current)=> {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        };
        disabledDateTime=()=> {
            return {
                disabledHours: () => this.range(0, 24).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        };

        render() {
            const {
                visible, onCancel, onOk, form
            } = this.props;
            const {getFieldDecorator} = form;
            return (
                <Modal
                    visible={visible}
                    title="发布活动"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onOk}
                    maskClosable={false}
                >
                    <Form layout="vertical">
                        <Form.Item label="活动名称："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('activeName', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Input/>
                            )}
                        </Form.Item>

                        <Form.Item label=" 活动开始时间：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('activeStartTime', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <DatePicker
                                    placeholder="活动开始时间"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledDateTime}
                                    showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="活动截止时间:"
                            hasFeedback
                            {...formItemLayout}
                        >{getFieldDecorator('activeEndTime', {
                            rules: [{required: true, message: '必填!'}]
                        })(
                            <DatePicker
                                size="large "
                                placeholder="活动截止时间"
                                format="YYYY-MM-DD HH:mm:ss"
                                disabledDate={this.disabledDate}
                                disabledTime={this.disabledDateTime}
                                showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                            />
                        )}
                        </Form.Item>
                        <Form.Item label=" 活动描述：" hasFeedback {...formItemLayout}>
                        {getFieldDecorator('activeDescription', {
                            rules: [{required: true, message: '必填!'}],
                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(PublishAdmin);        //创建form实例

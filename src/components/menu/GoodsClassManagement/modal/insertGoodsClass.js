import React from "react";
import {Form, Select, Input, Modal,Button,Icon  } from "antd";

const FormItem = Form.Item
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5},
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
    },
};
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 5 },
    },
};const formItemLayoutWithOutLabel2 = {
    wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 14, offset: 5 },
    },
};
let id = 0;
const InsertGoodsClass = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);
        }
        componentDidMount() {
            this.props.formAdClassRef(this);
        }

        remove = (k) => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            // We need at least one passenger
            if (keys.length === 0) {
                return;
            }
//const nextKeys = keys.concat(id--);
            // can use data-binding to set
            form.setFieldsValue({
                keys: keys.filter(key => key !== k),
            });
        };

        add = () => {
            const { form } = this.props;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            const nextKeys = keys.concat(id++);
            form.setFieldsValue({
                keys: nextKeys,
            });
        };

        handleAdSubmit = () => {
            const values = this.props.form.getFieldsValue();
            const { keys, names } = values;
            var vals=keys.map(key => names[key]);
            var json={};
            json['vals']=vals;
            json['parv']=values.className;
           // console.log(json);
            return json;
        };
        render() {
            const {visible, onCancel, onOk, form} = this.props;
            const {getFieldDecorator,getFieldValue } = form;
            getFieldDecorator('keys', { initialValue: [] });
            const keys = getFieldValue('keys');
            const formItems = keys.map((k, index) => (
                <Form.Item
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel2)}
                    label={index === 0 ? '新增子类名' : ''}
                    required={false}
                    key={k}
                >
                    {getFieldDecorator(`names[${k}]`, {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [{
                            required: true,
                            whitespace: true,
                            message: "请输入子分类名称或者删除这个输入框！",
                        }],
                    })(
                        <Input placeholder="请输入需要新增的子类名" style={{ width: '80%', marginRight: 8 }} />
                    )}
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                </Form.Item>
            ));
            return (
                <Modal
                    visible={visible}
                    title="新增商品分类信息"
                    okText="OK"
                    onCancel={onCancel}
                    onOk={onOk}
                    maskClosable={false}
                >
                    <Form>
                        <Form.Item label="父类名称："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('className', {
                                rules: [{required: true, message: '必填!'}]
                            })(
                                <Input type="text"/>
                            )}
                        </Form.Item>
                        {formItems}
                        <Form.Item {...formItemLayoutWithOutLabel}>
                            <Button type="dashed" onClick={this.add} style={{ width: '56%' }}>
                                <Icon type="plus" /> 添加子分类
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(InsertGoodsClass);        //创建form实例

import React from "react";
import {Form, Select, Modal, Spin,Rate, Row, Col, Tag,Input,Statistic,Icon,List} from "antd";
import Button from "antd/es/button/button";
import Zmage from 'react-zmage'
const FormItem = Form.Item;
const desc = ['1.0', '2.0', '3.0', '4.0', '5.0'];
const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 12},
    },
};
const formItemLayout1 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 2},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 21},
    },
};const formItemLayout3 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 2},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 15},
    },
};const formItemLayout4 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 13},
    },
};
const addressList = [];

const GoodsDetail = Form.create()(
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
        //判读是否为空,通用
        isNull = (charts) => {
            if (charts == null || charts == "" || charts == "undefined" || charts === undefined) {
                return true
            } else
                return false
        };
        render() {
            const {
                visible, onCancel, form,loading
            } = this.props;
            const {getFieldDecorator} = form;
            var items=[];

            if (this.props.goodImge.length>0){
                {for(let i=0;i<this.props.goodImge.length;i++){
                    items.push(<Zmage  style={{marginRight: "15px",width: "120px",height:"120px",border:"1px solid #cec6c6",borderRadius:"4px"}} src={this.props.goodImge[i] }/>)
                }}
            }else {
                items.push(<Tag color="red">该商品没有图片</Tag>)
            }
            return (
                <Modal
                    visible={visible}
                    title={this.props.goodsDetail.goods.goodsName}
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                    width="79%"
                >
                    <Spin tip="加载中.." spinning={loading}>

                <div style={{height: "78px"}}>
                        <Button type="primary" style={{margin:"14px 10px 0px 26px"}} onClick={this.props.handleToSelledOrder}>查看已卖宝贝信息</Button>
                        <div style={{float:"right",width:"190px",margin: "-15px 0 0 0"}}>
                            <Statistic style={{float: "left",margin: "0 12px 0 0"}}title="总共件数" value={this.props.goodsDetail.allCount} prefix={<Icon type="like" />} />
                            <Statistic title="已卖出" value={this.props.goodsDetail.sellCount} suffix={"/ "+this.props.goodsDetail.allCount} />
                        </div>
                        <Tag color="geekblue"style={{margin:" 51px -116px 3px 0px",float: "right"}}>注：这是用户{this.props.goodsDetail.goods.username}（学号：{this.props.goodsDetail.goods.studentId}）发布的{this.props.goodsDetail.goods.goodClassName}。</Tag>
                    </div>
                    <Form>
                        <Row>
                            <Col span={8} style={{textAlign: 'left'}}>
                                <Form.Item label="宝贝标号：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('goodsNum', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tag color="blue">{this.props.goodsDetail.goods.goodsNum}</Tag>
                                    )}
                                </Form.Item>
                                <Form.Item label="宝贝主人：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('username', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.goodsDetail.goods.username}</label>
                                    )}
                                </Form.Item>

                                <Form.Item label="宝贝单价：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('goodsPrice', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tag color="#108ee9">{"￥"+this.props.goodsDetail.goods.goodsPrice+"RMB"}</Tag>
                                    )}
                                </Form.Item>
                                <Form.Item label="宝贝库存："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('goodsStock')(
                                        <label>{this.props.goodsDetail.goods.goodsStock}件</label>
                                    )}
                                </Form.Item>


                            </Col>
                            <Col span={8} style={{textAlign: 'left'}}>
                                <Form.Item label="宝贝名称："
                                           hasFeedback
                                           {...formItemLayout}>
                                    <label >{this.props.goodsDetail.goods.goodsName}</label>
                                </Form.Item>

                                <Form.Item label="主人学号：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('studentId', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.goodsDetail.goods.studentId}</label>
                                    )}
                                </Form.Item>

                                <Form.Item label="活动价格：" hasFeedback  {...formItemLayout}>
                                    {getFieldDecorator('goodsActivePrice', {
                                        rules: [{required: true, message: '必填!'}]
                                    })(
                                        <Tag color="#f50">{this.props.goodsDetail.goods.goodsActivePrice==null?"该商品未参加活动":"￥"+this.props.goodsDetail.goods.goodsActivePrice+"RMB"}</Tag>
                                    )}
                                </Form.Item>

                                <Form.Item label="发布时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('goodsPublishTime')(
                                        <label>{this.timeFormat(this.props.goodsDetail.goods.goodsPublishTime)}</label>
                                    )}
                                </Form.Item>

                            </Col>
                            <Col span={8} style={{textAlign: 'left'}}>
                                <Form.Item label="宝贝类别：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('realName', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.goodsDetail.goods.className+"-->"+this.props.goodsDetail.goods.goodClassName}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="是否可议价：" hasFeedback {...formItemLayout4}>
                                    {getFieldDecorator('isNegotiable', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.goodsDetail.goods.isNegotiable?"是":"否"}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="宝贝状态：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('goodsState', {
                                        initialValue:this.props.goodsDetail.goods.goodsState+'',
                                        rules: [{required: true, message: '必填!'}],
                                    })(

                                        <Select disabled={true}>
                                            <Option value="1">已上架</Option>
                                            <Option value="2">已卖出</Option>
                                            <Option value="3">已下架</Option>
                                            <Option value="4">活动中</Option>
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label="上次修改时间："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('goodsUpdatedTime')(
                                        <label>{this.timeFormat(this.props.goodsDetail.goods.goodsUpdatedTime)}</label>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Form.Item
                            label="宝贝描述:"
                            {...formItemLayout1}
                        >
                            {getFieldDecorator('goodsState', {
                                initialValue:this.props.goodsDetail.goods.goodsDescription,
                                rules: [{required: true, message: '必填!'}]
                            })(
                                <Input.TextArea disabled rows={3} />
                            )}
                        </Form.Item>
                        <Form.Item label="宝贝图片："
                                   hasFeedback
                                   {...formItemLayout3}>
                                {items}
                        </Form.Item>


                    </Form>
                    </Spin>
                </Modal>
            );
        }
    }
);
export default Form.create()(GoodsDetail);        //创建form实例

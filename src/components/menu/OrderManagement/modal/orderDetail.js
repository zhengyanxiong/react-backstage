import React from "react";
import {Form, Select, Modal, Rate, Row, Col, Tag,Spin,Input,Statistic,Icon,List,Skeleton,Avatar,Divider} from "antd";
import Button from "antd/es/button/button";
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
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
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 15},
    },
};const formItemLayout3 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 15},
    },
};const formItemLayout4 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 3},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 20},
    },
};const formItemLayout5 = {
    labelCol: {
        xs: {span: 10},
        sm: {span: 3},
    },
    wrapperCol: {
        xs: {span: 10},
        sm: {span: 20},
    },
};
const addressList = [];

const OrderDetail = Form.create()(
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
                visible, onCancel, form,loading
            } = this.props;
            const {getFieldDecorator} = form;

            return (
                <Modal
                    visible={visible}
                    title={"订单号为"+this.props.orderDetail.orders.orderNum+"的详情"}
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                    width="79%"
                >
                    <Spin tip="加载中.." spinning={loading}>

                    <Form>
                        <Row>
                            <Col span={8} style={{textAlign: 'left'}}>
                                <Form.Item label="订单号：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('orderNum', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Tag color="blue">{this.props.orderDetail.orders.orderNum}</Tag>
                                    )}
                                </Form.Item>
                                <Form.Item label="店家：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('sellname', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label >{this.props.orderDetail.orders.sellname==null?this.props.orderDetail.orders.studentId:this.props.orderDetail.orders.sellname}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="收货地址：" hasFeedback {...formItemLayout1}>
                                    {getFieldDecorator('addressName', {
                                        rules: [{required: true, message: '必填!'}]
                                    })(
                                        <label style={{fontSize:"13px"}}>{this.props.orderDetail.orders.addressName}</label>
                                    )}
                                </Form.Item>



                            </Col>
                            <Col span={8} style={{textAlign: 'left'}}>
                                <Form.Item label="订单状态：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('orderState', {
                                        initialValue:this.props.orderDetail.orders.orderState+'',
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <Select disabled={true}>
                                            <Option value="0">待付款</Option>
                                            <Option value="1">待收货</Option>
                                            <Option value="2">待评价</Option>
                                            <Option value="3">已完成</Option>
                                            <Option value="4">已取消</Option>
                                        </Select>
                                    )}
                                </Form.Item>

                                <Form.Item label="买家："
                                           hasFeedback
                                           {...formItemLayout}>
                                    {getFieldDecorator('orderActivePrice', {
                                        rules: [{required: true, message: '必填!'}]
                                    })(
                                        <label >{this.props.orderDetail.orders.username==null?this.props.orderDetail.orders.studentId:this.props.orderDetail.orders.username}</label>
                                    )}
                                </Form.Item>

                                <Form.Item label="订单金额：" hasFeedback  {...formItemLayout}>
                                    {getFieldDecorator('orderActivePrice', {
                                        rules: [{required: true, message: '必填!'}]
                                    })(
                                        <Tag color="#f50">{"￥"+this.props.orderDetail.orders.orderAmount+"RMB"}</Tag>
                                    )}
                                </Form.Item>

                            </Col>

                            <Col span={8} style={{textAlign: 'left'}}>
                                <Form.Item label="下单时间：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('orderTime', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.timeFormat(this.props.orderDetail.orders.orderTime)}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="商品数量：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('orderGoodsCount', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.orderDetail.orders.orderGoodsCount+"件"}</label>
                                    )}
                                </Form.Item>
                                <Form.Item label="确认收货时间：" hasFeedback {...formItemLayout}>
                                    {getFieldDecorator('confirmReceiptTime', {
                                        rules: [{required: true, message: '必填!'}],
                                    })(
                                        <label>{this.props.orderDetail.orders.confirmReceiptTime==null?"商品还没有确认收货~":this.timeFormat(this.props.orderDetail.orders.confirmReceiptTime)}</label>
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Divider orientation="left">订单商品</Divider>

                        <Form.Item label="商品详情：" hasFeedback {...formItemLayout4}>
                            <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.props.orderDetail.goodsList}
                                renderItem={item => (
                                    <List.Item
                                        key={item.goodsName}
                                        actions={ [
                                            <Tag style={{marginRight:"-7px"}}color="purple">{"类别："+item.goodClassName}</Tag>,
                                            <Tag style={{marginRight:"-7px"}}color="volcano">{"单价：￥"+item.goodsPrice} </Tag>,
                                            <Tag style={{marginRight:"-7px"}}color="cyan">{"库存："+item.goodsStock+"件"} </Tag>,
                                            <Tag style={{marginRight:"-7px"}}color="purple">{"发布时间："+this.timeFormat(item.goodsPublishTime)}</Tag>,
                                        ]}
                                        extra={<img width={160} height={145} style={{borderRadius: "5px",margin:"30px 8px 0 0px"}} alt="logo" src={item.goodImages} />}
                                    >
                                        <Skeleton loading={false} active >
                                            <List.Item.Meta
                                                title={<Tag color="#2db7f5">{item.goodsName}</Tag>}
                                                description={"该条订单买家"+this.props.orderDetail.orders.username+"在"+this.props.orderDetail.orders.sellname+"的店里，买了"+item.goodsCounts+"件"+item.goodsName}
                                            />
                                            商品描述：{item.goodsDescription}
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />
                        </Form.Item>
                        <Divider orientation="left">订单评价</Divider>
                        <Form.Item label="评价详情" hasFeedback {...formItemLayout5}>

                            {this.props.orderDetail.orders.comment==null?(
                                <div style={{height:"135px"}}><label>该订单还没有评价哦</label></div>):(
                                <List
                                    itemLayout="vertical"
                                    size="large"
                                    dataSource={this.props.commentList}
                                    renderItem={item => (
                                        <List.Item
                                            key={this.props.orderDetail.orders.username}
                                            actions={ [<Tag color="cyan"><IconText type="like-o" text={"服务质量："+item.serviceNum+".0"} /></Tag>, <Tag color="volcano"><IconText type="like-o" text={"描述相符："+item.descriptionNum+".0"} /></Tag>, <Tag color="purple"><IconText type="like-o" text={"损坏程度："+item.damageNum+".0"} /></Tag>]}
                                        >
                                            <Skeleton loading={false} active avatar>
                                                <List.Item.Meta
                                                    avatar={<Avatar src={this.props.orderDetail.orders.headImag}/>}
                                                    title={<Tag color="#2db7f5">{this.props.orderDetail.orders.username}</Tag>}
                                                    description={"评论时间："+this.timeFormat(item.commentCreatedTime)+" | 订单号："+this.props.orderDetail.orders.orderNum}
                                                />
                                                {item.comment}
                                            </Skeleton>
                                        </List.Item>
                                    )}
                                />)}
                        </Form.Item>

                    </Form>
                    </Spin>
                </Modal>
            );
        }
    }
);
export default Form.create()(OrderDetail);        //创建form实例

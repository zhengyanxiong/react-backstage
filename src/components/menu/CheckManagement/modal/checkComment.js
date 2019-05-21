import React from "react";
import {Form, Select, Modal, Skeleton, Switch, List, Avatar, Icon,Tabs,Tag} from "antd";
import Button from "antd/es/button/button";

const FormItem = Form.Item;
const desc = ['1.0', '2.0', '3.0', '4.0', '5.0'];
const {Option} = Select;
const TabPane = Tabs.TabPane;
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
const IconText = ({ type, text }) => (
    <span>
    <Icon type={type} style={{ marginRight: 8 }} />
        {text}
  </span>
);
const CheckComment = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);
            this. state = {
                loading: false,
            }
        }

        componentDidMount() {
            //console.log("dsfasogi", this.state)
        }
        handleMouseOverMine(orderNum,event){
            //alert("commentedPerId",commentedPerId)
            localStorage.setItem("orderNum",orderNum)
        };
        handleMouseOverOne(orderNum,event){
            //alert("commentPerId",commentPerId)
            localStorage.setItem("orderNum",orderNum)
        };
        timeFormat = (time) => {
            var dateee = new Date(time).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        };
        render() {
            const {
                visible, onCancel, form
            } = this.props;
            const {getFieldDecorator}= form;
            return (
                <Modal
                    visible={visible}
                    title="用户评价详情"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                    width="85%"
                >
                    <Tabs defaultActiveKey="2">
                        <TabPane tab={<span><Icon type="export" />用户发布评价</span>} key="2">
                            {this.props.userDetail.commentList=='null'?(<div style={{height:"135px",marginLeft:"15px"}}><label>该用户还没有发布过评论哦</label></div>):(<List
                                itemLayout="vertical"
                                size="large"
                                dataSource={this.props.userDetail.commentList}
                                renderItem={item => (
                                    <List.Item
                                        key={item.username}
                                        actions={!this.state.loading && [<Tag color="cyan"><IconText type="like-o" text={"服务质量："+item.serviceNum+".0"} /></Tag>, <Tag color="volcano"><IconText type="like-o" text={"描述相符："+item.descriptionNum+".0"} /></Tag>, <Tag color="purple"><IconText type="like-o" text={"损坏程度："+item.damageNum+".0"} /></Tag>]}
                                        extra={!this.state.loading && <Button type="primary" ghost  onMouseOver={this.handleMouseOverMine.bind(this, item.orderNum)} onClick={this.props.toOrderOne} >查看该条订单</Button>}
                                    >
                                        <Skeleton loading={this.state.loading} active avatar>
                                            <List.Item.Meta
                                                avatar={<Avatar src={item.avatar} />}
                                                title={<Tag color="#2db7f5">{item.username}</Tag>}
                                                description={item.username+"在"+item.creatTime+"这个时间，针对已买订单订单号为"+item.orderNum+"的评论描述如下："}
                                            />
                                            {item.comment}
                                        </Skeleton>
                                    </List.Item>
                                )}
                            />)}

                        </TabPane>
                    </Tabs>

                </Modal>
            );
        }
    }
);
export default Form.create()(CheckComment);
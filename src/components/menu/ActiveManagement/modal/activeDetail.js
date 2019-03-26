import React from "react";
import {Form, Select, Modal, Upload} from "antd";
import Zmage from 'react-zmage'
import '../../../../App.css'
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
const ActiveDetail = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                previewVisible: false,
                previewImage: '',
                fileList: [],
            };
        }

        componentDidMount() {

            //console.log("url",this.props.activePictrueUrl)
        }

        timeFormat = (time) => {
            var dateee = new Date(time).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        };

        handleCancel = () => this.setState({ previewVisible: false })

        handlePreview = (file) => {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
            });
        };

        handleChange = ({ fileList }) => {
            this.setState({
                fileList: [{
                    uid: '-1',
                    name: this.props.activeDetail.activeName,
                    status: 'done',
                    url: this.props.activePictrueUrl
                }],
            })
            console.log("url:",this.state.file.url)

        };
        render() {
            const {
                visible, onCancel, form
            } = this.props;
            const {getFieldDecorator} = form;
            const { previewVisible, previewImage, fileList } = this.state;

            return (
                <Modal
                    visible={visible}
                    title="活动详情"
                    okText="确定"
                    onCancel={onCancel}
                    onOk={onCancel}
                    maskClosable={false}
                >
                    <Form layout="vertical">
                        <Form.Item label="活动名称："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('activeName', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <label>{this.props.activeDetail.activeName}</label>
                            )}
                        </Form.Item>
                        <Form.Item label="活动开始时间：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('activeStartTime', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <label>{this.timeFormat(this.props.activeDetail.activeStartTime)}</label>
                            )}
                        </Form.Item>
                        <Form.Item
                            label="活动截止时间:"
                            hasFeedback
                            {...formItemLayout}
                        >
                            {getFieldDecorator('activeEndTime', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <label>{this.timeFormat(this.props.activeDetail.activeEndTime)}</label>
                            )}
                        </Form.Item>
                        <Form.Item label="活动图片："
                                   hasFeedback
                                   {...formItemLayout}>
                            {getFieldDecorator('activePictrueUrl', {
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Zmage src={this.props.activePictrueUrl} style={{width:"150px"}}/>
                            )}
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(ActiveDetail);        //创建form实例

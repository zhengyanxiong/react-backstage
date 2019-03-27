import React from "react";
import {Form, Select, Modal, Upload,Input,DatePicker,Icon} from "antd";
import Zmage from 'react-zmage'
import moment from 'moment';
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
const dateFormat = 'YYYY-MM-DD HH:mm:ss';
const UpdateActive = Form.create()(
    // form modal
    class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                ...props,
                url: "",
                previewVisible: false,
                previewImage: '',
                fileList:[{
                    uid: '-1',
                    name: this.props.activeDetail.activeName,
                    status: 'done',
                    url: this.props.activePictrueUrl
                }]
            };
        }
        componentDidMount() {
            this.props.formUpActiveRef(this);
            //console.log("url",this.props.activePictrueUrl)
        }
        getUpItemsValue = () => {    //自定义方法，用来传递数据（需要在父组件中调用获取数据）
            const values = this.props.form.getFieldsValue();
            return values;
        };
        timeFormat = (time) => {
            var dateee = new Date(time).toJSON();
            return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
        };

        disabledDate = (current) => {
            // Can not select days before today and today
            return current && current < moment().endOf('day');
        };
        disabledDateTime = () => {
            return {
                disabledHours: () => this.range(0, 24).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        };
        handleCancel = () => this.setState({previewVisible: false});
        handlePreview = (file) => {
            this.setState({
                previewImage: file.url || file.thumbUrl,
                previewVisible: true,
            });
            console.log("previewImage",file)

        };

        handleChangeProp = () => {
            this.setState({
                fileList:this.props.fileList
            });
          /*  console.log("fileList:", this.state.url);
            console.log("fileList[0]:", this.props.fileList[0].url);*/
        };
        getUpPicUrl=()=>{
            const picUrl=this.state.url;
            return picUrl;
        };
        handleChangeA = ({ fileList }) => {
            this.setState({fileList});
        this.setState({
            url: fileList[0].response.data.url
        })

        };

        handleChange = (fileList) => {
            if (this.props.updateActiveVisible){
                this.setState({
                    fileList:this.props.fileList,
                });
                    console.log("fileList[0].response.data.url:", this.state.url);
            }
            /*this.setState({
                url: fileListurl
            });*/
            this.setState({
                fileList:fileList,
            });

        };
        render() {

            //console.log('this.state.fileList',this.state.fileList)

            const {
                visible, onCancel, form,onOk
            } = this.props;
            const {getFieldDecorator} = form;
            const { previewVisible, previewImage, fileList } = this.state;
            const uploadButton = (
                <div>
                    <Icon type="plus"/>
                    <div className="ant-upload-text">点击上传</div>
                </div>
            );
           const upload=( <Upload
                action="/nginxservice/file/fileUpload"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>);
            const uploadProp=( <Upload
                action="/nginxservice/file/fileUpload"
                listType="picture-card"
                fileList={this.props.fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
            >
                {this.props.fileList.length >= 1 ? null : uploadButton}
            </Upload>);

           // console.log('this.props.fileList',this.props.fileList);
            return (
                <Modal
                    visible={visible}
                    title="修改活动信息"
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
                                initialValue: this.props.activeDetail.activeName,
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Input type="text"/>
                            )}
                        </Form.Item>
                        <Form.Item label="活动开始时间：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('activeStartTime', {
                                initialValue: moment(this.props.activeDetail.activeStartTime, dateFormat),
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <DatePicker
                                    placeholder="活动开始时间"
                                    format={dateFormat}
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledDateTime}
                                   // showTime={{defaultValue: moment('00:00:00', 'HH:mm:ss')}}
                                    //defaultValue={moment(this.props.activeDetail.activeStartTime, dateFormat)}
                                />
                            )}
                        </Form.Item>
                        <Form.Item
                            label="活动截止时间:"
                            hasFeedback
                            {...formItemLayout}
                        >
                            {getFieldDecorator('activeEndTime', {
                                initialValue: moment(this.props.activeDetail.activeEndTime, dateFormat),
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <DatePicker
                                    placeholder="活动开始时间"
                                    format={dateFormat}
                                    disabledDate={this.disabledDate}
                                    disabledTime={this.disabledDateTime}
                                    />
                            )}
                        </Form.Item>
                        <Form.Item label=" 活动描述：" hasFeedback {...formItemLayout}>
                            {getFieldDecorator('activeDescription', {
                                initialValue: this.props.activeDetail.activeDescription,
                                rules: [{required: true, message: '必填!'}],
                            })(
                                <Input type="text"/>
                            )}
                        </Form.Item>
                        <Form.Item label="活动图片："
                                   hasFeedback
                                   {...formItemLayout}>
                            <div className="clearfix">
                                {getFieldDecorator('fileList',{
                                    defaultFileList:this.props.fileList,
                                    //initialValue:this.props.fileList,
                                    rules: [{required: true, message: '必填!'}],
                                })(
                                    <Upload
                                    action="/nginxservice/file/fileUpload"
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChangeA}
                                >
                                    {fileList.length >= 1 ? null : uploadButton}
                                </Upload>

                                   /* <div>
                                        {fileList.length >= 1 ? upload : uploadProp}
                                    </div>*/

                                )}
                                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                                    <img alt="example" style={{width: '97%'}} src={previewImage}/>
                                </Modal>
                            </div>
                        </Form.Item>
                    </Form>
                </Modal>
            );
        }
    }
);
export default Form.create()(UpdateActive);        //创建form实例

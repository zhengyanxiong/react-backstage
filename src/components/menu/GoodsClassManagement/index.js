import React, {Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {_getAllGoodsClassInfo} from "../../../api/goods";
import {_getGoodsClassByClassId} from "../../../api/goods";
import {_updateClassChildsByClassId} from "../../../api/goods";
import {_updateClassByClassId} from "../../../api/goods";
import {_insertGoodsClass} from "../../../api/goods";
import {_insertClassChildsByClassId} from "../../../api/goods";
import SetUpClass from "../../../components/menu/GoodsClassManagement/modal/setUpClass";
import InsertGoodsClass from "../../../components/menu/GoodsClassManagement/modal/insertGoodsClass";

import {Collapse, Icon, Tag, List, Form, Spin,Modal} from 'antd';
import Button from "antd/es/button/button";

const Panel = Collapse.Panel;

function callback(key) {
    console.log(key);
}

const text = ``;

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tData: [],
            count: 0,
            record: 0,
            rowkey: 0,
            selectedRowKeys: [],
            loading: false,
            detailLoading:false,
            classList: {
                goodsClassList: [{
                    classId: 0,
                    className: ""
                }],
                goodsClassChildList: [{
                    goodClassNum: 0,
                    classId: 0,
                    goodClassName: "",
                }]
            },
            index: '',
            visible: false,
            setUpClassVisible: false,
            insertGoodsClassVisible: false,
            classLoading: true,
            goodsClassDetail: {
                goodsClassChildList: [{
                    goodClassNum: 0,
                    classId: 0,
                    goodClassName: ""
                }],
                goodsClass: {
                    classId: 0,
                    className: ""
                }
            }
        }
    }

    componentDidMount() {
        this.getAllGoodsClassInfo()
    }

    async updateClassChildsByClassId(data) {
        await _updateClassChildsByClassId(data);
        this.getAllGoodsClassInfo();
    }
   async updateClassByClassId(data) {
       await _updateClassByClassId(data);
       this.setState({
           setUpClassVisible: false
       });
       Modal.success({
           title: '成功！',
           content: '修改商品类别信息成功:'+this.state.goodsClassDetail.goodsClass.className,
       });
       this.getAllGoodsClassInfo();
    }
   async insertClassChildsByClassId(data) {
        await _insertClassChildsByClassId(data);
       this.getAllGoodsClassInfo();
    }
   async getAllGoodsClassInfo(data) {
        const res = await _getAllGoodsClassInfo(data);
        this.setState({
            classList: res,
            classLoading: false
        });
    }
  async insertGoodsClass(data) {
        await _insertGoodsClass(data);
        this.setState({
            insertGoodsClassVisible:false
        });
      Modal.success({
          title: '成功！',
          content: '新增商品类别信息成功~',
      });
        this.getAllGoodsClassInfo();

    }

    async getGoodsClassByClassId(data) {
        const res = await _getGoodsClassByClassId(data);
        this.setState({
            detailLoading:false,
            goodsClassDetail: res
        });
        //console.log("goodsdetail", this.state.goodsClassDetail)
    }

    handleCancel = () => {
        this.setState({
            setUpClassVisible: false,
            insertGoodsClassVisible: false
        });
        this.childUpClass.props.form.resetFields();
        this.childAdClass.props.form.resetFields();
    };
    cilckToInsert = () => {
        this.setState({
            insertGoodsClassVisible: true,
        });
    };
    //获取子菜单元素数据等
    formUpClassRef = (ref) => {
        this.childUpClass = ref
    };
    formAdClassRef = (ref) => {
        this.childAdClass = ref
    };
    handleOk = (e) => {
        const form = this.formUpClassRef.props.form;
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
               var info=this.childUpClass.handleSubmit();
               console.log("info",info);
               console.log("info",info.names);
                //console.log("info",this.childUpClass.getClassChildInputValue(e));
                var insertArr=[];
                for(var i=0;i<info.vals.length;i++){
                    var classId=this.state.goodsClassDetail.goodsClass.classId;
                    var insertJson={};
                    insertJson['classId']=classId;
                    insertJson['goodClassName']=info.vals[i];
                    insertArr.push(insertJson);
                }
                var goodsClassList={insertArr:insertArr};//新增批量
                var updateChildInfo=this.childUpClass.getClassChildInputValue(e);//修改子类名
                var className=info.parv;//修改父类名
                //console.log("goodsClassList",goodsClassList);
                this.insertClassChildsByClassId(goodsClassList);
               this.updateClassChildsByClassId(updateChildInfo);
                var data={
                    classId:this.state.goodsClassDetail.goodsClass.classId,
                    className:className
                };
                this.updateClassByClassId(data);
                this.getAllGoodsClassInfo();
            }
            form.resetFields();
        });
        // this.childUpClass.props.form.resetFields();
    };

    handleAdOk=()=>{
        const form = this.formAdClassRef.props.form;
        form.validateFields({force: true}, (err, values) => {
            if (err) {
                return;
            } else {
                var infoAd=this.childAdClass.handleAdSubmit();
               // console.log("info",info);
              //  console.log("info",info.names);
                //console.log("info",this.childUpClass.getClassChildInputValue(e));
                var insertArr=[];
                for(var i=0;i<infoAd.vals.length;i++){
                    var insertJson={};
                    insertJson['goodClassName']=infoAd.vals[i];
                    insertArr.push(insertJson);
                }

               var  data={
                    className:infoAd.parv,
                    goodsClassChildArr:insertArr
               };
               this.insertGoodsClass(data);
                //console.log("goodsClassList",goodsClassList);

            }
            form.resetFields();
        });
    };
    getGoodsClassById = (classId) => {
        this.setState({
            detailLoading:true,
            setUpClassVisible: true
        });
        var data = {
            params: {
                classId: classId
            }
        };
        console.log("classid", classId);
        this.getGoodsClassByClassId(data);
    };

    render() {
        const _this = this;
        const customPanelStyle = {
            background: '#f7f7f7',
            borderRadius: 6,
            marginBottom: 5,
            border: 0,
            overflow: 'hidden',
        };
        const colorList = ['green', "magenta", "blue", "red", "purple", "volcano", "gold", "lime", "cyan", "geekblue", "orange", 'green', "magenta", "red", "volcano", "gold", "lime"];
        const genExtra = (classId, event) => (
            <Icon
                type="setting"
                onClick={(event) => {
                    _this.getGoodsClassById(classId);
                    event.stopPropagation();
                }}
            />
        );
        return (
            <div>
                <CustomBreadcrumb arr={["闲置分类"]}/>
                <Spin spinning={_this.state.classLoading}>
                    <div style={{background: "white"}}>
                        <Button style={{margin: "10px 0 10px 16px"}} type="primary" icon="plus" onClick={_this.cilckToInsert}> 新增分类</Button>

                        <Collapse defaultActiveKey={['1']} onChange={callback} bordered={false}
                                  expandIcon={({isActive}) => <Icon type="caret-right" rotate={isActive ? 90 : 0}/>}>
                            {_this.state.classList.goodsClassList.map(item =>
                                <Panel header={item.className} key={item.classId} style={customPanelStyle}
                                       extra={genExtra(item.classId)}>
                                    {_this.state.classList.goodsClassChildList.map(item1 => item1.classId == item.classId ?
                                        <Tag key={item1.goodClassNum}
                                             color={colorList[item.classId - 1]}>{item1.goodClassName}</Tag> : "")}
                                </Panel>
                            )}
                        </Collapse>

                        <SetUpClass visible={_this.state.setUpClassVisible}
                                    loading={_this.state.detailLoading}
                                    onCancel={_this.handleCancel}
                                    onOk={_this.handleOk}
                                    goodsClassDetail={_this.state.goodsClassDetail}
                                    wrappedComponentRef={(form) => this.formUpClassRef = form}
                                    formUpClassRef={_this.formUpClassRef}
                        />
                        <InsertGoodsClass visible={_this.state.insertGoodsClassVisible}
                                    onCancel={_this.handleCancel}
                                    onOk={_this.handleAdOk}
                                    wrappedComponentRef={(form) => this.formAdClassRef = form}
                                    formAdClassRef={_this.formAdClassRef}
                        />
                    </div>
                </Spin>
            </div>

        )
    }
}

Index = Form.create()(Index);
export default Index;
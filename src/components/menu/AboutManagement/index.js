import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {Alert,Card, Col, Row,Tag} from 'antd';



class DataAnalysisComponent extends Component{
    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["关于校园拍拍"]}/>
                <Alert height="500px"
                    message="关于校园拍拍"
                    description="校园拍拍于2018年3月开始开发实施，这是一个可以帮学生赚钱的APP。
                    在这里，你以前的小东西可以转掉，换成你喜爱的文学；数码控出掉的旧爱机变成了你手里的新宝贝。这里聚集了一大票你的同学，你的师长学妹，他们是你的朋友，也是合作的可爱店主。和你一样，热爱转让闲置的乐趣。
                    我们努力让高校的你们爱上买卖闲置，努力让这世界更美好。"
                    type="info"
                    showIcon
                >
                </Alert>
                <h1 style={{marginTop:"30px"}} fontSize>开发团队</h1>
                <Row gutter={16}>
                    <Col span={6}>
                        <Card title="计科一班 郑彦雄" bordered={false}></Card>
                    </Col>
                    <Col span={6}>
                        <Card title="计科一班 余海强" bordered={false}></Card>
                    </Col>
                    <Col span={6}>
                        <Card title="计科三班 郑春燕" bordered={false}></Card>
                    </Col>
                    <Col span={6}>
                        <Card title="计科三班 刘婷婷" bordered={false}></Card>
                    </Col>
                </Row>
            </div>

        )
    }
}
export default DataAnalysisComponent;
import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {Alert,Card, Col, Row,Tag} from 'antd';
const { Meta } = Card;
class DataAnalysisComponent extends Component{
    componentDidMount(){
        window.open('about:blank').location.href="http://localhost:3010/dataAnalyze/businessAnalyze.html"
    }

    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["关于校园拍拍"]}/>
                <Alert height="500px"
                       message="关于校园拍拍"
                       description="校园拍拍于2019年2月开始开发实施，这是一个可以帮学生赚钱的APP。
                    在这里，你以前的小东西可以转掉，换成你喜爱的文学；数码控出掉的旧爱机变成了你手里的新宝贝。这里聚集了一大票你的同学，你的师长学妹，他们是你的朋友，也是合作的可爱店主。和你一样，热爱转让闲置的乐趣。
                    我们努力让高校的你们爱上买卖闲置，努力让这世界更美好。"
                       type="info"
                       showIcon
                >
                </Alert>
                <h1 style={{marginTop:"30px"}}>开发团队</h1>
                <Row gutter={16} style={{ marginBottom:"10px" }}>
                    <Col span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="http://47.107.228.169:8099/0/10/5577a0ceb3c14fc181b8db0c8226bb65.jpg" />}
                        >
                            <Meta title="计科三班 郑春燕" description="校园拍拍组长，负责微服务架构搭建以及后台系统等模块" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="http://47.107.228.169:8099/0/15/405bf99d0f024fc1bcef714456de2b4d.jpg" />}
                        >
                            <Meta title="计科一班 郑彦雄" description="负责安卓系统的搭建以及聊天支付模块的开发" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="http://47.107.228.169:8099/5/12/9c5ff816bf5a43858656aa2ea7e7d402.png" />}
                        >
                            <Meta title="计科一班 余海强" description="小组开发人员主要负责商品订单模块的开发" />
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            cover={<img alt="example" src="http://47.107.228.169:8099/12/8/3e2a65e580c04182ad6430a6df9cd4c9.png" />}
                        >
                            <Meta title="计科三班 刘婷婷" description="小组开发人员主要负责用户消息模块的开发" />
                        </Card>
                    </Col>
                </Row>
            </div>

        )
    }
}
export default DataAnalysisComponent;
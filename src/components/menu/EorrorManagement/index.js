import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {Alert,Card, Col, Row,Tag} from 'antd';

const { Meta } = Card;

class EorrorComponent extends Component{

    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["出错啦"]}/>
                <img style={{ width: "100%"}} src="http://47.107.228.169:8099/8/15/8686b46e6f094901acdfa410314e6406.jpg"/>
            </div>

        )
    }
}
export default EorrorComponent;
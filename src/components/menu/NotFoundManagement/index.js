import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";
import {Alert,Card, Col, Row,Tag} from 'antd';

const { Meta } = Card;

class NotFoundComponent extends Component{

    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["NotFound"]}/>
                <img style={{ width: "100%"}} src="http://47.107.228.169:8099/11/8/4476cb83444c4902966b1c4b2abcd0ae.jpg"/>
            </div>

        )
    }
}
export default NotFoundComponent;
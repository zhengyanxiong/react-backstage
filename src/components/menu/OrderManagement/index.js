import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";



class DataAnalysisComponent extends Component{
    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["订单管理"]}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>订单管理组件</div>
                </div>
            </div>
        )
    }
}
export default DataAnalysisComponent;
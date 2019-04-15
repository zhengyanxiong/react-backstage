import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";



class DataAnalysisComponent extends Component{
    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["活动报名"]}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>活动报名组件</div>
                </div>
            </div>

        )
    }
}
export default DataAnalysisComponent;
import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";



class DataAnalysisComponent extends Component{
    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["数据分析"]}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>数据分析组件</div>
                </div>
            </div>

        )
    }
}
export default DataAnalysisComponent;
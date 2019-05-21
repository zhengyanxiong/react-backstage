import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";

class DataAnalysisComponent extends Component{
    componentDidMount(){
        window.open('about:blank').location.href="http://localhost:3010/dataAnalyze/businessAnalyze.html"
    }
    render() {
        return(
            <div>
                <CustomBreadcrumb arr={["关于校园拍拍"]}/>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>关于校园拍拍....</div>
                </div>
            </div>

        )
    }
}
export default DataAnalysisComponent;
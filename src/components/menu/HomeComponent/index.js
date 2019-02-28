import React,{Component} from "react"
import CustomBreadcrumb from "../../CustomBreadcrumb";



class HomeComponent extends Component{
    render() {
        return(
            <div>
                <CustomBreadcrumb />
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                    <div>首页内容组件</div>
                </div>

            </div>

        )
    }
}
export default HomeComponent;
import React, {Component} from "react"
import {RenderRoutes} from '../../router/utils'


class MainContent extends Component {
    render() {
        let {routes} = this.props;
        return (
            <div style={{
                margin: '0 16px', minHeight: 496,
            }}>
                <RenderRoutes routes={routes}></RenderRoutes>
                {this.props.children}
            </div>

        )
    }
}

export default MainContent;
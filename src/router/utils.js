import React from 'react';
import {Route, Redirect} from "react-router-dom";

// 循环渲染当前路由数组中一维数组中的组件
//这里只渲染这个数组的一唯数组， routes下面的routes数组是不会继续渲染的
export const RenderRoutes = ({routes}) => {
    return (routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />))
};

// 渲染当前组件
export const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        exact={route.exact}
        render={props => {
            //console.log('Redirect.....',route.routes)
            return (
                route && (route.Redirect ? (<Redirect to={route.Redirect}></Redirect>) :
                    ( <route.component {...props} routes={route.routes}/>
                    ))
            )
        }}
    />
);




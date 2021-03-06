import axios from 'axios';
import {isLogout} from "../util/Cookie"
import {message} from 'antd';

import {PromptMsg_Loading} from '../components/PromptMessage'
import RES_CODE_SUCCESS from '../util/globalCode';

import {createHashHistory} from 'history';
import { Link } from 'react-router-dom'
//import commonInfo from '../common/CommonInfo';

const instance = axios.create({
    //当创建实例的时候配置默认配置
    xsrfCookieName: 'xsrf-token'
});

//添加请求拦截器
instance.interceptors.request.use(function (config) {
    //在发送请求之前做某事，比如加一个loading
    /*if(commonInfo.hasLoading){
        //Toast.loading('', 3);
    }*/
    return config;
}, function (error) {
    //请求错误时做些事
    //Toast.hide();
    return Promise.reject(error);
});

//添加一个响应拦截器
instance.interceptors.response.use(function (response) {
    // 1.成功
    if (response.data.code === 200 && response.data.msg === "success") {
        /*if(commonInfo.hasLoading){
            //Toast.hide();
        }*/
        return response.data.data;
    }
    if (response.data.code === 500) {
        /*if(commonInfo.hasLoading){
            //Toast.hide();
        }*/
        /*const {from} = {from: {pathname: '/index/eorrorManagement'}};
        this.props.history.push(from)*/
        message.error(response.data.msg);
    }
    if (response.data.code === 404) {
        /*if(commonInfo.hasLoading){
            //Toast.hide();
        }*/
        window.location.href='http://localhost:8000/notFound'
        /*const {from} = this.props.location.state || {from: {pathname: '/index/notFoundManagement'}};
        this.props.history.push(from)*/
    }
    // 2.session过期
    /*if (!response.data.success && response.data.messageCode === globalCode.timeout) {
        //Toast.hide();
        //Toast.info("会话过期，请重新登录", 1);
        //createHashHistory().push('/login');

        // 定义一个messagecode在后面会用到
        return  Promise.reject({
            messageCode: 'timeout'
        })
    }*/

    // 系统异常、网络异常
    /*if (response.data.success && response.data.messageCode === globalCode.busyCode) {
        //Toast.hide();
        //Toast.info(response.data.message, 1);
        return  Promise.reject({
            messageCode: 'netError'
        })
    }*/
    if (response.data === null && response.data.msg === "f") {
        /*if(commonInfo.hasLoading){
            //Toast.hide();as
    }*/
        message.error('网络不给力哟，请检查网络设置');
    }

    // 3.其他失败，比如校验不通过等
    return Promise.reject(response.data);
}, function () {
    //Toast.hide();
    // 4.系统错误，比如500、404等
    //Toast.info('系统异常，请稍后重试！', 1);
    window.location.href='http://localhost:3010/#/index/eorrorManagement'
    return Promise.reject({
        messageCode: 'sysError'
    });
});

instance.interceptors.request.use(function (config) {
    config.withCredentials = true;
    config.headers = {
        token: isLogout()
    };
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default instance;
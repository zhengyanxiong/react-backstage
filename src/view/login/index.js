import React, {Component} from "react"
import {Form, Input, Row, Col, notification, message,Spin,Icon} from 'antd'
import {randomNum, calculateWidth} from '../../util/utils'
import {
    authenticateSuccess, authenticateSuccessType, authenticateSuccessToken,
    authenticateSuccessAdmin
} from "../../util/Cookie"
import PromptBox from "../../components/PromptBox"
import BGParticle from '../../util/BGParticle'
import {_adminLogin} from "../../api/userAdmin"
import Loading from "../../components/Loading"

import './style.css'
import 'animate.css/animate.css'
const antIcon = <Icon type="loading" style={{fontSize: 18 }} spin />;

class Index extends Component {
constructor(props){
    super(props);
    this.state = {
        tData:[],
        focusItem: -1,   //保存当前聚焦的input
        code: '',         //验证码
        loading: false
    }
}


    componentDidMount() {
        this.particle = new BGParticle('backgroundBox');
        this.particle.init();
        this.createCode()
    }
    
    loginSubmit = (e) => {
        e.preventDefault();
        this.setState({
            focusItem: -1
        });
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 检测验证码是否正确
                if (this.state.code.toUpperCase() !== values.verification.toUpperCase()) {
                    this.props.form.setFields({
                        verification: {
                            value: values.verification,
                            errors: [new Error('验证码错误')]
                        }
                    });
                    return
                }
                this.setState({
                    loading:true
                });
                let param = {
                    "adminName": values.username,
                    "adminPassword": values.password,
                };
                console.log("data ",param);
                const _this = this;
                _adminLogin(param).then((data) =>{
                    console.log(data);
                    message.success("登录成功！",2).then(()=>{
                        _this.setState({
                            loading:false
                        });
                        authenticateSuccess(values.username);
                        authenticateSuccessType(data.adminType);
                        authenticateSuccessToken(data.token);
                        authenticateSuccessAdmin(data.admin);
                        const {from} = this.props.location.state || {from: {pathname: '/'}};
                        this.props.history.push(from);
                    })
                }).catch(function () {
                    _this.setState({
                        loading:false
                    });
                    _this.createCode()
                });

            }

        })
    };

    /**
     * 生成验证码
     */
    createCode = () => {
        const ctx = this.canvas.getContext('2d');
        const chars = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        let code = '';
        ctx.clearRect(0, 0, 80, 39);
        for (let i = 0; i < 4; i++) {
            const char = chars[randomNum(0, 57)];
            code += char;
            ctx.font = randomNum(20, 25) + 'px SimHei' ; //设置字体随机大小
            ctx.fillStyle = '#D3D7F7';
            ctx.textBaseline = 'middle';
            ctx.shadowOffsetX = randomNum(-3, 3);
            ctx.shadowOffsetY = randomNum(-3, 3);
            ctx.shadowBlur = randomNum(-3, 3);
            ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
            let x = 80 / 5 * (i + 1);
            let y = 39 / 2;
            let deg = randomNum(-25, 25);
            /**设置旋转角度和坐标原点**/
            ctx.translate(x, y);
            ctx.rotate(deg * Math.PI / 180);
            ctx.fillText(char, 0, 0);
            /**恢复旋转角度和坐标原点**/
            ctx.rotate(-deg * Math.PI / 180);
            ctx.translate(-x, -y)
        }
        this.setState({
            code
        })
    };

    render() {
        const {form} = this.props;
        const {getFieldDecorator, getFieldError} = form;
        const {focusItem, code} = this.state;
        return (

                <div id='login-page'>
                {/*<h3 style={styles.loadingTitle} className='animated bounceInLeft'>登录页面载入中...</h3>
                <Loading/>*/}

                <div id='backgroundBox' style={styles.backgroundBox}/>
                <div className='container'>
                    <div className='box showBox'>
                        <h3 className='title'>管理员登录</h3>
                        <Form onSubmit={this.loginSubmit}>
                            <Form.Item help={getFieldError('username') &&
                            <PromptBox info={getFieldError('username')}
                                       width={calculateWidth(getFieldError('username'))}/>}>
                                {getFieldDecorator('username', {
                                    rules: [{required: true, message: '请输入用户名'}]
                                })(
                                    <Input
                                        onFocus={() => this.setState({focusItem: 0})}
                                        onBlur={() => this.setState({focusItem: -1})}
                                        maxLength={16}
                                        placeholder='用户名'
                                        addonBefore={<span className='iconfont icon-User'
                                                           style={focusItem === 0 ? styles.focus : {}}/>}/>
                                )}
                            </Form.Item>
                            <Form.Item help={getFieldError('password') &&
                            <PromptBox info={getFieldError('password')}
                                       width={calculateWidth(getFieldError('password'))}/>}>
                                {getFieldDecorator('password', {
                                    rules: [{required: true, message: '请输入密码'}]
                                })(
                                    <Input
                                        onFocus={() => this.setState({focusItem: 1})}
                                        onBlur={() => this.setState({focusItem: -1})}
                                        type='password'
                                        maxLength={16}
                                        placeholder='密码'
                                        addonBefore={<span className='iconfont icon-suo1'
                                                           style={focusItem === 1 ? styles.focus : {}}/>}/>
                                )}
                            </Form.Item>
                            <Form.Item help={getFieldError('verification') &&
                            <PromptBox info={getFieldError('verification')}
                                       width={calculateWidth(getFieldError('verification'))}/>}>
                                {getFieldDecorator('verification', {
                                    validateFirst: true,
                                    rules: [
                                        {required: true, message: '请输入验证码'},
                                        {
                                            validator: (rule, value, callback) => {
                                                if (value.length >= 4 && code.toUpperCase() !== value.toUpperCase()) {
                                                    callback('验证码错误')
                                                }
                                                callback()
                                            }
                                        }
                                    ]
                                })(
                                    <Row>
                                        <Col span={15}>
                                            <Input
                                                onFocus={() => this.setState({focusItem: 2})}
                                                onBlur={() => this.setState({focusItem: -1})}
                                                maxLength={4}
                                                placeholder='验证码'
                                                addonBefore={<span className='iconfont icon-securityCode-b'
                                                                   style={focusItem === 2 ? styles.focus : {}}/>}/>
                                        </Col>
                                        <Col span={9}>
                                            <canvas onClick={this.createCode} width="80" height='39'
                                                    ref={el => this.canvas = el}/>
                                        </Col>
                                    </Row>
                                )}
                            </Form.Item>

                            <div className='bottom'>
                                <Spin spinning={this.state.loading} style={{position: "absolute", marginLeft: "60px"}}  />
                                <input className='loginBtn' type="submit" value='登录'></input>
                            </div>
                        </Form>
                        <div className='footer'>
                            <div>欢迎登陆校园拍拍后台管理系统</div>
                        </div>
                    </div>
                </div>
                    </div>


        )
    }
}

const styles = {
    backgroundBox: {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${require('../../static/images/bg1.jpg')})`,
        backgroundSize: '100% 100%',
        transition: 'all .5s'
    },
    focus: {
        // transform: 'scale(0.7)',
        width: '20px',
        opacity: 1
    },
    loadingBox: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)'
    },
    loadingTitle: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginLeft: -40,
        marginTop: -18,
        color: '#000',
        fontWeight: 500,
        fontSize: 24
    },
}
Index = Form.create()(Index)
export default Index;
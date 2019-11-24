import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './images/logo.png'
import './less/login.less'

class Login extends Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                alert(`发送登陆的ajax请求`)
            }
        });
    };
    validatorPwd = (rule, value, callback) => {
        value = value.trim()
        if (!value) {
            callback('密码为必填项')
        } else if (value.length < 4) {
            callback('密码最短为4位')
        } else if (value.length > 16) {
            callback('密码不得超过16位')
        } else if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            callback('密码由数字、字母、下划线组成,不可输入空格')
        } else {
            callback()
        }
    }

    render() {
        let { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login-header">
                    <img src={logo} alt="" />
                    <h1>React项目: 后台管理系统</h1>
                </div>
                <div className="login-content">
                    <div className="form-ant">
                        <h1>用户登录</h1>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    initialValue: '',
                                    rules: [
                                        { required: true, whitespace: true, message: '用户名为必填项' },
                                        { min: 4, message: '用户名不可小于4位' },
                                        { max: 16, message: '用户名不可大于16位' },
                                        { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名由数字、字母、下划线组成，不可输入空格' }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        placeholder="用户名"
                                    />
                                )}

                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    initialValue: '',
                                    rules: [
                                        { validator: this.validatorPwd }
                                    ]
                                })(
                                    <Input
                                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登录</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        )
    }
}
/* 
    高阶函数
    定义：接收的参数是函数或者返回值是函数
    作用：实现一个更强大，动态的功能
    常见的高阶函数：数组遍历的方法/定时器/promise/高阶组件/闭包

    高阶组件
    定义：本质是一个函数，函数接收一个组件，返回一个新组件
	Form.create()返回的就是一个高阶组件
*/

/* 
    Form组件：包含<Form></Form>的组件 这里就是<Login></Login>组件
    利用From.create()产生一个新的组件，这个组件会包装From组件也就是Login
    新组件会像From传递一个属性，属性名叫做from 属性值为一个对象
*/
const WrappedNormalLoginForm = Form.create()(Login);
export default WrappedNormalLoginForm



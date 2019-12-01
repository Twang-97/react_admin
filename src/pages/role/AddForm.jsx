import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'antd'

class AddFrom extends Component {
    /* 声明接收的参数类型 */
    static propTypes = {
        setForm: PropTypes.func.isRequired,
    }

    //页面挂载前调用setForm，传递form属性
    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 15 }
            },
        };
        return (
            <Form>
                <Form.Item label='角色名称' {...formItemLayout}>
                    {/* getFieldDecorator用于表单验证，后续的通过验证要用到设置的第一个参数：categoryName */}
                    {getFieldDecorator('roleName', {
                        //默认值：initialValue
                        initialValue: '',
                        //表单验证
                        rules: [
                            { required: true, message: '角色名称不可为空' }
                        ]
                    })(
                        <Input type="text" placeholder="请输入角色名称" />
                    )}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddFrom)



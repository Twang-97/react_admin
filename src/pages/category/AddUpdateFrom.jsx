import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Input, Form } from 'antd'

class AddUpdateFrom extends Component {
    /* 声明接收的参数类型 */
    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categoryName: PropTypes.string
    }
    //页面挂载前调用setForm，传递form属性
    UNSAFE_componentWillMount() {
        this.props.setForm(this.props.form)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        let { categoryName } = this.props
        return (
            <Form>
                <Form.Item>
                    {/* getFieldDecorator用于表单验证，后续的通过验证要用到设置的第一个参数：categoryName */}
                    {getFieldDecorator('categoryName', {
                        //默认值：initialValue
                        initialValue: categoryName || '',
                        //表单验证
                        rules: [
                            { required: true, message: '分类名称不可为空' }
                        ]
                    })(
                        <Input type="text" placeholder="请输入分类名称" />
                    )}
                </Form.Item>
            </Form>
        )
    }
}
export default Form.create()(AddUpdateFrom)


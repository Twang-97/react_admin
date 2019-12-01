import React, { Component } from 'react'
import { Card, Icon, Button, Form, Select, Input, message } from 'antd'
import PicturesWall from './PicturesWall'
import RichTextEidtor from './RichTextEidtor'
import LinkButton from '../../components/linkbuttom/LinkButton'
import { reqCategorys, reqAddUpdateProduct } from '../../api/index'
import memoryUtil from '../../utils/memoryUtil'
const Item = Form.Item
const { Option } = Select;
const { TextArea } = Input

/* 子路由详情页 */
class ProductAddUpdate extends Component {
    constructor(props) {
        super(props)
        this.PicturesWall = React.createRef()
        this.editorRef = React.createRef()

    }
    state = {
        categorys: []
    }
    getCategory = async () => {
        const result = await reqCategorys()
        if (result.status === 0) {
            const categorys = result.data
            this.setState({ categorys })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                //收集product的 name, desc, price, categoryId信息
                const { name, desc, price, categoryId } = values
                console.log(categoryId)
                //收集上传额图片的文件名数组
                const imgs = this.PicturesWall.current.getImgs()
                //收集商品详情的detail标签字符串
                const detail = this.editorRef.current.getDetail()
                //封装product对象
                const product = { name, desc, price, categoryId, imgs, detail }
                if (this.isUpdateDate) {
                    product._id = this.product._id
                }
                //发请求添加/修改
                const result = await reqAddUpdateProduct(product)
                console.log(name, desc, price, categoryId, imgs, detail)
                if (result.status === 0) {
                    message.success(`${this.isUpdateDate ? '修改' : '添加'}商品成功`)
                    this.props.history.replace('/product')
                } else {
                    message.error(result.msg)
                }
            }
        });
    }
    validatorPrice = (rule, value, callback) => {
        if (value === '') {
            callback()
        } else if (value * 1 < 0) {
            callback('价格不可小于0元')
        } else {
            callback()
        }
    }
    componentDidMount() {
        this.getCategory()
    }
    UNSAFE_componentWillMount() {
        this.product = memoryUtil.product
        this.isUpdateDate = !!this.product._id
    }
    render() {
        const { categorys } = this.state
        const { isUpdateDate, product } = this
        const { getFieldDecorator } = this.props.form
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span>{isUpdateDate ? '修改商品' : '添加商品'}</span>
            </span>
        )
        const formItemLayout = {
            labelCol: {
                xs: { span: 2 }
            },
            wrapperCol: {
                xs: { span: 8 }
            },
        };
        return (
            <Card title={title}>
                {/* 第二步：给form指定submit事件的回调函数 */}
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Item label="商品名称：">
                        {getFieldDecorator('name', {
                            initialValue: product.name,
                            rules: [
                                { required: true, message: '商品名称不可为空' }
                            ],
                        })(<Input type="text" placeholder="请输入商品名称" />)}
                    </Item>
                    <Item label="商品描述：">
                        {getFieldDecorator('desc', {
                            initialValue: product.desc,
                            rules: [
                                { required: true, message: '商品描述不可为空' }
                            ],
                        })(<TextArea placeholder="请输入商品描述" autoSize={{ minRows: 2, maxRows: 6 }} />)}
                    </Item>
                    <Item label="商品价格：">
                        {getFieldDecorator('price', {
                            initialValue: product.price,
                            rules: [
                                { required: true, message: '商品价格不可为空' },
                                {    //自定义规则验证
                                    validator: this.validatorPrice
                                }
                            ],
                        })(<Input type="number" placeholder="请输入商品价格" addonAfter="元" />)}
                    </Item>
                    <Item label="商品分类：">
                        {getFieldDecorator('categoryId', {
                            initialValue: product.categoryId || '',
                            rules: [
                                { required: true, message: '商品分类不可为空' }
                            ],
                        })(<Select>
                            <Option value=''>未选择</Option>
                            {
                                categorys.map(category => <Option value={category._id} key={category._id}>{category.name}</Option>)
                            }
                        </Select>
                        )}
                    </Item>
                    <Item label="商品图片：">
                        {/* 通过ref获取到组件对象 */}
                        <PicturesWall ref={this.PicturesWall} imgs={product.imgs} />
                    </Item>
                    <Item label="商品详情：" wrapperCol={{ xs: { span: 20 } }}>
                        <RichTextEidtor detail={product.detail} ref={this.editorRef} />
                    </Item>
                    <Item >
                        {/* 进行表单统一验证，第一步：给button指定类型为submit */}
                        <Button type="primary" htmlType="submit"> 提交</Button>
                    </Item>
                </Form>

            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)

import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Card, Icon, List, } from 'antd'
import LinkButton from '../../components/linkbuttom/LinkButton'
import memoryUtil from '../../utils/memoryUtil'
import { Base_Url } from '../../utils/constants'
import { reqProducts } from '../../api/index'
const Item = List.Item

/* 子路由详情页 */
export default class ProductDetail extends Component {
    state = {
        categoryName: ''
    }
    getCategory = async (categoryId) => {
        const result = await reqProducts(categoryId)
        if (result.status === 0) {
            const categoryName = result.data.name
            this.setState({ categoryName })
        }
    }
    componentDidMount() {
        const product = memoryUtil.product
        this.getCategory(product.categoryId)
    }
    render() {
        const { categoryName } = this.state
        const product = memoryUtil.product
        if (!product || !product._id) {
            return <Redirect to="/product" />
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <Icon type="arrow-left" />
                </LinkButton>
                <span>商品详情</span>
            </span>
        )
        return (
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className="left">商品名称：</span>
                        <span>{product.name}</span>
                    </Item>
                    <Item>
                        <span className="left">商品描述：</span>
                        <span>{product.desc}</span>
                    </Item>
                    <Item>
                        <span className="left">商品价格：</span>
                        <span>{product.price}</span>
                    </Item>
                    <Item>
                        <span className="left">所属分类：</span>
                        <span>{categoryName}</span>
                    </Item>
                    <Item>
                        <span className="left">商品图片</span>
                        <span>
                            {
                                product.imgs.map(img => <img key={img} src={Base_Url + img} alt="img" className="detail-img " />)
                            }

                        </span>
                    </Item>
                    <Item>
                        <span className="left">商品详情</span>
                        <div dangerouslySetInnerHTML={{ __html: product.detail }}></div>
                    </Item>
                </List>
            </Card>
        )
    }
}

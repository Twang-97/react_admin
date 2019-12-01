import React, { Component } from 'react'
import { Card, Select, Input, Button, Icon, Table, message } from 'antd'
import throttle from 'lodash.throttle'

import { reqProduct, reqSearchProducts, reqUpdateStatus } from '../../api'
import LinkButton from '../../components/linkbuttom/LinkButton'
import { PAGE_SIZE } from '../../utils/constants'
import memoryUtil from '../../utils/memoryUtil'

const Option = Select.Option

export default class Product extends Component {
    state = {
        products: [],
        total: 0,
        loading: false,
        searchType: 'productName',//默认按照搜索名称搜索
        searchName: ''//搜索的关键字
    }
    //初始化表头
    initClomns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: price => '￥' + price
            },
            {
                title: '状态',
                width: 100,
                render: ({ _id, status }) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        text = '已下架'
                    }
                    return (
                        <span>
                            <Button
                                type="primary" onClick={() => { this.updateStatus(_id, status) }}>{btnText}</Button>
                            <span>{text}</span>
                        </span>
                    )
                }
            },
            {
                title: '操作',
                width: 100,
                render: (product) => (
                    <span>
                        {/* 如果使用的是BroswerRouter，那么路由传递参时，可以传递对象一类
                            传递写法：this.props.history.push('/product/detail',product
                            接收写法：this.location.state
                            
                         */}
                        <LinkButton
                            onClick={() => {
                                memoryUtil.product = product
                                this.props.history.push('/product/detail')
                            }}
                        >
                            详情
                        </LinkButton>
                        <LinkButton onClick={() => {
                            memoryUtil.product = product
                            this.props.history.push('/product/addupdate')
                        }}>修改</LinkButton>
                    </span>
                )
            }
        ];
    }

    //商品上架/下架
    updateStatus = throttle(async (productId, status) => {
        status = status === 1 ? 2 : 1
        let result = await reqUpdateStatus(productId, status)
        if (result.status === 0) {
            message.success('更新商品状态成功')
            this.getProduct(this.pageNum)
        }
    }, 2000)

    //搜索以及分页
    getProduct = async (pageNum) => {
        this.pageNum = pageNum
        const { searchType, searchName } = this.state
        let result
        if (!this.isSearch) {
            //分页接口
            result = await reqProduct(pageNum, PAGE_SIZE)
        } else {
            result = await reqSearchProducts({ pageNum, pageSize: PAGE_SIZE, searchName, searchType })
            console.log(result)
        }

        if (result.status === 0) {
            const { list, total } = result.data
            this.setState({
                products: list,
                total
            })
        }

    }


    componentDidMount() {
        this.getProduct(1)
    }
    UNSAFE_componentWillMount() {
        this.initClomns()
    }

    render() {
        let { loading, products, total, searchType, searchName } = this.state
        const title = (
            <span>
                <Select
                    style={{ width: 150 }}
                    value={searchType}
                    onChange={(value) => {
                        this.setState({ searchType: value })
                    }}
                >
                    <Option value="productName">按名称搜索</Option>
                    <Option value="productDesc">按描述搜索</Option>
                </Select>
                <Input
                    style={{ width: 150, margin: '0 10px' }}
                    value={searchName}
                    placeholder='关键字'
                    onChange={event => this.setState({ searchName: event.target.value })}
                />
                <Button
                    type="primary"
                    onClick={() => {
                        this.isSearch = true
                        this.getProduct(1)
                    }}
                >搜索
                </Button>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={() => {
                this.props.history.push('/product/addupdate')
                memoryUtil.product = {}
            }}>
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    bordered={true}
                    rowKey="_id"
                    loading={loading}
                    //columns：显示表格表头(是固定提前定义好的)
                    columns={this.columns}
                    //dataSource：表格中要显示的数据(state传进来的)
                    dataSource={products}
                    //defaultPageSize：每页默认显示的条数，showQuickJumper：跳转到某一页
                    pagination={{ total, defaultPageSize: PAGE_SIZE, showQuickJumper: true, onChange: this.getProduct, current: this.pageNum }}

                />
            </Card>
        )
    }
}


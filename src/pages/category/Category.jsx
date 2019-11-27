import React, { Component } from 'react'
import { Card, Button, Icon, Table, message, Modal } from 'antd'
import LinkButton from '../../components/linkbuttom/LinkButton'
import { reqCategorys, reqAddCategory, reqUpdateCategory } from '../../api'
import AddUpdateFrom from './AddUpdateFrom'

export default class Category extends Component {
    state = {
        categorys: [],
        loading: false,
        showStatus: 0 //0代表隐藏，1代表显示添加，2代表修改
    }

    //添加
    addFrom = () => {
        this.setState({ showStatus: 1 })
    }

    //点击ok的回调函数，用于添加/修改
    handleOk = () => {
        //validateFields：antd提供的方法，进行表单统一验证，values：input框中输入的值
        this.form.validateFields(async (err, values) => {
            if (!err) {
                let { categorys, showStatus } = this.state
                //通过验证后，获取输入的数据
                const { categoryName } = values
                let result
                //判断发送添加还是修改的请求
                if (showStatus === 1) {
                    if (categorys.find(item => item.name === categoryName)) {
                        message.error('不可重复添加')
                        return
                    } else {
                        result = await reqAddCategory(categoryName)
                    }
                } else {
                    if (this.category.name === categoryName) {
                        message.error('不可更改相同分类名')
                        return
                    }
                    const categoryId = this.category._id
                    result = await reqUpdateCategory({ categoryName, categoryId })
                }


                if (result.status === 0) {
                    const BaseContent = showStatus === 1 ? '添加' : '修改'
                    message.success(BaseContent + '分类成功')
                    this.setState({ showStatus: 0 })

                    //重置
                    this.form.resetFields()
                    //重新获取分类数据
                    this.getCategorys()
                }
            } else {
                message.error('添加分类失败')
            }
        });

    };
    //点击cancle的回调函数，用于隐藏对话框
    handleCancel = () => {
        this.form.resetFields()
        this.setState({ showStatus: 0 })

    };


    //初始化Table表头信息
    initClumns = () => {
        this.columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                width: 300,
                render: (category) => <LinkButton onClick={() => {
                    this.setState({ showStatus: 2 })
                    this.category = category
                }}>操作分类</LinkButton>,
            },
        ];
    }
    //发送请求获取数据
    getCategorys = async () => {
        //请求数据之前，显示loading状态
        this.setState({ loading: true })
        //请求分类数据
        const result = await reqCategorys()
        //无论发送是否成功，都将loading的状态更新为false
        this.setState({ loading: false })
        //判断是否获取成功，获取成功后更新状态
        if (result.status === 0) {
            const categorys = result.data
            this.setState({ categorys })
        } else {
            message.error('获取分类列表失败')
        }

    }

    //挂载前显示Table表头信息
    UNSAFE_componentWillMount() {
        this.initClumns()
    }
    //更新状态从而更新界面
    componentDidMount() {
        this.getCategorys()
    }

    render() {
        const { categorys, loading, showStatus } = this.state
        const category = this.category || {}
        const extra = (
            <Button type="primary" onClick={this.addFrom}>
                <Icon type="plus" />
                添加
            </Button>
        )
        return (
            <Card extra={extra} >
                <Table
                    bordered={true}
                    rowKey="_id"
                    loading={loading}
                    //columns：显示表格表头(是固定提前定义好的)
                    columns={this.columns}
                    //dataSource：表格中要显示的数据(state传进来的)
                    dataSource={categorys}
                    //defaultPageSize：每页默认显示的条数，showQuickJumper：跳转到某一页
                    pagination={{ defaultPageSize: 5, showQuickJumper: true }}
                />
                <Modal
                    title={showStatus === 1 ? '添加分类' : '修改分类'}
                    visible={showStatus !== 0}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    {/* 向AddUpdateFrom传递一个函数，用于接收form，并把form存在this.form上 */}
                    <AddUpdateFrom setForm={form => this.form = form} categoryName={category.name} />
                </Modal>
            </Card>
        )
    }
}

import React, { Component } from 'react'
import { Card, Button, Table, Modal, message } from 'antd'

import { PAGE_SIZE } from '../../utils/constants'
import LinkButton from '../../components/linkbuttom/LinkButton'
import { reqAddRole, reqUpdateRole } from '../../api/index.js'
import AddForm from './AddForm'
import AuthForm from './AuthForm'

export default class Role extends Component {
    constructor(props) {
        super(props)
        this.authRef = React.createRef()
    }
    state = {
        roles: [
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/category"
                ],
                "_id": "5ca9eaa1b49ef916541160d3",
                "name": "测试",
                "create_time": 1554639521749,
                "__v": 0,
                "auth_time": 1558679920395,
                "auth_name": "test007"
            },
            {
                "menus": [
                    "/role",
                    "/charts/bar",
                    "/home",
                    "/charts/line",
                    "/category",
                    "/product",
                    "/products"
                ],
                "_id": "5ca9eab0b49ef916541160d4",
                "name": "经理",
                "create_time": 1554639536419,
                "__v": 0,
                "auth_time": 1558506990798,
                "auth_name": "test008"
            },
            {
                "menus": [
                    "/home",
                    "/products",
                    "/category",
                    "/product",
                    "/role"
                ],
                "_id": "5ca9eac0b49ef916541160d5",
                "name": "角色1",
                "create_time": 1554639552758,
                "__v": 0,
                "auth_time": 1557630307021,
                "auth_name": "admin"
            }
        ],
        role: {},
        showStatus: 0 //0隐藏 1创建角色 2设置权限
    }


    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
            {
                title: '操作',
                render: () => <LinkButton onClick={() => { this.setState({ showStatus: 2 }) }}>设置权限</LinkButton>
            }
        ]
    }

    onRow = (role) => {
        return {
            onClick: event => {
                console.log(role)
                this.setState({ role })
            }
        }
    }

    //add:点击ok的回调函数，用于添加/修改
    handleOkAdd = () => {
        const { roles } = this.state
        // //validateFields：antd提供的方法，进行表单统一验证，values：input框中输入的值
        this.form.validateFields(async (err, values) => {
            if (!err) {
                //通过验证后，获取输入的数据
                const { roleName } = values
                this.form.resetFields()
                let result
                //发送添加的请求
                if (roles.find(item => item.name === roleName)) {
                    message.error('不可重复添加')
                    return
                } else {
                    result = await reqAddRole(roleName)
                }
                if (result.status === 0) {
                    message.success('添加角色成功')
                    this.setState({ showStatus: 0 })

                    //重置
                    this.form.resetFields()
                    //重新获取分类数据 
                    const role = result.data
                    //这种setState的写法适用于在原来数据的基础上修改
                    this.setState((state) => ({
                        roles: [...roles, role]
                    }))
                    // this.getCategorys()
                }
            } else {
                message.error('添加角色失败')
            }
        })

    }

    //add:点击cancle的回调函数，用于隐藏对话框
    handleCancelAdd = () => {
        this.form.resetFields()
        this.setState({ showStatus: 0 })
    }

    //update:点击cancle的回调函数，用于隐藏对话框
    handleOkUpdate = async () => {
        const role = this.state.role
        const menus = this.authRef.current.getMenus()
        role.menus = menus
        const result = await reqUpdateRole(role)
        if (result.status === 0) {
            message.success('更新权限成功')
        }
    }
    //update:点击cancle的回调函数，用于隐藏对话框
    handleCancelUpdate = () => {
        this.setState({ showStatus: 0 })
    }


    UNSAFE_componentWillMount() {
        this.initColumns()
    }
    render() {
        const { roles, role, showStatus } = this.state
        const title = (
            <span>
                <Button type="primary" onClick={() => { this.setState({ showStatus: 1 }) }}>创建角色</Button>&nbsp;&nbsp;
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    bordered
                    rowKey="_id"
                    //columns：显示表格表头(是固定提前定义好的)
                    columns={this.columns}
                    //dataSource：表格中要显示的数据(state传进来的)
                    dataSource={roles}
                    //选项配置功能
                    // rowSelection={{ type: 'radio' }}
                    //点击行
                    onRow={this.onRow}
                    //defaultPageSize：每页默认显示的条数，showQuickJumper：跳转到某一页
                    pagination={{ defaultPageSize: PAGE_SIZE }}
                />
                <Modal
                    title='创建角色'
                    visible={showStatus === 1}
                    onOk={this.handleOkAdd}
                    onCancel={this.handleCancelAdd}
                >
                    {/* 向AddUpdateFrom传递一个函数，用于接收form，并把form存在this.form上 */}
                    <AddForm setForm={form => this.form = form} />
                </Modal>
                <Modal
                    title='修改权限'
                    visible={showStatus === 2}
                    onOk={this.handleOkUpdate}
                    onCancel={this.handleCancelUpdate}
                >
                    {/* 向AddUpdateFrom传递一个函数，用于接收form，并把form存在this.form上 */}
                    <AuthForm role={role} ref={this.authRef} />
                </Modal>
            </Card>
        )
    }
}

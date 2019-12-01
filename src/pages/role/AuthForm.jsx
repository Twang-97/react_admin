import React, { Component } from 'react'
import { Input, Form, Tree } from 'antd'
import PropTypes from 'prop-types'


import MenuList from '../../config/menuConfig'
const { TreeNode } = Tree

export default class AuthFrom extends Component {
    /* 声明接收的参数类型 */
    static propTypes = {
        role: PropTypes.object
    }

    constructor(props) {
        super(props)
        const { menus } = this.props.role
        this.state = {
            checkedKeys: menus
        }
    }

    getTreeNodes = (MenuList) => {
        return MenuList.reduce((pre, item) => {
            pre.push(
                <TreeNode title={item.title} key={item.key} >
                    {item.children ? this.getTreeNodes(item.children) : null}
                </TreeNode>
            )
            return pre
        }, [])
    }

    onCheck = checkedKeys => {
        console.log(checkedKeys)
        this.setState({ checkedKeys })
    }

    getMenus = () => this.state.checkedKeys

    componentWillReceiveProps(nextProps) {
        const menus = nextProps.role.menus
        this.setState({
            checkedKeys: menus
        })
    }


    UNSAFE_componentWillMount() {
        this.treeNodes = this.getTreeNodes(MenuList)
    }

    render() {
        const { role } = this.props
        const { checkedKeys } = this.state
        const formItemLayout = {
            labelCol: {
                xs: { span: 5 }
            },
            wrapperCol: {
                xs: { span: 15 }
            },
        };
        return (
            <div>
                <Form.Item label='角色名称' {...formItemLayout}>
                    <Input type="text" value={role.name} disabled />
                </Form.Item>
                <Tree
                    checkable
                    defaultExpandAll={true}
                    checkedKeys={checkedKeys}
                    onCheck={this.onCheck}
                >
                    <TreeNode title='平台权限' key='all'>
                        {
                            this.treeNodes
                        }
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}




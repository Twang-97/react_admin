import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { Menu, Icon } from 'antd';
import logo from '../../assets/images/logo.png'
import './leftnav.less'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        //获取每次点击的地址
        const path = this.props.location.pathname

        /* 
        不要将列表写死，以防以后出现改动
        利用数组的reduce方法，实现对标签的遍历 
        */
        return menuList.reduce((pre, item) => {
            if (!item.children) {
                pre.push(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )
            } else {
                /* 
                功能：实现访问某个二级菜单时，二级菜单自动打开
                遍历item中的children，如果children中的key与path对应上了，则打开children所在的<SubMenu>
                 */
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                // 如果存在, 说明当前item的子列表需要打开
                if (cItem) {
                    this.openKey = item.key
                }
                pre.push(
                    <SubMenu
                        key={item.key}
                        title={
                            <span>
                                <Icon type={item.icon} />
                                <span>{item.title}</span>
                            </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                )
            }

            return pre
        }, [])
        //map方法遍历标签
        /*      return menuList.map(item => {
                 if (!item.children) {
                     return (
                         <Menu.Item key={item.key}>
                             <Link to={item.key}>
                                 <Icon type={item.icon} />
                                 <span>{item.title}</span>
                             </Link>
                         </Menu.Item>
                     )
                 }
                 const path = this.props.location.pathname
                 const showItem = item.children.find(item => item.key === path)
                 if (showItem) {
                     this.openKey = item.key
                 }
                 return (
                     <SubMenu
                         key={item.key}
                         title={
                             <span>
                                 <Icon type={item.icon} />
                                 <span>{item.title}</span>
                             </span>
                         }
                     >
                         {this.getMenuNodes(item.children)}
                     </SubMenu>
                 )
             }) */
    }



    /* 
    componentDidMount:在render()渲染一次之后在执行，只执行一次，用来执行异步操作，发送ajax，开启定时器等
    componentWillMount:在render()渲染之前执行，只执行一次
    */
    UNSAFE_componentWillMount() {
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render() {
        const openKey = this.openKey
        //得到请求路径
        let path = this.props.location.pathname
        return (
            <div className="left-nav">
                <Link className="left-nav-logo" to="/">
                    <img src={logo} alt="" />
                    <h1>硅谷后台</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
                >

                    {
                        this.menuNodes
                    }

                </Menu>
            </div>
        )
    }
}

/*
withRouter高阶组件:
包装非路由组件, 返回一个新的组件
新的组件向非路由组件传递3个属性: history/location/match
 */
export default withRouter(LeftNav)

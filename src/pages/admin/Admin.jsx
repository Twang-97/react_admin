import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import memoryUtil from '../../utils/memoryUtil'
import LeftNav from '../../components/left-nav/LeftNav'
import Header from '../../components/header/Header'
import Home from '../home/Home'
import Category from '../category/Category'
import Product from '../product/Product'
import Role from '../role/Role'
import User from '../user/User'
import Bar from '../charts/Bar'
import Line from '../charts/Line'
import Pie from '../charts/Pie'



import { Layout } from 'antd';

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    render() {
        // const user = JSON.parse(localStorage.getItem('user_key') || '{}')
        const user = memoryUtil.user
        if (!user._id) {
            return <Redirect to="/login" />
        }
        return (
            <Layout style={{ height: '100%' }}>
                <Sider style={{ color: 'white' }}>
                    <LeftNav></LeftNav>
                </Sider>
                <Layout>
                    <Header></Header>
                    <Content style={{ background: 'white', margin: '20px' }}>
                        <Switch>
                            <Route path="/home" component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path="/role" component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home" />
                        </Switch>
                    </Content>
                    <Footer style={{ fontSize: '14px', textAlign: 'center' }}>推荐使用谷歌浏览器，可以获得更佳页面操作体验</Footer>
                </Layout>
            </Layout>
        )
    }
}
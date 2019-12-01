import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ProductHome from './ProductHome'
import ProductAddUpdate from './ProductAddUpdate'
import ProductDetail from './ProductDetail'

import './product.less'

/*
商品路由
 */
export default class Product extends Component {
    render() {
        return (
            <Switch>
                {/* 路径默认是逐层匹配，现在需要路径完全匹配 所以设置exact={true}，可直写为exact */}
                <Route path='/product' component={ProductHome} exact /> {/*路径完全匹配*/}
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product' />
            </Switch>
        )
    }
}
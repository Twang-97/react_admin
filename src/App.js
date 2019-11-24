import React, { Component } from 'react'
import Login from './pages/login/Login'
import Admin from './pages/admin/Admin'
import { HashRouter, Switch, Route } from 'react-router-dom'


export default class App extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/" component={Admin} />
                </Switch>
            </HashRouter>
        )
    }
}
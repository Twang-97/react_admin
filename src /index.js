//入口文件
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import store from './redux/store'

ReactDOM.render(
    <App store={stors} />,
    document.getElementById('root'))

//绑定监听state的回调函数
store.subscribe(() => {
    ReactDOM.render(
        <App store={stors} />,
        document.getElementById('root'))
})
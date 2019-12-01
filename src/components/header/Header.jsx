import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import menuList from '../../config/menuConfig'
import { Modal } from 'antd';
import memoryUtil from '../../utils/memoryUtil'
import { formateDate } from '../../utils/dateUtils'
import localstorageUtil from '../../utils/localstorageUtil'
import { reqWeather } from '../../api/index'
import LinkButton from '../linkbuttom/LinkButton'
import './header.less'

class Header extends Component {
    state = {
        currentDate: formateDate(Date.now()),
        dayPictureUrl: '',
        weather: ''
    }

    //获取时间并转换时间格式
    componentDidMount() {
        this.InterId = setInterval(() => {
            this.setState({ currentDate: formateDate(Date.now()) })
        }, 1000)
        this.getWeather()
    }


    componentWillUnmount() {
        clearInterval(this.InterId)
    }
    getWeather = async () => {
        const { dayPictureUrl, weather } = await reqWeather('大庆')
        this.setState({ dayPictureUrl, weather })
    }
    //点击退出当前登录
    logout = () => {
        Modal.confirm({
            title: '确认退出吗?',
            onOk: () => {
                //删除localstroge和内存的数据并且跳转到/login
                localstorageUtil.removeUser()
                memoryUtil.user = {}
                this.props.history.replace('/login')
            }
        })

    }

    //动态获取头部标题显示
    getTitle = () => {
        let title = ''
        const path = this.props.location.pathname
        //遍历menuList，找到与path对应的那一项，并返回title，因为menuList中有children，所以要经过两层遍历
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const cItem = item.children.find(cItem => path.indexOf(cItem.key) === 0)
                if (cItem) {
                    title = cItem.title
                }
            }
        })
        return title
    }


    render() {
        const title = this.getTitle()
        const user = memoryUtil.user
        let { currentDate, dayPictureUrl, weather } = this.state
        return (
            <div className="header">
                <div className="header-top">
                    <span className="welcome">欢迎，{user.username}</span>
                    <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <span className="header-bottom-left">{title}</span>
                    <div className="header-bottom-right">
                        <span>{currentDate}</span>
                        <img src={dayPictureUrl} alt="weather" />
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

/* 
将非路由组件包装
*/
export default withRouter(Header)

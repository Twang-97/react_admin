/*
    真正管理状态数据的函数
    接收两个参数 老的state和action
    根据这两个参数 生成新的state的纯函数
*/
import { INCREAMENT, DECREAMENT } from './cation-types'
export default function count(state = 1, action) {
    switch (action.type) {
        //如果为增加 
        case INCREAMENT:
            return count + action.number
        case DECREAMENT:
            return count + action.number
        //产生初始状态值
        default:
            return state
    }
    return
}
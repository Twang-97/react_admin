/* 
    redux最核心的管理对象：store
*/

import { createStore } from 'redux'
import reducer from './reducer'


//根据指定的reducer函数 产生一个store对象
//store对象内部管理着状态数据，状态的初始值为reducer第一次调用的值
export default createStore(reducer)
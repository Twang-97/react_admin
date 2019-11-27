/* 
包含应用中所有请求接口的函数：接口请求函数
要求：函数的返回值都为promise对象
*/

import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

//获取登录信息，判断用户名密码是否正确
export const reqLogin = (username, password) => (ajax.post('/login', { username, password }))


// export default function reqLogin(username, password) {
//     //axios发送请求以后，要使用return，使其返回出一个promise，然后.then进行调用
//     return ajax({
//         method: 'post',
//         url: '/login',
//         // 当data是对象时，axios默认格式为json格式
//         data: {
//             username,
//             password
//         }
//         /*  如果要求格式为urlencoded，使用qs，将格式转化为username=xxx&password=123格式
//             在ajax.js中配置一个请求拦截器来实现发送请求前对data对象格式的转换
//          data: qs.stringify({ username, password }) */
//     })
// }



//使用jsonp获取天气
export const reqWeather = (city) => {
    return new Promise((resolve, reject) => {
        const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url, {}, (error, data) => {
            if (!error && data.error === 0) {
                const { dayPictureUrl, weather } = data.results[0].weather_data[0]
                resolve({ dayPictureUrl, weather })
            } else {
                message.error('获取天气失败')
            }
        })
    })
}




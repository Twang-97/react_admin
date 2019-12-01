import axios from 'axios'
import qs from 'qs'
import { message } from 'antd'

// /* 
//    封装ajax请求的函数，向外暴露的本质上为axios，解决了以下问题
//    1.解决了post携带参数问题
//    2.让请求成功的结果不再是response，而是response.data
//    3.统一指定请求失败(发送请求失败)的回调函数，一旦在这里指定，不会再执行自己写的失败的回调函数

//    整个过程是 请求拦截器-->真正发请求的代码—->响应拦截器-->自己设置的回调函数，整体结构为promise的链式调用 
// */

// /* 
//     添加请求拦截器，在真正发送请求之前执行请求拦截器中的代码
//     post请求有两种格式，urlencode和json，要看后台服务器支持哪一种
//     如果data格式为json，axios默认转换dada格式为json格式
//     config为index中写的配置对象
//     get不存在这个问题，get把请求参数放在url后面
//     判断请求类型是否为post，如果为post，将其转换为urlencode格式username=xxx&password=123，
//     配置一次，以后每次发送请求时，data传入对象即可 
// */
// axios.interceptors.request.use(function (config) {
//     let { method, data } = config
//     //判断meth是否为post以及data是否为对象
//     if (method.toLowerCase === 'post' && typeof (data) === 'object') {
//         //转换data格式
//         config.data = qs.stringify(data)
//     }
//     return config;
// });

// /* 
//     添加响应拦截器，在收到响应数据之后，执行响应回调函数之前，执行响应拦截器中的代码
//     axios.then响应的回调函数取数据为response.data，不想每次都response.data方式取数据，所以在响应拦截器中做处理
//     配置一次，以后取数据直接写data即可
// */
// axios.interceptors.response.use(function (response) {
//     return response.data
// }, function (error) {
//     //统一指定请求失败(发送请求失败)的回调函数，一旦在这里指定，不会再执行自己写的失败的回调函数
//     message.error('网络异常')
//     /*
//         若想中断promise的调用，就返回一个始终处于pending状态的promise对象  
//     */
//     return new Promise(() => { })
// })

// export default axios


export default function ajax(url, data = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let promise
        // 1. 执行异步ajax请求
        if (type === 'GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data // 指定请求参数
            })
        } else { // 发POST请求
            promise = axios.post(url, data)
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('请求出错了: ' + error.message)
        })
    })

}

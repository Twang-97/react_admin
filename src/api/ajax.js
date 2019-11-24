import axios from 'axios'
import qs from 'qs'

/* 
    添加请求拦截器，在发送请求之前执行请求拦截器中的代码
    判断请求类型是否为post，如果为post，将其转换为urlencode格式username=xxx&password=123，
    配置一次，以后每次发送请求时，data传入对象即可
*/
axios.interceptors.request.use(function (config) {
    let { method, data } = config
    //判断meth是否为post以及data是否为对象
    if (method === 'post' && typeof (data) === 'object') {
        //转换data格式
        config.data = qs.stringify(data)
    }
    return config;
});

/* 
    添加响应拦截器，在收到响应数据之后，执行响应回调函数之前，执行响应拦截器中的代码
    axios.then响应的回调函数取数据为response.data，不想每次都response.data方式取数据，所以在响应拦截器中做处理
    配置一次，以后取数据直接写data即可
*/
axios.interceptors.response.use(function (response) {
    return response.data
}, function (error) {
    //统一指定请求失败(发送请求失败)的回调函数，一旦在这里指定，不会再执行自己写的失败的回调函数
    console.log('ajax.js-----', error.message)
    /*
        整个过程是 请求拦截器-->真正发请求的代码—->响应拦截器-->自己设置的回调函数，整体结构为promise的链式调用
        若想中断promise的调用，就返回一个始终处于pending状态的promise对象  
    */
    return new Promise(() => { })
})

export default axios
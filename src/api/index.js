import ajax from './ajax'
import qs from 'qs'

export default function reqLogin(username, password) {
    //axios发送请求以后，要使用return，使其返回出一个promise，然后.then进行调用
    return ajax({
        method: 'post',
        url: '/login',
        // 当data是对象时，axios默认格式为json格式
        data: {
            username,
            password
        }
        /*  如果要求格式为urlencoding，使用qs，将格式转化为username=xxx&password=123格式
            在ajax.js中配置一个请求拦截器来实现发送请求前对data对象格式的转换
         data: qs.stringify({ username, password }) */
    })
}


reqLogin('admin', 'admin').then((data) => {
    console.log(data)
})

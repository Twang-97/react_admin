# day03
## 1.leftNav组件
    1).使用Antd的组件
            Menu/Menu.Item/Menu.SubMenu
    2).使用react-router
            withRouter()：包装非路由组件，给其传入history/location/match等属性
            history：push()/replace()/goBack()
            location：pathname属性(当前请求路径)
            match：params属性
    3).componentWillMount与componentDidMount的比较
            componentWillMount：在第一次render()前调用，为第一次render()准备数据(同步)
            componentDidMount：在第一次render()后调用，启动异步任务，后面异步更新状态时重新render()
    4).动态生成Item和SubMenu列表
            map()+递归：多级菜单列表  
            reduce()+递归：多级菜单列表
## 2.Header组件
    1).静态布局
      三角形
    2).获取当前用户名显示
      MemoryUtils
    3).获取当前时间
      循环定时器，每隔一秒种更新一次时间
      格式化时间
    4).获取天气预报
      jsonp
    5).当前导航项标题
      利用withRouter()包装非路由组件，得到路由组件属性
    6).退出登录
      Antd的对话框
      清除localStroge的数据
      清除内存的数据
    7).抽取ButtonLink
      通过{...props}
      利用children属性
    

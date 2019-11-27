import React from 'react'
import './linkbutton.less'

/* 
自定义看似是链接实际上是button的组件
{...props}将所有接收到的所有属性传递给button
childeren标签属性：
字符串：<ButtonLink>退出</ButtonLink>
标签对象：<ButtonLink><span></span></ButtonLink>
标签对象的数组：<BUttonLink><span></span><span></span></BUttonLink>
undefined:  <ButtonLink></ButtonLink>
*/
export default function LinkButton(props) {
    return <button className="link-button" {...props}></button>
}
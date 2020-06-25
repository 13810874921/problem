## 性能优化
- SCU  shouldComponentUpdate
- React **默认：父组件更新，子组件则无条件更新！**
- SCU 一定要每次都用吗？不一定，按需优化。一定要配合不可变值去写

```js
shouldComponentUpdate(nextProps, nextState){
    //默认返回true
    if(nextState.count !== this.state.count){ //如果状态里面存的数据改变了
        return true // 可以渲染
    }
    return false //不可以渲染
}
```


## 面试题
### react组件如何通讯
### JSX本质是什么
- 变量、表达式
遇到< 按html处理，遇到{ 按js处理；
* class：className
* 样式：style {{}}
* 原生html：__html "<div>123</div>"
* rawHtmlData = "<div>123</div>"
* <p dangerouslySetInnerHTML={rawHtmlData}></p>
### 条件判断
* is else
* 三元表达式
* 逻辑运算符 && ||
### 渲染列表
* map 不改变元数组形成一个新的数组
* key 唯一性
### 表单
* 受控组件
* input textarea select 用value
### context是什么，有什么用途？
### scu用途 shouldComponentUpdate
### redux单向数据流
### setState 是同步还是异步？
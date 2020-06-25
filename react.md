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
* 通过onchange改变state里面的data从而进行双向绑定

### context是什么，有什么用途？
### scu用途 shouldComponentUpdate
### redux单向数据流
### setState 是同步还是异步？
* 是不可变值
* 可能是异步更新
* 可能会被合并
- 数组
```js
//不会改变原数组
this.state={
    list:[1,2,3,4]
}
cosnt list5Copy = this.state.list5.slice()
list5Copy.splice(2,0,'a') // 中间插入/删除
this.setState({
    list1:this.state.list.concat(111), //追加,
    list2:[...this.state.list,111],    //追加
    list3:this.state.list.slice(0,3),  //截取
    list4:this.state.list.filter(item=>item>100) //筛选
    list5:list5Copy // 其他操作
})
```
*不能直接对this.state.list 进行push pop splice等，这样违反不可变值规则*
- 对象
```js
// 不可变值 - 对象
this.setState({
    obj1:Object.assign({},this.state.obj1,{a:100}),
    obj2:{...this.state.obj2,a:100}
})
```
* 默认是异步
```js
this.state={
    count:0
}
this.setState({
        count:this.state.count+1
})
    console.log("此时也是同步的，0") //异步 0
```
* 同步
```js
this.setState({
    count:this.state.count +1
},()=>{
    console.log("此时count值是1，回调函数") //同步 1
})
```

```js
setTimeuot(()=>{
    this.setState({
        count:this.state.count+1
    })
    console.log("此时也是同步的，1") //同步 1
},0)
```
```js
bodyClickHandle=()=>{
    this.setState({
        count:this.state.count+1
    })
    console.log("count 1") // 同步 1
}
componentDidMount(){
    //自定义DOM事件，setState是同步的
    document.body.addEventListener("click",this.bodyClickHandle)
}
```
- 可能会被合并
```js
//传入对象，执行解雇只一次 +1
this.setState({
    count:this.state.count+1
})
this.setState({
    count:this.state.count+1
})
this.setState({
    count:this.state.count+1
})

//传入函数，不会被合并，执行结果是+3
this.setState((prevState,props)=>{
    return {
        count:prevState.count + 1
    }
})
this.setState((prevState,props)=>{
    return {
        count:prevState.count + 1
    }
})
this.setState((prevState,props)=>{
    return {
        count:prevState.count + 1
    }
})
```

### react高级特性
* 函数组件 - 如果只接收props，return一个jsx模版，可以使用函数组件。
1. 纯函数，输入props，输出JSX
2. 没有实例，没有生命周期，没有state
3. 不能扩展其他方法
* 非受控组件
1. ref - React.createRef()//创建ref
2. defaultValue defaultChecked
3. 手动操作DOM元素
* Portals
* context
* 异步组件
* 高阶组件HOC
* Render Props

### 性能优化
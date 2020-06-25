# vue使用

## 优化
1. 异步组件
2. keep-alive

---

## v-show和v-if区别
>v-show是通过display来控制
v-if渲染结果是操作dom节点，不回渲染腹部和条件的子内容，会引起重绘回流
## slot
>
## computed 和 watch
>computed有缓存，data不变则不回重新计算。
watch普通模式是浅监听，
watch监听引用类型，拿不到oldVal，需要通过handler(oldVal,newVal){},deep:true的方式,进行深度监听,因为指针指向同一个堆的引用地址

```js
data(){
    return{
        info:{
            name:"zhangsan"
        }
    }
},
watch:{
    info:{
        handler(oldVal,newVal){

        },
        deep:true
    },
    "info.name"(oldVal,newVal){

    }
}
```

## v-for的key
>key是唯一值
v-for和v-if不能一起使用,v-for的计算级高于v-if
建议key："item.title+index"
## v-html
>会有XSS风险，会覆盖子组件
## class和style
>可以动态传参，使用驼峰的方式
## 事件
>event是MouseEvent event.__proto__.constructor
event.target 事件的目标是哪个dom元素
event.currentTarget 事件注册在哪个dom元素上
event是原生的，事件被挂载在当前元素上
## 事件修饰符
>@click.stop   @click.once  @click.self
input: 去空格v-model.trim  防抖v-model.lazy  数字v-model.number
## v-model
> 进行数据的绑定。textarea 用v-model来控制 

---

## vue如何通讯
>1. 全局new Vue() 
2. 父组件传递参数，子组件props接收参数，子组件传递方法，父组件通过handle接收方法。
3. vuex

## 基本使用，组件使用 -- 必须会
>props,$emit
子组件通过props获取父组件传过来的数据
子组件通过$emit方法向父组件传递方法及参数,父组件通过$on来接收
```js
props:{
    list:{
        type:Array,
        default:[]
    }
}
```
```vue
//child.vue
<script>
add(){
    this.$emit('addHandle',value)
    event.$emit('addHandle',value)
}
</script>
//father.vue
<template>
<div @addHandle="receiveAdd"></div>
</template>
<script>
methods:{
    receiveAdd(val){
        //...省略
    }
}
</script>
```
兄弟组件可以通过全局vue来传递
```js
//需要new Vue()实例
//bus.js 自定义事件
import Vue from 'vue'
export default new Vue()
//父组件father.vue
onload(){
    event.$on("addHandle",(res)=>{
        //···省略
    })
}
```

```js
////其他组件间的通讯
//a.vue
methods:{
    receiveAdd(val){
        //......
    }
}
//a.child.vue
methods:{
    addHandle(val){
        this.$emit("addHandle",val)
        event.$emit("addHandle",val)
    }
}
//b.vue
mounted(){
    event.$on("addHandle",this.aaaFunction)
},
beforeDestroy(){
    //及时销毁，否则容易造成内存泄漏
    event.$off("addHandle",this.aaaFunction)
}
```
## Vuex和Vue-router使用
>
## 组件的生命周期
- 挂载阶段 实例初始化
- 更新阶段 页面渲染完成
- 销毁阶段

- 父子组件的加载顺序
>父组件创建，子组件创建，子组件挂载，父组件挂载
父组件createUpdate更新，子组件createUpdate更新，子组件完成更新，父组件完成更新

## 高级特性 -- 深度
### 自定义v-model
> 1. input使用的是 **:value** 而不是 **v-model**
2. change和model.event要一一对应
```vue
//Fu.vue
<template>
    <ZiComponent v-model="text" />
</template>

//ZiComponent.vue
<template>
    <input type="text" :value="text" @input="$emit("change",$event.target.value)">
</template>
<script>
export default {
    model:{
        prop:"text",
        event:"change"
    },
    props:{
        text:String
    }
}
</script>
```
### $nextTick
>异步渲染造成获取数据DOM元素的时候是之前的节点个数，通过$nextTick()可以在dom渲染完进行回调。
页面渲染时会将data的修改做整合，一个函数内的多次data修改只会渲染一次。
```vue
<template>
<ul ref='ul'></ul>
</template>
<script>
list:['a','b','c'],
//...
addItem(){
    this.list.push(Date().now())
    this.list.push(Date().now())
    this.list.push(Date().now())
    //上面只渲染一次
    $nextTick(()=>>{
        console.log(this.$refs.ul.childrNodes.length) //放在里面通过回调函数进行加载正确dom节点
    })
}
</script>
```
### slot
1. 基本使用
```vue
//组件引用
<template>
<slotDemo :url="http://www.123.com">
    123
</slotDemo>
</template>
```
```vue
//子组件插槽使用slotDemo.vue
<template>
    <a :href="url">
        <slot>
            如果父组件里没有值，则默认显示的值
        </slot>
    </a>
</template>
<script>
props:['url']
</script>
```
2. 作用域插槽
```vue
//组件引用
<template>
    <slotDemo :url="http://www.123.com">
       <template v-slot="scoped">
       {{scoped.slotData.title}}
       </template>
    </slotDemo>
</template>
```
```vue
//子组件插槽使用slotDemo.vue
<template>
    <a :href="url">
        <slot :slotData="website">
            如果父组件里没有值，则默认显示的值
        </slot>
    </a>
</template>
<script>
export default{
    props:['url],
    data(){
        return{
            website:{
                url:"http://www.a.com",
                title:"slot"
            }
        }
    }
}
</script>
```
3. 具名插槽
```vue
//nameSlot
<template>
    <div>
        <slot name="header"></slot>
    </div>
    <div>
        <slot></slot> //此处未命名
    </div>
    <div>
        <slot name="footer"></slot>
    </div>
</template>
```
```vue
<template>
    <nameSlot>
        <!-- 缩写 <template #header> -->
        <template v-slot:header>
            <h1>此内容将插到name=“header”中</h1>
        </template>
        <template >
            <h2>此内容将插到未命名的slot中</h1>
        </template>
        <template v-slot:footer>
            <h3>此内容将插到name=“footer”中</h3>
        </template>
    <nameSlot>
</template>
```
>父组件向子组件插入模版
- 动态、异步组件
- keep-alive
- mixin
- refs

### 动态组件
- :is="component-name" 用法

**动态循环渲染**可以形成不同的布局效果
```vue
<template>
    <div v-for="(item,index) in Demo" :key="index">
        <component :is="item" />
    </div>
</template>
<script>
    export default{
        components:{
            List,
            Text,
            Image
        },
        data(){
            return{
                Demo:["Text","List","Text","Image"]
            }
        }
    }
</script>
```
### 异步组件
- import() 函数
- 按需加载大型组件 **异步**
```vue
<template>
    <div>
        <ImportDemo v-if="showDemo" />
        <button @click="showDemo=true">按钮</button>
    </div>
</template>
<script>
export default{
    data(){
        return{
            showDemo:false
        }
    },
    components:{
        ImportDemo:()=>import('../components/demo')
    }
}
</script>
```
### keep-alive
- 缓存组件
- 频繁切换而不需要重复渲染
- Vue常用性能优化
- 是通过view层级来渲染的
- 对比：v-show是以css来控制的 
```vue
//父组件
<template>
    <div>
        <button @change="changeState('A')">A</button>
        <button @change="changeState('B')">B</button>
        <button @change="changeState('C')">C</button>
        <keep-alive>
            <Component1 v-if="state=='A'">
            <Component2 v-if="state=='B'">
            <Component3 v-if="state=='C'">
        </keep-alive>
    </div>
</template>
<script>
    export default{
        components:{
            Component1,
            Component2,
            Component3
        },
        data(){
            return{
                state:"A"
            }
        },
        methods:{
            changeState(state){
                this.state=state
            }
        }
    }
</script>
```

```vue
//Component1,Component2,Component3
<template>
    <div>
    </div>
</template>
<script>
export default{
    mounted(){
        consnole.log("组件挂载")
    },
    destoryed(){
        console.log("组件销毁")
    }
}
</script>
```

### mixin 混入
- 多个组件拥有相同的逻辑时抽离出来
- 他只是一段js代码
```js
//common.mixin.js
export default {
    data(){
        return {
            name:"张三"
        }
    },
    methods:{
        showName(){
            console.log(this.name)
        }
    },
    mounted(){
        console.log("mixin mounted", this.name)
    }
}
```
```vue
<script>
//引用
import mixin from './common/mixin.js'
export default {
    mixin:[mixin]
}
</script>
```
- mixin的问题
1. 变量来源不明确，不利于阅读
2. 多个mixin可能造成命名冲突
3. 可能会出现多对多多关系，复杂度高




## vuex 
- 基本概念和API
1. state
2. getters
3. action 
>只有action才能进行异步操作
4. mutation
>原子整合

- 用于vue组件
1. dispatch
2. commit 
3. mapState
4. mapGetters
5. mapActions
6. mapMutations

## vue-router
- 路由模式
>h5 history，hash
>hash http://localhost:8080/#/user/11
>history  http://localhost:8080/user/11  需要服务端支持
- 路由配置
>动态路由
页面需要通过$route.params.id 进行获取
路由配置里面写动态参数
```js
const router = new VueRouter({
    mode:"history", // hash
    rotues:[
        {path:'/user/:id',component:User}
    ]
})
```
>懒加载
```js
const router = new VueRouter({
    mode:"history", // hash
    rotues:[
        {path:'/user/:id',component:()=>import('./../components/User')}
    ]
})
```

---
# Vue原理
1. *响应式：监听data属性，vue2.x通过Object.defineProperty()进行getter,setter.vue3.0是通过Proxy*
2. *模版编译：将字符串模版生成一个render函数并返回一个vnode实例，并描述如何创建真实DOM元素*
3. *VDOM:通过diff算法来实现，主要执行函数为patch(elem,vnode),path(vnode,newVNode)*

>以组件化为基础，数据驱动视图。
它是一个渐进式框架，什么叫渐进式，我们可以理解为你可以只使用vue的一部分，按需使用vue的API，而不是需要使用所有，就能够完成编写，不需要完全依赖全家桶，也可以通过高阶函数进行增加业务的逻辑，比如mixin。整个过程就是一个搭积木的过程，利用已有的工具和库搭建自己的项目。
<del>或者可以理解成，他只提供你一个框架，需要什么自己添加就行。</del>

## 如何理解MVVM
>model层，script里面的 data 。
>view层， template里面的模版 。
>viewModel层 操作控制数据改变的层，来贯穿model层与view层的更新

## Vue响应式，核心API是什么？
>核心API - Object.defineProperty
vue3.0开始使用ES6的新特性Proxy来处理数据变更
但是，Proxy兼容性不好，且无法使用polyfill

- Object.defineProperty的基本用法
```js
const target= {}
const name="小姐姐"
Object.defineProperty(target,key,description)
//其中 target 目标对象，key自定义的变量名，description描述
description={
    get:function(){
        return name
    },
    set:funciton(newVal){
        name = newVal
    }
}
```
- Object.defineProperty的缺点
1. 在数据层级比较深的情况下，需要深度监听，需要递归到底，一次性计算量大，比如
```js
let data ={
    name:"王",
    info:{
        age:21,
        language:{
            0:Chinese,
            1:English
        }
    }
}
```
2. 无法监听新增属性/删除属性（但需要使用Vue.set Vue.delete这两个API来新增和删除）
3. 无法原生监听数组，需要特殊处理

- DOM
>1. DOM的操作是非常耗费性能的。
2. 我们之前使用的jQuery，可以控制DOM操作的时机，手动调整。
3. vue和react都是数据驱动视图
4. js的执行速度要快于DOM的更新速度

- 虚拟DOM（virtural DOM） 
>vDOM是vue和react的重要基础
*可以通过js模拟出DOM结构，计算出最小的变更，再去操作真实DOM*

如何模拟，如下：
```html
<!-- 真实DOM -->
<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size:20px">
        <li onclick="clickhandle()">a</li>
    </ul>
</div>
```
**重点：** 模拟虚拟DOM
```js
// 虚拟DOM
{
    tag:"div",
    props:{
        className:"container",
        id:"div1"
    },
    children:[
        {
            tag:"p",
            children:"vdom"
        },
        {
            tag:"ul"m
            props:{
                style:"font-size:20px"
            },
            children:[
                {
                    tag:"li",
                    children:"a",
                    on:{
                        click:this.clickHandle
                    }
                }
            ]
        }
    ]
}
```
### 可以通过snabbdom学习vdom，
*Vue也是参考的snabbdom实现的vdom和diff*
- patchVnode,addVnodes,removeVnodes,updateChildren(key的重要性)
通过children的索引，从第一个新值新key老值老key进行一一对应对比（索引++）并且从最后一个新值新key老值老key进行一一对应对比（索引--），直到索引相同的时候，最后一次对比，对比完成，进入patchVnode的hook（生命周期钩子函数），最后将element挂载到真实的Dom节点上。
- diff
diff算法是vdom中的最核心、最关键的部分
diff算法能在日常使用vue、react中体现出来（如key）
1. 如何比较
 * 只比较相同但层级，不做跨级比较
 * tag不相同，则直接删掉重建，不再深度比较
 * tag和key，两者都相同，则认为是相同节点，不再深度比较
 * 如不不实用key的话，旧的element全部会删除并替换成新的element（性能问题）
 * 如果key使用index，如果发生数据改变的话，也会删掉老的元素，重新替换成新的element元素，所以不建议在循环的时候把key设置成index

2. snabbdom源码解读
3. vdom存在的价值，是数据驱动视图和控制DOM操作

## vue编译模版
- html是标签语言，不具备操作，判断和循环
- 只有通过js才可以实现上述操作（图灵完备：图灵完备是指机器执行任何其他可编程计算机能够执行计算的能力。）
- 模版转换成某种js代码，就是编译模版

- 模版编译是一个
* 生成一个render函数并返回一个vnode实例
* *vnode实例是一个节点描述对象，描述如何去创建一个真实DOM元素

- **使用 webpack 的 vue-loader， 会在开发环境下编译模版**（重要）


```js
//依赖vue-template-compiler 
const compiler = require('vue-template-compiler')
const template = `<p id="p1">{{message}}</p>`
//编译
const res = compiler.compile(template)
//render就是js代码 返回的是VNode
console.log(res.render)//with(this){return _c('p',{attrs:{"id":"p1"}},[_v(_s(message))])}
//_c createElement
//_v createTextVNode
//_s toString
//_l renderList 循环    _l((list),function(item){return _c("li",{key:item.id},[_v(_s(item.title))])})
```

## vue原理/双向绑定原理
>采用数据劫持结合发布者-订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应监听回调。当把一个普通 Javascript 对象传给 Vue 实例来作为它的 data 选项时，Vue 将遍历它的属性，用 Object.defineProperty() 将它们转为 getter/setter。用户看不到 getter/setter，但是在内部它们让 Vue 追踪依赖，在属性被访问和修改时通知变化。

vue的数据双向绑定 将MVVM作为数据绑定的入口，整合Observer，Compile和Watcher三者，通过Observer来监听自己的model的数据变化，通过Compile来解析编译模板指令（vue中是用来解析 {{}}），最终利用watcher搭起observer和Compile之间的通信桥梁，达到数据变化 —>视图更新；视图交互变化（input）—>数据model变更双向绑定效果。

## 通过render代替template
```js
Vue.component("Demo",{
    render:function(createElement){
        return createElement(
            "h"+this.level,
            [
                createElement("a",{
                    attrs:{
                        name:"demoId",
                        href:"#"+"floor"+this.id
                    }
                },"I am a tag")
            ]
        )
    }
})
```

## 组件的 渲染-更新 的过程
>

## 初次渲染过程
- 解析模版为render函数，（或在开发环境已完成，v-loader）
- 触发响应式，监听data属性getter，setter
- 执行render函数，生成vnode，path（elem,vnode）
- 只有模版引用了某个data的key的时候，才会触发getter
## 更新过程
- 修改data，触发setter（此前在getter中已被监听）
- 重新执行render函数，生成newVNode
- patch（VNode,newVNode）

## 路由模式
- hash - window.onhashchange
- history - history.pushState 跳转 和 window.onpopstate 后退




# 面试真题
- v-show和v-if 区别    
>1. v-show是display控制css的显示和隐藏
2. v-if是组件的真正渲染和销毁
3. 频繁操作用v-show.
- v-for的key
>1. diff算法通过tag和key来半段，是否是sameNode
2. 减少渲染次数，提升渲染性能
- vue的生命周期
1. 单组件生命周期图
2. 父子组件生命周期关系
- 组件的通讯方式
1. props,$emit
2. 自定义事件，bus.$on,bus.$off,bus.$emit
3. vuex
- 双向数据绑定
1. input元素的value=this.name
2. 绑定input事件this.name = $event.target.value
3. data更新触发re-render
- 对MVVM的理解
            viewModel
      ------DOM Listeners----> 
 view                            Model
      <-----Directives--------   
 DOM            vue           Plain JavaScript Object

 - computed有何特点
 1. 缓存，data不变不回重新计算
 2. 提高性能
 
 - data为啥是一个函数
 我们定义的*.vue其实定义的是一个class，在实例化的时候执行data，如果不是函数，所有的data就共享了，保证data数据在自己独立的class的闭包中，不会相互影响

 - ajax请求应该放在哪个生命周期
 1. mounted
 2. JS是单线程，ajax是异步获取数据
 3. 如果在mounted前调用的话，view层还没有渲染，只会让逻辑更加混乱

 - 如何将组件所有props传递给子组件？
 1. $props
 2. <User v-bind="$props" />

 - 如何自己实现 v-model
 ```vue
//Fu.vue
<template>
    <ZiComponent v-model="text" />
</template>

//ZiComponent.vue
<template>
    <input type="text" :value="text" @input="$emit("change",$event.target.value)">
</template>
<script>
export default {
    model:{
        prop:"text",
        event:"change"
    },
    props:{
        text:String
    }
}
</script>
```

- 多个组件有相同的逻辑，如何抽离？
mixin

- 何时要使用异步组件？
1. 加载大组件
2. 路由异步加载

- 何时需要使用keep-alive?
1. 缓存组件不需要重复渲染
2. 多个静态tab页切换
3. 优化性能

- 何时需要使用beforeDestory
1. 解绑自定义事件 bus.$off
2. 清除定时器
3. 解绑自定义的DOM事件，如window.scroll等

- slot

- vuex中的action和mutation的区别？
1. action中可以处理异步，mutation不可以
2. mutation做原子操作（每次只做一个操作）
3. action可以整合多个mutation

- vue-router
1. hash
2. H5 history (需要服务端支持)

- 如何配置vue-router异步加载
```js
routes:[
    {
        path:"/",
        component:()=>import("./pages/Home.vue")
    }
]
```

- 用vnode魔术一个DOM结构
```html
<!-- 真实DOM -->
<div id="div1" class="container">
    <p>vdom</p>
    <ul style="font-size:20px">
        <li onclick="clickhandle()">a</li>
    </ul>
</div>
```
**重点：** 模拟虚拟DOM
```js
// 虚拟DOM
{
    tag:"div",
    props:{
        className:"container",
        id:"div1"
    },
    children:[
        {
            tag:"p",
            children:"vdom"
        },
        {
            tag:"ul"m
            props:{
                style:"font-size:20px"
            },
            children:[
                {
                    tag:"li",
                    children:"a",
                    on:{
                        click:this.clickHandle
                    }
                }
            ]
        }
    ]
}
```

- 监听data变化的核心API是什么
1. Object.defineProperty

- Vue如何监听数组变化
1. 重新定义原型，重写push pop等方法，实现监听
2. Proxy可以支持监听数组变化

- 描述响应式原理

- diff算法的时间复杂度
1. O(n)
2. 在O(n^3)基础上做了一些调整

- 简述diff算法的过程
1. patch(elem,vnode)和patch(vnode,newVnode)
2. patchVnode, addVnodes, removeVnodes
3. updateChildren   (key的重要性)

- vue为何是异步渲染，$nextTick有什么用？
1. 异步渲染可以提高渲染性能
2. $nextTick是在DOM渲染完之后，触发回调

- vue常见性能优化方式
1. 合理使用v-show和v-if
2. 合理使用computed
3. v-for加key，避免和v-if同时使用
4. 自定义事件、DOM事件及时销毁，否则容易导致内存泄漏
5. 合理使用异步组件
6. 合理使用keep-alive
7. data层级不要太深
8. 使用vue-loader在开发环境做模版编译（预编译）
9. webpack层面的优化
10. 图片懒加载
11. 使用SSR

# vue3升级内容
- 全部用ts重写（响应式、VDOM、模版编译等）
- 性能提升，代码量减少
- 会调整部分API
- Proxy存在浏览器兼容问题，且不能polyfill

# Proxy实现响应式
- Proxy,Reflect一一对应
```js
new Proxy(data,{
    get(target,key,receiver){
        //只处理本身（非原型的）属性
        const ownKeys = Reflect.ownKeys(target)
        if(ownKeys.includes(key)){
            console.log("get",key)
        }
        return Reflect.get(target,key,receiver)
    },
    set(target,key,value,receiver){
        //重复的数据不处理
        if(value===target[key]){
            return true
        }
        //
        const ownKeys = Reflect.ownKeys(target)
        if(ownKeys.includes(key)){
            console.log("已有的key",key)
        }else{
            console.log("新增的key",key)
        }
        return Reflect.set(target,key,value,receiver)
    },
    deleteProperty(target,key){
        return Reflect.deleteProperty(target,key)
    }
})
```
- Reflect的作用
1. 和Proxy一一对应
2. 规范化，标准化，函数式
3. 会替代掉Object上的工具函数
```js
const obj={a:100,b:200}
Object.getOwnPropertyNames(obj) //["a","b"]
Reflect.ownKeys(obj) //["a","b"]
```
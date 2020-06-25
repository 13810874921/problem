## 解决yarn下载时网络超时的问题
npm config set registry https://registry.npm.taobao.org
npm config set disturl https://npm.taobao.org/dist

# 对象基本类型
String，Number，Boolean，Undefined，Null，Symbol
# 对象引用类型
Object，Array，Date，Function
# 对象类型的内存位置
基本类型保存在内存的栈中，先进后出，读写速度快
引用类型保存在内存的栈中
# 拷贝方式
>深拷贝，浅拷贝，直接赋值
直接赋值是使用当前的内存地址
- 数据结构简单的情况下（只有一级）
例如： **name:"小姐姐"**
深浅拷贝是一样的,只是使用当前内存栈的值

例如：**person:{name:"小姐姐"}**
深浅拷贝是一样的，只是新开辟了一个内存栈

例如：**person:{name:"小姐姐",language:['Chinese','English']}**
该例子里面我们加了引用类型的数据，所以
浅拷贝： 创建了新的栈，但引用的是同一个堆。
深拷贝： 创建了一个新的栈和新的堆

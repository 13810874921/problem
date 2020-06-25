// // your code goes here//1
// let text = "I? love ?? the ?great ? ?wall in ?beijing";
//  getString =() =>{
//   const regArr = text.match(/[\?][a-z]/g);
//   for (var i = 0; i < regArr.length; i++) {
//     var UpperCase = regArr[i][1].toUpperCase();
//     text = text.replace(regArr[i], UpperCase);
//   }
//   return text;
// };
// getString();
// text = text.replace(/\?/g, "").trim(/\s\s*/g, " ");
// setInterval(function(){
	
// })
// console.log(text);
// //模拟器暂时不支持window对象的setInterval和setTimeout，需要拿到电脑里去看
// //2-1 通过promise异步方式 ----- 用电脑执行
// /*
// let arr = [];
// let count = 0;
// let timer;
// let arr1 = [];
// timer = setInterval(() => {
//   count += 2;
//   timed(count);
// }, 0);
// let timed = (val) => {
//   return new Promise((resolve) => {
//     arr.push(val);
//     if (val >= 100) {
//       clearInterval(timer);
//       resolve(arr);
//     }
//   }).then((res) => {
//     arr1 = res;
//     console.log(arr1);
//     //...业务逻辑
//     // return arr1
//   });
// };
// // setTimeout(()=>{
// //     //宏任务
// //     console.log(arr1)
// // },100)
// */

// //模拟器暂时不支持window对象的setInterval和setTimeout，需要拿到电脑里去看
// //2-2 通过递归算法 ----- 用电脑执行
// /*
// function arrHandle() {
//   let arrr = [];
//   let count1 = 0;
//   let timer1;
//   function digui() {
//     timer1 = window.setInterval(() => {
//       arrr.push(count1);
//       if (count1 >= 100) {
//         clearInterval(timer1);
//         console.log("??", arrr);
//         // return arrr
//       } else {
//         count1 += 2;
//         clearInterval(timer1);
//         digui();
//       }
//     }, 1);
//   }
//   return digui;
// }
// //let bbb = arrHandle();
// //console.log(bbb)
// */
// //2-3 递归
// function Range(min=0,max=100,arr=[]){
//     if(min>0&&min%2===0) arr.push(min)
//     if(min==100) return arr
//     return Range(min+1,100,arr)
// }
// console.log(Range())


// //3
// //模拟器暂时不支持window对象的setInterval和setTimeout，需要拿到电脑里去看
// //封装通用时间调度器函数
// stepTimes=(fn,delay)=>{
//     return new Promise((resolve)=>{
//         timer2 = setTimeout(()=>{
//             fn()
//             resolve()
//         },delay)
//     })
// }
// function a(){
//     console.log("aaaaa")
// }
// function b(){
//     console.log("bbbbb")
// }
// function c(){
//     console.log("ccccc")
// }
// function d(){
//     console.log("ddddd")
// }

// //// 。。。写不出来了


var industry_list = [
  {
     "parent_ind" : "女装",
     "name" : "连衣裙"
  },
  {
     "name": "女装"
  },
  {
     "parent_ind" : "女装",
     "name" : "半身裙"
  },
  {
     "parent_ind" : "女装",
     "name" : "A字裙"
  },
  {
     "name": "数码"
  },
  {
    "parent_ind" : "数码",
     "name": "电脑配件"
  },
  {
    "parent_ind" : "电脑配件",
     "name": "内存"
  },
]
// const obj={}
// const obj1 = {}
// const obj2 = {}

// function transLateTree (list) {
//   list.forEach(item=>{
//     if(!item.parent_ind){
//       obj[Object.values(item)]={}
//       //{"女装":{},"数码":{}}
//     }
//     list.forEach(__item=>{
//       if(__item.parent_ind){
//         if(__item.parent_ind == item.name){
//           // console.log(__item)
//           obj1[Object.values(__item)[1]]={}
//         }
//         if(__item.name == item.parent_ind){
//           console.log(item)
//           obj2[Object.values(item)[1]]={}
//         }
        
//       }
//     })
    
//       // console.log(obj,obj1,obj2)
//       Object.keys(obj).map(it=>{
//         // console.log(it)
//         obj[it]=obj1
//         console.log('obj',obj)
//       })
//       // Object.keys(obj1).map(it=>{
//       //   // console.log(it)
//       //   obj1[it]=obj2
//       //   console.log('obj1===',obj1)
//       // })
//     // console.log(Object.values(obj)=Object.keys(obj1))
    
//   })



// }
// function child(list){
  
// }

// transLateTree(industry_list)
// console.log(obj1)//{ '连衣裙': {}, '半身裙': {}, 'A字裙': {}, '电脑配件': {}, '内存': {} }
// console.log(obj2)
// console.log(JSON.stringify(obj))//{"女装":{},"数码":{}}



let dataTree = {};
function convert_format(data){
  let arr = data;
	let count = 0;
	for (let i = 0; i < data.length; i++) {
		let parent = data[i].parent_ind;
		let name = data[i].name;
		if (!parent) {
			dataTree[name] = {}
			arr.splice(i - count, 1);
			count++;
		}
  }
  //深拷贝
	let arr1 = JSON.parse(JSON.stringify(arr));
	count = 0;
	for (let i = 0; i < arr.length; i++) {
		let parent = arr[i].parent_ind;
		let name = arr[i].name;
		if (dataTree[parent]) {
			dataTree[parent][name] = {};
			arr1.splice(i - count, 1);
			count++;
		}
	}
  //深拷贝
	arr = JSON.parse(JSON.stringify(arr1));
	count = 0
	for (let i = 0; i < arr1.length; i++) {
		let parent = arr1[i].parent_ind;
		let name = arr1[i].name;
		for (let j in dataTree) {
			if (dataTree[j][parent]) {
				dataTree[j][parent][name] = {}
				arr.splice(i - count, 1);
				count++;
			}
		}
  }
}
convert_format(industry_list)
console.log(dataTree);//{ '女装': { '连衣裙': {}, '半身裙': {} }, '数码': { '电脑配件': { '内存': {} } } }
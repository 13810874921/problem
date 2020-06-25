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
// 一、原始数据类型：

// string, number, boolean, null, undefined, enum, symbol
// enum: 枚举类型
// symbol: 符号类型
let a:string = '1'
let b:number = 2
let c:boolean = true
let d:undefined = undefined
let e:null = null

// null 和 undefined 是string, number, boolean的子类型，赋值不会报错
a = undefined
b = null


// 二、void：表示变量为空值或者函数无返回值

// 1. 规定变量 f 为空值
// var f:void = 123 // 报错
// 2. 规定函数 callBack 没有返回值
var callBack = function():void{
	// return 'abc' // 报错
}


// 三、any任意值：表示允许赋值为任意类型

var g:any = 1
g = '2'
g = false


// 四、类型推论：依照类型推论的规则推断出一个类型

// 1. 如果没有赋值初始值，且没有指定类型，则推断为any，不会被类型检查；
var h // 推论为any类型
h = 1
h = '2'
h = false
// 2. 如果赋值了初始值，且没有指定类型，则推论为赋值的类型
var i = 1 // 推论为number类型
// g = '2' // 报错


// 五、联合类型：赋值可以为多种类型中的一种

var j:string|number|boolean = '1'
j = 2
j = false
// 注意：只能访问联合类型内的所有类型共有的属性和方法
// console.log(j.length) // 报错
console.log(j.toString())


// 六、对象类型-接口 interface

// 描述类的一部分抽象行为，也可以描述对象的结构形状
// 接口一般首字母大写；赋值时，变量的形状必须和接口形状一致；接口中可以定义可选属性、只读属性、任意属性
// 1. 变量形状一致
interface Istate {
	name: string // 定义接口属性：对象，包含name属性
}
var obj1:Istate;
// obj1 = 1 // 报错
// obj1 = {} // 报错
// obj1 = {name: 123} // 类型错误，报错
obj1 = {name: '张三'} 

// 2. 属性设置为非必需
interface Istate2 {
	name: string,
	age: number,
}
var obj2:Istate2
// obj2 = {name: '李四'} // 没有定义age，报错
interface Istate3 {
	name: string,
	age?: number, // 问号表示age属性非必需
}
var obj3:Istate3
obj3 = {name: '李四'}

// 3. 属性个数不确定：
interface Istate4 {
	name: string,
	age?: number,
}
// var obj4:Istate4 = {
// 	name:'张三',
// 	sex: 'male' // 接口没有定义sex属性，报错
// }
interface Istate5{
	name: string,
	age?: number,
	[propName:string]: any // 可以动态添加键为string类型，值为any类型的属性（值必须是any，否则可能和已有属性类型冲突）
}
var obj5:Istate5 = {
	name:'张三',
	sex: 'male',
	birth: '1993-07-28'
}

// 4. 只读属性 readonly
interface Istate6{
	readonly name: string,
	age?: number,
}
var obj6: Istate6 = {
	name: '张三',
	age: 23,
}
// obj6.name = '李四' // 只读属性，不能更改
obj6.age = 24


// 七、数组类型 Array，三种写法：

// 1.  “类型 []” 表示法
var arr1:number [] = [1, 2, 3] 
var arr2:string [] = ['1', '2', '3']
// var arr3:boolean [] = [true, false, 1] // 1不是boolean类型，报错

// 2. 数组泛型 “Array<类型>” 表示法
var arr3: Array<any> = [1, '2', false]
// var arr4: Array<boolean> = [1, '2', false] // 1、'2'不是boolean类型，报错
interface Istate7 {
	name: string,
	age: number
}
var arr4: Array<Istate7> = [{name: '张三', age: 23}]

// 3. 接口表示法
// 规定变量的索引为number类型（即数组）
interface Iarray2 {
	[index: number]: string
}
// var arr5: Iarray2 = [1, '2', '3'] // 1不是string类型，报错
var arr6: Iarray2 = ['1', '2', '3'] 
interface Istate8 {
	name: string,
	age?: number
}
interface Iarray3 {
	[index: number]: Istate8 
}
var arr7:Iarray3 = [{name: '张三', age: 23}, {name: '李四'}]
// var arr8:Iarray3 = [{name: '张三', age: '23'}] // '23'不是number类型，报错


// 八、函数类型

// 1. 声明式类型的函数：约束参数和返回值
function fn1(name: string, age: number): boolean { // 约束参数name和age，约束返回值为boolean类型
	return true
}
// var res1:number = fn1('张三', '23') // 参数'23'不是number类型，且返回值不是number类型，报错
var res2: boolean = fn1('张三', 23)

// 2. 表达式类型的函数：
// 2-1. 约束参数和返回值
var fn3 = function (name: string, age: number, sex?: string): number{
	return age
}
// 2-2. 约束函数本身赋值的变量fn4
var fn4:(name: string, age?: number) => string = function (name: string = '张三', age?: number): string {
	return name
}
// 注意：fn4用匿名函数(name: string, age?: number) => string的形式约束参数name和age，返回值为string类型
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

// 3. 接口方式进行约束
interface Ifunction{
	(name: string, age: number): number // 约束变量为函数类型，约束参数name和age，返回值为number类型
}
var fn5: Ifunction = function (name: string, age: number = 23):number{
	return age
}

// 4. 对于联合类型的函数，可以采用重载方式
function fn6(value: string|number): string|number{
	return value
}
var res6 = fn6(123);
// var res7:number = fn6(123) // 返回值应为string和number联合类型，不能规定为number，报错
var res8:string|number = fn6(123) // 不会报错，但123是number，联合类型不合理，改为重载方式

function fn7(value: number): number;
function fn7(value: string): string;
function fn7(value: number|string): number|string { // 重载
	return value
}
let res9:number = fn7(123)
let res10:number|string = fn7("123")
let res11: string = fn7("123")
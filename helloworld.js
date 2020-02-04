// 一、原始数据类型：
// string, number, boolean, null, undefined, enum, symbol
// enum: 枚举类型
// symbol: 符号类型
var a = '1';
var b = 2;
var c = true;
var d = undefined;
var e = null;
// null 和 undefined 是string, number, boolean的子类型，赋值不会报错
a = undefined;
b = null;
// 二、void：表示变量为空值或者函数无返回值
// 1. 规定变量 f 为空值
// var f:void = 123 // 报错
// 2. 规定函数 callBack 没有返回值
var callBack = function () {
    // return 'abc' // 报错
};
// 三、any任意值：表示允许赋值为任意类型
var g = 1;
g = '2';
g = false;
// 四、类型推论：依照类型推论的规则推断出一个类型
// 1. 如果没有赋值初始值，且没有指定类型，则推断为any，不会被类型检查；
var h; // 推论为any类型
h = 1;
h = '2';
h = false;
// 2. 如果赋值了初始值，且没有指定类型，则推论为赋值的类型
var i = 1; // 推论为number类型
// g = '2' // 报错
// 五、联合类型：赋值可以为多种类型中的一种
var j = '1';
j = 2;
j = false;
// 注意：只能访问联合类型内的所有类型共有的属性和方法
// console.log(j.length) // 报错
console.log(j.toString());
var obj1;
// obj1 = 1 // 报错
// obj1 = {} // 报错
// obj1 = {name: 123} // 类型错误，报错
obj1 = { name: '张三' };
var obj2;
var obj3;
obj3 = { name: '李四' };
var obj5 = {
    name: '张三',
    sex: 'male',
    birth: '1993-07-28'
};
var obj6 = {
    name: '张三',
    age: 23
};
// obj6.name = '李四' // 只读属性，不能更改
obj6.age = 24;
// 七、数组类型 Array，三种写法：
// 1.  “类型 []” 表示法
var arr1 = [1, 2, 3];
var arr2 = ['1', '2', '3'];
// var arr3:boolean [] = [true, false, 1] // 1不是boolean类型，报错
// 2. 数组泛型 “Array<类型>” 表示法
var arr3 = [1, '2', false];
var arr4 = [{ name: '张三', age: 23 }];
// var arr5: Iarray2 = [1, '2', '3'] // 1不是string类型，报错
var arr6 = ['1', '2', '3'];
var arr7 = [{ name: '张三', age: 23 }, { name: '李四' }];
// var arr8:Iarray3 = [{name: '张三', age: '23'}] // '23'不是number类型，报错
// 八、函数类型
// 1. 声明式类型的函数：约束参数和返回值
function fn1(name, age) {
    return true;
}
// var res1:number = fn1('张三', '23') // 参数'23'不是number类型，且返回值不是number类型，报错
var res2 = fn1('张三', 23);
// 2. 表达式类型的函数：
// 2-1. 约束参数和返回值
var fn3 = function (name, age, sex) {
    return age;
};
// 2-2. 约束函数本身赋值的变量fn4
var fn4 = function (name, age) {
    if (name === void 0) { name = '张三'; }
    return name;
};
var fn5 = function (name, age) {
    if (age === void 0) { age = 23; }
    return age;
};
// 4. 对于联合类型的函数，可以采用重载方式
function fn6(value) {
    return value;
}
var res6 = fn6(123);
// var res7:number = fn6(123) // 返回值应为string和number联合类型，不能规定为number，报错
var res8 = fn6(123); // 不会报错，但123是number，联合类型不合理，改为重载方式
function fn7(value) {
    return value;
}
var res9 = fn7(123);
var res10 = fn7("123");
var res11 = fn7("123");

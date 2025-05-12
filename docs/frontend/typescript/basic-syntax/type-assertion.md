# 类型断言与非空断言

## 1. 类型断言

有时 TS 无法获取具体的类型信息，这个时候我们就需要使用 类型断言（ Type Assertions ）。比如我们通过document.getElementById，TS 只会知道函数返回HTMLElement，但并不知道它的具体类型：

```ts
const imgEl = document.getElementById("my-img") as HTMLImageElement;
```

注意：TS 只允许 类型断言转换为 更具体 或者 不太具体 （ any 或者 unknown ）的类型版本，此规则可以防止不可能的类型转换

## 2. 非空断言

非空断言（ Non-null Assertion ）是告诉编译器，我们知道某个表达式不能为 null 或 undefined。非空断言使用感叹号（ ! ）表示：


当我们编写下面的代码时，在执行 ts 的编译阶段会报错：
```ts
function printMessage(message?: string) {
  console.log(message.toUpperCase());
}
```
因为传入的message有可能是为 undefined 的，所以函数体内的代码是不能执行的。但是当我们传入的参数 可以确定是有值的，这个时候就可以使用 非空断言!，表示某个确定的标识符是有值的，跳过 TS 编译阶段对它的检测：

```ts
function printMessage(message?: string) {
  console.log(message!.toUpperCase());		// 也可以使用 ?. 
}
```

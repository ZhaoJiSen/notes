# 类型系统

TypeScript 的类型系统是用于在 JavaScript 中引入静态类型检查, 它允许开发者为变量、函数参数、返回值等指定类型, 从而在代码编写时就能捕获错误, 从而提高代码的可靠性和可维护性.

## 1. 基本类型

在 JavaScript 中，数据类型分为基本类型和引用类型。而在 TypeScript 中，除了
`null` 与 `undefined` 之外，其他所有类型都可以与 JavaScript 中的类型概念完全对应。

::: code-group

```ts [基本类型的注解使用]
let isStudent: boolean = true;
let age: number = 18;
let bigint: bigint = 1n;
let name: string = '张三';
let symbol: symbol = Symbol('symbol');
```

:::

::: tip 注意
在为变量指定基本类型时，**必须明确区分基本类型的写法与其对应的包装类写法**，因为二者在概念和意义上是完全不同的。使用包装类的写法，是表明该变量可以被赋予一个对象类型的值，而基本类型的写法，是表明该变量只能被赋予一个基本类型的值。

```ts [包装类写法]
let boolObject: Boolean = new Boolean(true);
let numberObject: Number = new Number(123);
let bigintObject: BigInt = new BigInt(123);
let stringObject: String = new String('Hello');
let symbolObject: Symbol = new Symbol('symbol');
```
:::

## 2. 引用类型

### 2.1 数组

### 2.2 元组

### 2.3 对象类型



<!-- ## 2. 接口

## 3. 类型别名

## 4. 联合类型

## 5. 交叉类型

## 6. 泛型

## 7. 类型推断

## 8. 类型断言 -->



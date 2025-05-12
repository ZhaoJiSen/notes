# 联合类型和交叉类型

TS 的类型系统允许我们使用多种运算符，从现有类型中构建新类型

## 1. 联合类型

联合类型（ Union Type ）是由两个或多个 其他类型组成的类型 。可以表示这些类型中的任何一个值，联合类型中的 每一个类型 被称为 联合成员（ union's members ）

```ts
const printId = (id: number | string) => {
  console.log("你得id是：", id);
}

printId(10);
printId("50");
```

给一个联合类型传入一个值只要保证是联合类型的某一个类型即可，但是当我们拿到这个值之后，我们要如何使用它 ？？？

比如我们拿到的值可能是一个 string 或者 number，如果是 number 那就不能对其调用 string 上的方法。对于这个问题我们需要使用 缩小联合 ，TS 可以根据缩小的代码结构，推断出更加具体的类型：

```ts
const printId = (id: number | string) => {
  if(typeof id === "string") {
    // 确定 id 是 string 类型
    console.log("你得id是：", id.toUpperCase());
  } else {
    // 确定是 number 类型
    console.log("你得id是：", id);
  }
}
```

## 2. 交叉类型

前面我们阐述了联合类型，来表示多种类型中的一个即可。另外一种类型合并就是 交叉类型（ Intersection Types ）。交叉类型使用 & 符号，表示需要同时满足多个类型的条件：

```ts
interface IKun {
    name: string;
    age: number;
}

interface ICoder {
    name: string;
    coding: () => void
}

const person: IKun & ICoder = {
    name: 'kun',
    age: 18,
    coding: () => {
        console.log('coding')
    }
}
```

既然交叉类型需要同时满足多个类型条件，那么当两种类型时基础类型时所声明的标识符是什么情况呢 ？？？

```ts
type newType = number & string;
```

表达的含义是 number 类型和 string 想要同时满足，但是不能可存在一个值同时满足即是 number 类型有是 string 类型，所以 newType 就是一个 never 类型

所以在开发中进行交叉时，通常是对 对象类型 进行交叉的

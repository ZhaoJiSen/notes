# 枚举

枚举将一组无序但是极度相关的数据集合在一起声明缓存，类似于对象，例如：

```ts
export const PageUrl = {
  Home_Page_Url: "url1",                        
  Setting_Page_Url: "url2",
  Share_Page_Url: "url3",
}
```

如果把🖕，替换为枚举，就是如下enum的形式：

```ts
enum PageUrl {
  Home_Page_Url = "url1",
  Setting_Page_Url = "url2",
  Share_Page_Url = "url3",
}

const home = PageUrl.Home_Page_Url;
```

在这种形式下，这些常量会被真正地约束在一个命名空间下，如果 没有声明枚举的值，他会默认使用数字枚举，并且从 0 开始，以 1 递增

```ts
enum Items {
  Foo,		// Items.Foo = 0
  Bar,		// Items.Bar = 1
  Baz			// Items.Baz = 2
}
```

如果只为某一个成员指定了枚举值，那么之前未赋值的成员仍然会使用从 0 地址的方式，之后的成员会从枚举值开始递增：

```ts
enum Items {
  Foo,		// 0 
  Bar = 599,
  Baz			// 600
}
```

## 枚举与对象的差异

枚举与对象的重要差异在于，对象是单向映射的，只能从键映射到值。而 枚举是双向映射的，既可以从枚举成员映射到枚举值，也可以从枚举值映射到枚举成员：

```ts
enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; 	// 0
const fooKey = Items[0];		  // "Foo"
```

要了解这一现象的本质，就需要查看一下通过 tsc 编译之后的 JS 代码：

```ts
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items[Items["Bar"] = 1] = "Bar";
    Items[Items["Baz"] = 2] = "Baz"; 
})(Items || (Items = {}));
console.log(Items.Bar);
```

首先需要明确的是：obj[k] = v的返回值即是 v ：因此obj[obj[k] = v] = k，本质上就是进行了obj[k] = v与obj[v] = k两次赋值

但是需要注意的是，仅有值为数字的枚举成员才能够进行这样的双向枚举，字符串仍然会只进行单次映射

```ts
enum Items {
  Foo,
  Bar = "BarValue",
  Baz = "BazValue"
}

console.log(Items.Bar);						// BarValue
console.log(Items["BarValue"]);		// undefined

// 编译结果，只会进行 键-值 的单向映射
"use strict";
var Items;
(function (Items) {
    Items[Items["Foo"] = 0] = "Foo";
    Items["Bar"] = "BarValue";
    Items["Baz"] = "BazValue";
})(Items || (Items = {}));
```

## 常量枚举

常量枚举（ Constant Enums ）是使用 const 声明的枚举，常量枚举会在编译阶段被删除，并且会在使用的地方被替换为对应的值，常量枚举的成员都是只读的，不能被修改

```ts
const enum Items {
  Foo,
  Bar,
  Baz
}

const fooValue = Items.Foo; // 0
```

与普通枚举的差异主要在访问性与编译产物。对于常量枚举，只能通过枚举成员访问枚举值（而不能通过值访问成员）。同时，在编译产物中并不会存在一个额外的辅助对象（如上面的 Items 空对象），对枚举成员的访问会被直接内联替换为枚举的值。以上的代码会被编译为如下形式：

```ts
var fooValue = 0 /* Items.Foo */; // 0
```

注：常量枚举的表现、编译产物还受到配置项--isolatedModules以及--preserveConstEnums等的影响

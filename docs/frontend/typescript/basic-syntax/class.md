# 类

类是拥有相同属性和方法的一系列对象的集合，是从包含该类所有对象中抽离的概念

一个类通常会包含：属性、方法、访问符、构造器

```typescript
class Person {
    // 类属性
    public name: string = 'ZhaoJisen';

    // 类方法
    public eat(): void {
        console.log('I can Eat')
    }

    // 构造器
    constructor(name: string) {
        this.name = name;
    }

    // 访问符
    get name(): string {
        return `${this.prop} + A`;
    }

    set name(value: string) {
        this.prop = `${value} + A`
    }
}
```



类上所定义的属性一定是用于描述这个类本身特征的



2-10





<h2 id="AVun2">类与类成员的类型签名</h2>


👆唯一需要注意的是，<font style="color:rgba(255,0,96,1);">setter 方法不允许进行返回值的类型标注</font>，可以理解为 setter 的返回值并不会被消费，它是一个只关注过程的函数。类的方法同样可以进行函数那样的重载，且语法基本一致



> **注意：**
>
> 1. 属性是可以设置初始值的
> 2. 默认的`**<font style="color:rgba(246,65,108,1);">strictPropertyInitialization</font>**`模式下属性必须是初始化的，否则编译时报错。该模式下实不希望属性初始化，可以使用`name!: string`语法
>



<h3 id="LzwvY">修饰符</h3>
TS 中可以为 Class 添加这些修饰符：`**<font style="color:#DF2A3F;">public</font>**`/`**<font style="color:#DF2A3F;">private</font>**`/`**<font style="color:#DF2A3F;">protected</font>**`/`**<font style="color:#DF2A3F;">readonly</font>**`。除开 readonly 以外其他三个都属于**访问性修饰符**，readonly 属于操作性修饰符。这些修饰符应用在成员名前：

```typescript
class Foo {
  private prop: string;

   constructor(inputProp: string) {
    this.prop = inputProp;
  }

  protected print(addon: string): void {
    console.log(`${this.prop} and ${addon}`)
  }

  public get propA(): string {
    return `${this.prop}+A`;
  }

  public set propA(value: string) {
    this.propA = `${value}+A`
  }
}
```



三种访问性修饰符👇：

:::info
public：在**类、类的实例、子类**中都能被访问

private：仅能在**类的内部**被访问

protected：仅能在**类与子类中**被访问

:::



当不显示的使用访问性修饰符，成员的访问性默认被标记为 public。👆，通过构造函数为类成员赋值的方式还是略显麻烦，需要声明类属性以及在构造函数中进行赋值。简单起见，可以**在构造函数中对参数应用访问性修饰符**：

```typescript
class Foo {
  constructor(public arg1: string, private arg2: boolean) { }
}

new Foo("linbudu", true)
```



而操作性修饰符 readonly 与 interface 中的 readonly 意义一致，都是<font style="color:rgba(246,65,108,1);">不希望外界可以任意的更改</font>



<h3 id="TSmBo">参数属性</h3>
参数属性是 TS 提供的一个特殊语法（ 语法糖 ）。当声明类中的各种属性时，不仅需要在类的内部声明属性并定义类型还需要在`constructor()`的参数与内部声明变量与赋值。当需要定义的属性较多时就会非常麻烦，因此 TS 提供了参数属性这样的语法糖



:::tips
**实现方式：在构造函数参数内部前**<font style="color:rgba(246,65,108,1);">添加一个 </font>**<font style="color:rgba(246,65,108,1);">修饰符</font>**<font style="color:rgba(246,65,108,1);">（ public、private、protected、readonly ）来创建参数属性，最终属性也会得到修饰</font>

:::

```typescript
class Person {
    constructor(
        public name: string,
        public age: number,
        public height: number) {
    }
}
```



<h3 id="SIlYK">静态成员</h3>
TS 中通过使用 **static** 关键字来表示一个成员为静态成员：

```typescript
class Foo {
  static staticHandler() { }

  public instanceHandler() { }
}
```



不同于实例成员，在<font style="color:rgba(255,0,96,1);">类的内部静态成员无法通过 this 来访问</font>，需要通过`<font style="color:rgba(255,0,96,1);">Foo.staticHandler</font>`这种形式进行访问，将代码👆转换，得到如下结果：

```javascript
var Foo = /** @class */ (function () {
    function Foo() {
    }
    Foo.staticHandler = function () { };
    Foo.prototype.instanceHandler = function () { };
    return Foo;
}());
```

可以看到<font style="color:#DF2A3F;">静态成员被直接挂载函数体上，而实例成员挂载在原型上</font>。**静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）**。而原型对象上的实例成员则会**沿着原型链进行传递**，也就是能够被继承



<h3 id="INSFc">继承、实现、抽象类</h3>
<h4 id="OXTx4">继承</h4>
面向对象一大特征就是继承，继承是使用多态的前提，TS 中也使用`extends`关键字实现继承：

```typescript
class Base { }

class Derived extends Base { }
```

对于👆这两个类`Base`成为 **基类 ( Base )**，而`Derived`被称为**派生类 ( Derived )。**



基类中的哪些成员能够被派生类访问，完全是由其访问性修饰符来决定的。在 **派生类中可以访问到使用 **`<font style="color:rgba(255,0,96,1);">public</font>`或`<font style="color:rgba(255,0,96,1);">protected</font>`**修饰符的基类成员**。除了访问以外，基类中的方法也可以在派生类中被覆盖，但我们仍然可以通过 **<font style="color:#DF2A3F;">super</font>** 访问到基类中的方法：

```typescript
class Base {
  print() { }
}

class Derived extends Base {
  print() {
    super.print()
    // ...
  }
}
```



<h4 id="HIokW">实现</h4>
在派生类中覆盖基类方法时，并不能确保派生类的这一方法一定能覆盖基类方法。因为基类中有可能不存在这个方法。TS 4.3 中新增`**<font style="color:rgba(255,0,96,1);">override</font>**`关键字，来确保派生类尝试覆盖的方法一定在基类中存在定义：

```typescript
	class Base {
  printWithLove() { }
}

class Derived extends Base {
  override print() {
    // ...
  }
}
```

![](https://cdn.nlark.com/yuque/0/2023/png/28960762/1698398504750-1f7f8642-919d-4928-a05e-cb5cfd7cbb1b.png)



<h4 id="IemUY">抽象类</h4>
抽象类是对<font style="color:rgba(255,0,96,1);">类结构与方法的抽象</font>，一个抽象类**描述了一个类成员中应当有哪些成员**，**一个抽象方法描述了这一方法在实际实现中的结构**。抽象类使用 abstract 关键字声明：

```typescript
abstract class AbsFoo {
  abstract absProp: string;
  abstract get absGetter(): string;
  abstract absMethod(name: string): string;
} 
```



抽象类中的成员也需要使用 abstract 关键字才会被视为抽象类成员，可以使用 <font style="color:#DF2A3F;">implements</font> 实现抽象类 

```typescript
class Foo implements AbsFoo {
    absProp: string = 'linbudu';

    get absGetter(): string {
        return "linbudu";
    }

    absMethod(name: string): string {
        return name;
    }
}
```



> 注意：
>
> 1.  必须完全实现这个抽象类的每一个抽象成员
> 2. TS 中 **无法声明静态的抽象成员**
>



<h3 id="VvaIU">抽象类与接口</h3>
抽象类的本质就是描述类的结构，而接口 interface 也可以声明类的结构，同样也需要使用 implements 实现：

```typescript
interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethod(input: string):stirng;
}

class Foo implements FooStruct {
  absProp: string = "linbudu"

  get absGetter() {
    return "linbudu"
  }

  absMethod(name: string) {
    return name
  }
}
```



👆，让类去实现了一个接口。这里接口的作用和抽象类一样，都是**描述这个类的结构**。除此以外，还可以使用 **Newable Interface** 来描述一个类的结构（类似于描述函数结构的 **Callable Interface**）：

```typescript
class Foo { }

interface FooStruct {
  new(): Foo
}

declare const NewableFoo: FooStruct;

const foo = new NewableFoo();
```



<h3 id="USmP8">类的类型</h3>
类本身也是可以作为一种数据类型的。**类 **可以<font style="color:rgba(246,65,108,1);">创建类对应的 </font>**<font style="color:rgba(246,65,108,1);">实例</font>**，又<font style="color:rgba(246,65,108,1);">可以作为这个 </font>**<font style="color:rgba(246,65,108,1);">实例的类型</font>**，类**还可以当做一个 构造签名 的函数**：

```typescript
class Person {}

// 类可以创建类对应的实例 p
// 类又可以作为 p 的类型
const p: Person = new Person();

// Person 类可以作为构造签名
function printPerson (ctor: new () => void): void{}
printPerson(Person)
```




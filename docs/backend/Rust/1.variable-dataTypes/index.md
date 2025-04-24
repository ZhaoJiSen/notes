### 1. 变量与不可变性

Rust 中，声明变量使用关键字 `let`，Rust 支持类型推断，但也可以手动标注类型。

例如:

```rust
let x = 1;        // 类型推断为 i32
let y: i32 = 2;   // 手动标注类型为 i32
```

Rust 中，变量默认是不可变的，不可变性是 Rust 实现其可靠性和安全性目标的关键。同时，如果希望一个变量是可变的，那么可以使用关键字 `mut` 来声明。

例如:

```rust
fn main() {
  let mut x = 1; // [!code focus]

  x = 2;  // [!code focus]

  println!("x = {}", x);
}
```

> [!TIP] 常量命名规范
> 在 Rust 中，变量名遵循蛇形命名法（snake_case），例如：`my_variable`，而枚举和结构体等类型名遵循帕斯卡命名法（PascalCase），例如：`MyEnum`。

#### 1.1 变量遮蔽

Rust 变量还有一个特性叫做：**变量遮蔽（Variable Shadowing）** ，即：允许在同一作用域内声明一个与之前变量同名的变量，但新变量会遮蔽旧变量，直到新变量离开作用域。

例如:

```rust
fn main() {
  let x = 1;

  let x = x + 1;

  println!("x = {}", x);
}
```

> [!IMPORTANT] 变量遮蔽与变量可变性
> 变量遮蔽与变量可变性是两个不同的概念。变量可变性是指变量是否可以被重新赋值，而变量遮蔽是指在同一作用域内声明一个与之前变量同名的变量，但新变量会遮蔽旧变量。**变量遮蔽不仅可以修改变量的值、类型，还可以修改变量的名称**。

#### 1.2 下划线前缀

对于未使用的变量，Rust 编译器会给出警告，为了避免这种情况，可以使用下划线前缀来忽略未使用的变量。

例如:

```rust
let _x = 1;
```

### 1.3 常量

Rust 中，定义常量使用关键字 `const`，**常量在声明时必须显式标注类型，且常量值会在编译期确定（编译期进行内存分配）**。常量默认规定全部大写，并使用下划线分隔单词。

例如:

```rust
const MAX_POINTS: u32 = 100000;
```

> [!IMPORTANT] 常量作用域
> 常量的作用域是块级作用域，它们只能在声明它们的作用域内可见

### 1.4 静态变量

静态变量是与常量相反的，声明静态变量使用关键字 `static`，静态变量在运行时进行内存分配

Rust 中，定义静态变量使用关键字 `static`，**静态变量在声明时必须显式标注类型，且静态变量值在编译期确定**。静态变量名必须全部大写，并使用下划线分隔单词。

静态变量并不是不可变的，可以使用 unsafe 修改，静态变量的生命周期是整个程序运行期间。

例如:

```rust
static HELLO_WORLD: &str = "Hello, world!";
static mut MUT_HELLO_WORLD: &str = "MUT Hello, world!";

fu main(){
  println!("{HELLO_WORLD}");
    
  unsafe {
      MUT_HELLO_WORLD = "mutable world!";
  }

  // 在 unsafe 外是无法打印 MUT_HELLO_WORLD 的
}
```

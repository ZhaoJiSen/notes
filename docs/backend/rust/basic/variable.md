# 变量与常量

## 1. 变量

Rust 中，声明变量使用关键字 `let`：

```rust
let x = 1;  // 会被自动推断为 i32 
```

多数情况下，Rust 可以自动推断出所声明变量的类型，因此无需手动标注类型

### 1.1 变量的不可变性

与其他语言所谓变量的含义不同的是，Rust 中的 "变量" 实则是一种常量，在声明之后去修改该变量的值是不被允许的，例如：

```rust
let x = 1;

x = 2;    // 错误信息：无法多次将新值赋给不可变变量
```

在 Rust 中如果想让一个 "变量" 变得可变，那么需要使用关键字 `mut` （mutable），例如：

```rust
let mut x = 1;

x = 2     // 合法且有效
```

> [!TIP] 常量命名规范
> 在 Rust 中，变量名遵循蛇形命名法（snake_case），例如：`my_variable`，而枚举和结构体等类型名遵循帕斯卡命名法（PascalCase），例如：`MyEnum`。

### 1.2 变量遮蔽

所谓 "变量遮蔽"，指的是在同一个作用域下允许声明一个与之前变量相同名称的变量，但新变量会遮蔽旧变量，直到新变量离开作用域，例如:

```rust
let x = 1;

println!("Ole Value {}", x)   // 1

let x = 2;

println!("New Value {}", x)   // 2
```

### 1.3 变量的作用域

与其他语言类似，变量的作用域（声明位置）决定了变量在代码中的可见性和生命周期。在 Rust 中常见的变量可以声明的位包括：函数内部、代码块内部、控制流语句和闭包中

::: code-group

```rust [函数内部]
fn example() {
    let x = 5;
    let mut y = 10;
}
```

```rust [代码块内部]
{
    let y = 10;
}
```

```rust [控制流语句]
fn main() {
    // if 语句中
    if true {
        let condition_var = 1;
    }
    
    // 循环中
    for i in 0..5 {
        let loop_var = i * 2;
    }
    
    // match 语句中
    let value = 5;
    match value {
        x if x > 0 => {
            let positive_var = x;
        }
        _ => {}
    }
}
```

```rust [闭包中]
fn main() {
    let closure = |x: i32| {
        let closure_var = x * 2; // 在闭包内声明变量
        closure_var
    };
}
```
:::

::: tip 注意 
变量不可在全局作用域下声明
:::

### 1.4 下划线前缀

对于未使用过的变量，在 Rust 构建过程中会抛出警告，为避免这种情况，可以使用下划线前缀来忽略未使用的变量:

```rust
let _x = 1;
```

## 2. 常量

Rust 中的常量使用关键字 `const` 声明，**在声明时就必须要指定常量的类型以及常量的值**

```rust
const MAX_POINTS: u32 = 100000;
```

::: tip 注意：
1. 常量是在 **编译时** 就被确定下来的值，在程序运行时是固定的，因此常量本身并不占用内存
2. 不可以使用 `mut` 进行修饰
3. 常量的命名方式通常为：全大写字母加 _ 的形式
:::

### 2.1 常量的作用域

常量可在任意的作用域内进行声明，例如：

```rust
// global
const GLOBAL_CHAT: u32 = 25

fn main() {
  const SPECIAL_NUMBER: i32 = 24
}
```

## 3. 静态变量

静态变量是一种特殊的变量，它在程序的整个生命周期中都存在，有固定的内存地址，**在运行时进行其内存分配**

静态变量使用关键字 `static` 进行修饰，声明规范以及命名规范与常量保持一致

```rust
static GLOBAL_COUNT: i32 = 0;

fn main() {
    // GLOBAL_COUNT 在程序启动时就已经存在
    println!("{}", GLOBAL_COUNT);
    
    other_function();
    // GLOBAL_COUNT 在这里仍然存在
} // 程序结束时 GLOBAL_COUNT 才被销毁

fn other_function() {
    // 在任何函数中都可以访问 GLOBAL_COUNT
    println!("{}", GLOBAL_COUNT);
}
```

::: tip 
静态变量的地址在程序运行期间永远不变，局部变量的地址在每次函数调用时可能不同
:::


#### 3.2 不安全的可变静态变量

静态变量，也是可以被 `mut` 所修饰的。使用 `mut` 修饰后的静态变量可以被修改，但访问时需要使用 `unsafe` 块

```rust
static mut MUTABLE_COUNTER: i32 = 0;

fn increment_counter() {
    unsafe {
        MUTABLE_COUNTER += 1;  // 需要 unsafe 块
    }
}

fn main() {
    increment_counter();
    
    unsafe {
        println!("计数器: {}", MUTABLE_COUNTER);
    }

    // unsafe 外是无法打印 MUTABLE_COUNTER 的
}
```

::: details 为什么叫 "不安全"
1. 数据竞争问题
2. 内存安全问题
3. 别名问题
:::

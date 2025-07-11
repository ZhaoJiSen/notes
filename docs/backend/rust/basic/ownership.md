# 所有权

在 Rust 中内存的管理通过所有权机制来实现的，编译器会在编译时检查所有权规则，确保内存安全。这种检查只发生在编译期间，因此在程序运行期间不会产生任何性能上的损失

## 1. 堆与栈

对于 Rust 这样的系统编程语言，值是位于栈上还是堆上非常重要，因为这会影响程序的行为和性能

### 1.1 栈

栈按照顺序存储值并以相反顺序取出值，这也被称作 **后进先出**。增加数据叫做进栈，移出数据则叫做出栈。栈中的所有数据都必须占用已知且固定大小的内存空间

### 1.2 堆

与栈不同，对于大小未知或者可能变化的数据，需要将它存储在堆上

::: tip 在堆上分配内存
当向堆上放入数据时，需要请求一定大小的内存空间。操作系统就会在堆的某处找到一块足够大的空位，并把它标记为已使用，然后返回一个表示该位置地址的指针，该过程被称为在堆上分配内存，有时简称为 “分配”(allocating)。最后，该指针被推入栈中，由于指针的大小是已知且固定的，因此在后续使用过程中，可直接通过栈中的指针，来获取数据在堆上的实际内存位置，进而访问该数据
:::

### 1.3 性能区别

**在栈上分配内存比在堆上分配内存要快**，因为入栈时操作系统无需进行函数调用（或更慢的系统调用）来分配新的空间，只需要将新数据放入栈顶即可。相比之下，在堆上分配内存则需要更多的工作，这是因为操作系统必须首先找到一块足够存放数据的内存空间，接着做一些记录为下一次分配做准备，如果当前进程分配的内存页不足时，还需要进行系统调用来申请更多内存。 因此，处理器在栈上分配数据会比在堆上分配数据更加高效。

## 2. 所有权原则

::: tip Rust 中的所有权基于以下规则
1. 每一个值都被一个变量所拥有，该变量被称为值的所有者
2. 一个值同时只能被一个变量所拥有，或者说一个值只能拥有一个所有者
3. 当所有者（变量）离开作用域范围时，这个值将被丢弃（drop）
:::

### 2.1 转移所有权

先来看一段代码：

```rust
let x = 5
let y = x
```

这段代码并没有发生所有权的转移，因为在 Rust 中大部分类型都实现了 `Copy trait` ，整个过程中的赋值都是通过值拷贝的方式完成（发生在栈中）。因此 `x` 可以被复制到 `y` 中，而不会发生所有权转移。

::: details 实现 Copy trait 的类型：
1. 所有整数类型
2. 布尔类型
3. 所有浮点数类型
4. 字符类型
5. 元组，当且仅当其包含的类型也都实现 Copy trait 时
6. 引用类型：&T (不可变引用)
:::

:::details 没有实现 Copy trait 的类型
1. String
2. Vec\<T\>
3. 自定义结构体和枚举
:::

:::tip 注意：
如果一个类型实现了 Drop trait（自定义析构函数，可以理解为超出作用域自动销毁），那么它就不能实现 Copy trait
:::

在看这段代码：

```rust
let s1 = String::from("hello");
let s2 = s1;
```

::: details 从分析的角度来说
由于 `String` 类型是一个复杂类型，由存储在栈中的堆指针、字符串长度、字符串容量共同组成。其中最重要的是堆指针，因为该指针指向于在堆上分配的内存区域。

对于代码中的赋值语句存在两种情况
1. **拷贝 `String` 和存储在堆上的字节数组：** 如果该语句是拷贝所有数据(深拷贝)，那么无论是 `String` 本身还是底层的堆上数据，都会被全部拷贝，这对于性能而言会造成非常大的影响
2. **只拷贝 `String` 本身：** 这样的拷贝非常快，因为在 64 位机器上就拷贝了 8 字节的指针、8 字节的长度、8 字节的容量，总计 24 字节，但是带来了新的问题，在所有权规则中其中一条就是：一个值只允许有一个所有者，而现在这个值（堆上的真实字符串数据）有了两个所有者：s1 和 s2。

即使假定一个值可以拥有两个所有者，那么当变量离开作用域后，Rust 会自动调用 drop 函数并清理变量的堆内存。不过由于两个 String 变量指向了同一位置。这就有了一个问题：当 s1 和 s2 离开作用域，它们都会尝试释放相同的内存。那么就会导致 **二次释放（double free）**的问题。两次释放（相同）内存会导致内存污染，它可能会导致潜在的安全漏洞。

因此，Rust 这样解决问题：当 s1 被赋予 s2 后，Rust 认为 s1 不再有效，因此也无需在 s1 离开作用域后 drop 任何东西，这就是把所有权从 s1 转移给了 s2，s1 在被赋予 s2 后就马上失效了。

:::

::: details 简单来说
由于 `String` 并未实现 `Copy trait` 因此发生了所有权的移动，导致 `s1` 不再有效，`s2` 是新的所有者。
:::

### 2.2 clone 

Rust 永远也不会自动创建数据的 “深拷贝”。因此，任何自动的复制都不是深拷贝。如果确实需要深度复制 `String` 中堆上的数据，而不仅仅是栈上的数据，可以使用一个叫做 `clone` 的方法。

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2);
```

:::tip 注意：
对于执行较为频繁的代码（热点路径），使用 clone 会极大的降低程序性能，需要小心使用！
:::


### 2.3 函数传值与返回

将值传递给函数，一样会发生 **移动** 或者 **复制**

```rust
fn main() {
  let s = String::from("hello");

  takes_ownership(s);             // s 的值移动到函数里 ...

  let x = 5;

  makes_copy(x); 

   // 这里，s 不再有效，不可访问
   println!("{}", s);  // [!code error]
   // x 的值被复制到函数中，因此 x 可以继续使用
   println!("{}", x);
}

fn takes_ownership(some_string: String) {
    println!("{}", some_string);
}

fn makes_copy(some_integer: i32) {
    println!("{}", some_integer);
}
```

同样的，函数返回值值也有所有权

```rust
fn main() {
    // gives_ownership 将返回值移给 s1
    let s1 = gives_ownership();

    // s2 进入作用域
    let s2 = String::from("hello");

    // s2 被移动到 takes_and_gives_back 中,也将返回值移给 s3
    let s3 = takes_and_gives_back(s2);

    println!("s1 = {}, s3 = {}", s1, s3);
}

fn gives_ownership() -> String {
    let some_string = String::from("hello");

    // 返回 some_string 并移出给调用的函数
    some_string
}

fn takes_and_gives_back(a_string: String) -> String {
    // 返回 a_string 并移出给调用的函数
    a_string  
}
```

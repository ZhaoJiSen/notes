# 引用与借用

::: tip
在 Rust 中获取变量的引用称之为借用（borrowing）
:::

## 1. 引用与解引用

常规引用是一个指针类型，指向了对象存储的内存地址。使用符号 `&` 来表示引用，使用符号 `*` 来表示解引用

```rust
fn main() {
    let x = 5;
    let y = &x;

    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

## 2. 不可变引用

所谓不可变引用指的是一种允许以只读方式访问数据的引用，只能读取数据，不能修改数据，上面代码中定义的 `&x` 就是一个不可变引用。通过不可变引用就可以在保持所有权不变的情况下，允许其他代码读取数据。

```rust
fn main() {
    let s1 = String::from("hello");

    let len = calculate_length(&s1);

    println!("The length of '{}' is {}.", s1, len);
}

fn calculate_length(s: &String) -> usize {
    s.len()
}
```

上述代码通过将不可变引用 `&s1` 作为参数传递给 `calculate_length` 函数，由于传递的是一个引用类型的 `String` 因此函数参数为 `&String` 类型。在函数中通过 `s.len()` 获取了字符串的长度并返回。

## 3. 可变引用

如果想要获取引用对数据的修改权限，那么就需要使用可变引用。可变引用只需要在引用符号 `&` 前添加 `mut` 关键字即可。

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);

    // 输出: hello, world
    println!("{}", s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

::: tip 注意：
对同一数据，在同一作用域内，只能有一个可变引用，且在有可变引用时，不能有任何不可变引用
:::

```rust
let mut s = String::from("hello");

let r1 = &mut s;
let r2 = &mut s;

// 报错：error[E0499]: cannot borrow `s` as mutable more than once at a time
println!("{}, {}", r1, r2); // [!code error]
```

错误的原因在于：第一个可变借用 r1 必须要持续到最后一次使用的位置 println!，而在 r1 创建和最后一次使用之间，我们又尝试创建第二个可变借用 r2。

> [!IMPORTANT] 这种做法的好处在于：
> 能够有效的避免由于数据竞争导致的未定义行为，这也就很好解释了为什么同一个作用域内对同一个变量的可变引用与不可变引用不能同时存在

## 4. 悬垂引用

悬垂引用也叫做悬垂指针，意思为指针指向某个值后，这个值被释放掉了，而指针仍然存在，其指向的内存可能不存在任何值或已被其它变量重新使用。在 Rust 中编译器可以确保引用永远也不会变成悬垂状态：当你获取数据的引用后，编译器可以确保数据不会在引用结束前被释放，要想释放数据，必须先停止其引用的使用。

```rust
fn main() {
    let reference_to_nothing = dangle();
}

fn dangle() -> &String {  // [!code error] error[E0106]: missing lifetime specifier
    let s = String::from("hello");

    &s
}
```

根据 Rust 的所有权规则，局部变量在函数作用域结束时会被销毁（s 会被 drop，堆上的数据也会被释放）。因此当 dangle 函数返回时，s 已经被销毁，引用 &s 指向的内存已经无效

# 字符串与切片

## 切片

对于字符串而言，切片就是对 `String` 类型中某一部分的引用，类型标识是 `&str`。创建切片使用方括号包括起始和结束索引，左闭右开。

```rust
let s = String::from("hello world");

let hello = &s[0..5];
let world = &s[6..11];

println!("{}", hello);  // hello
println!("{}", world);  // world
```

Rust 的 `..` Range 语法中，如果起始索引为 0，可以省略不写，如果结束索引是字符串最后一个字符，可以省略不写。

```rust
let s = String::from("hello world");

let hello = &s[..5];
let world = &s[6..];
```

::: tip 注意：
在对字符串使用切片语法时需要格外小心，切片的索引必须落在字符之间的边界位置，也就是 UTF-8 字符的边界，例如中文在 UTF-8 中占用三个字节，下面的代码就会崩溃：

```rust
let s = "中国人";
let a = &s[0..2];

println!("{}", a);
```
因为程序只取 s 字符串的前两个字节，但是本例中每个汉字占用三个字节，因此没有落在边界处，也就是连 中 字都取不完整，此时程序会直接崩溃退出，如果改成 &s[0..3]，则可以正常通过编译。

:::

切片是一个读取操作，而不是写入操作，例如下面的代码会报错：

```rust
fn main() {
    let mut s = String::from("hello world");

    let word = first_word(&s);

    s.clear(); // error!

    println!("the first word is: {}", word);
}

fn first_word(s: &String) -> &str {
    &s[..1]
}
```
对于这段代码，Rust 编译器会报错，原因是违背了所有权规则，在 `first_word` 传入了 s 的不可变引用，然后在 `first_word` 中创建一个新的引用 `&str`，指向原数据的一部分。`first_word` 函数返回的 `&str` 切片引用的生命周期与输入参数 s 的生命周期相关联。这意味着只要 word 变量存在，就相当于对原字符串 s 保持着不可变借用，而不可变借用与可变借用不能同时存在，因此报错。

## 字符串

Rust 中的字符串是 UTF-8 编码，也就意味着字符串中的字符所占的字节数是变化的(1 - 4)。

Rust 在语言级别，只有一种字符串类型：`str`，它通常是以引用类型 `&str` 出现，也就是上文提到的字符串切片。虽然语言级别只有上述的 `str` 类型，但是在标准库里，还有多种不同用途的字符串类型，其中使用最广的即是 `String` 类型。

::: details 其他类型的字符串类型
Rust 的标准库还提供了其他类型的字符串，例如 OsString， OsStr， CsString 和 CsStr 等，他们中以 `String` 和 `Str` 结尾的类型分别对应的是具有所有权和被借用的变量。
:::

### String 与 &str 的转换

将 String 转换成 `&str` 可以直接通过取引用的方式进行转换

```rust
fn main() {
    let s = String::from("hello,world!");

    say_hello(&s);
    say_hello(&s[..]);
    say_hello(s.as_str());
}

fn say_hello(s: &str) {
    println!("{}",s);
}
```

而从 `&str` 转换成 `String` 可以使用 `to_string()` 方法，也可以直接使用 `String::from()` 进行包裹。

```rust
fn main() {
    let s = String::from("hello,world!");
    let s1 = "hello,world".to_string()
}
```

### 字符串索引

**在 Rust 中，字符串索引是基于字节索引的，而不是基于字符索引的，因此无法通过索引的方式获取字符串中的某个字符。**

```rust
let s1 = String::from("hello");
let h = s1[0];  // [!code error] `String` cannot be indexed by `{integer}`
```

>[!IMPORTANT]
>字符串的底层的数据存储格式实际上是[ u8 ]，一个字节数组。对于 let hello = String::from("Hola"); 这行代码来说，Hola 的长度是 4 个字节，因为 "Hola" 中的每个字母在 UTF-8 编码中仅占用 1 个字节

### 操作字符串

由于 `String` 是可变字符串，因此可以对它进行修改、添加、删除等方法

#### Push

在字符串尾部可以使用 `push()` 方法追加字符 char，也可以使用 `push_str()` 方法追加字符串字面量。这两个方法都是**在原有的字符串上追加，并不会返回新的字符串**。由于字符串追加操作要修改原来的字符串，则该字符串必须是可变的，即字符串变量必须由 `mut` 关键字修饰。

```rust
fn main() {
    let mut s = String::from("Hello ");

    s.push_str("rust");
    println!("追加字符串 push_str() -> {}", s);

    s.push('!');
    println!("追加字符 push() -> {}", s);
}
```

#### Insert

可以使用 `insert()` 方法插入单个字符 char，也可以使用 `insert_str()` 方法插入字符串字面量，与 push() 方法不同，这俩方法需要传入两个参数，第一个参数是字符（串）插入位置的索引，第二个参数是要插入的字符（串），索引从 0 开始计数，如果**越界则会发生错误**。由于字符串插入操作要修改原来的字符串，则该字符串必须是可变的，即字符串变量必须由 `mut` 关键字修饰。

```rust
fn main() {
    let mut s = String::from("Hello rust!");

    s.insert(5, ',');
    println!("插入字符 insert() -> {}", s);
    
    s.insert_str(6, " I like");
    println!("插入字符串 insert_str() -> {}", s);
}
```

#### Replace

#### Delete

#### 拼接

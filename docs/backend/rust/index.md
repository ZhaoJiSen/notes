### 1. 安装

在 MacOS、Linux 等类 Unix 系统下安装 Rust 可以直接使用安装命令

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

常用的命令:

1. 更新 Rust: `rustup update`
2. 卸载 Rust: `rustup uninstall`
3. 查看 Rust 版本: `rustc --version`
4. 查看 Rust 安装位置: `rustc --print sysroot`
5. 添加组件: `rustup component add <component>`

### 2. 编译器与包管理工具

#### 2.1 编译器

Rust 的官方编译器是 `rustc`，用于将 Rust 源代码编译成 **可执行文件** 或 **库文件**。

例如:

```rust
fn main() {
    println!("Hello, world!");
}
```

使用 `rustc` 编译:

```bash
rustc main.rs
```

编译后会生成一个 `main` 可执行文件，可直接运行: `./main`。

也可以使用命令: `rustc <filename.rs> -o <output_filename>` 来编译 Rust 源代码文件并指定输出文件名称。

#### 2.2 包管理工具

Rust 的包管理工具是 `Cargo`，用于管理 Rust 项目。在使用 Cargo 编译项目时，也是隐式的在调用 `rustc` 编译器。

:::tip Cargo 的常见命令:

1. 创建新项目: `cargo new <project_name>`
2. 创建一个库项目: `cargo new --lib <project_name>`
3. 构建项目: `cargo build --release`
4. 运行项目: `cargo run`（包含两部分：构建和执行二进制文件）
5. 发布项目: `cargo publish`
6. 查看版本: `cargo --version`

:::

通过 `cargo new` 命令创建项目时，会自动生成一个 `Cargo.toml` 文件，用于管理项目依赖。该文件包含以下内容:

```toml
<!-- 项目配置 -->
[package]
name = "project_name"
version = "0.1.0"
edition = "2021"

<!-- 依赖配置 -->
[dependencies]

<!-- 构建依赖（较少使用） -->
[build-dependencies]

<!-- 开发依赖 -->
[dev-dependencies]
```

### 3. Rust 库

Rust 第三方库网站 [https://crates.io/](https://crates.io/)，可以通过修改 `Cargo.toml` 文件，添加依赖。

例如:

```toml
[dependencies]
serde = "1.0.212"
```

另一种安装方式是使用 Cargo 的插件 `cargo-edit` 来安装。

安装命令：

```bash
cargo install cargo-edit
```

安装后就可以直接通过 `cargo add <package_name>` 来安装依赖。

例如:

```bash
cargo add serde@1.0.212  # 安装指定版本的 serde
cargo add --dev serde    # 安装开发依赖
cargo add --build serde  # 安装构建依赖
cargo remove serde       # 移除依赖
```

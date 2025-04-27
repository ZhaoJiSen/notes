### 1. 安装

在 MacOS 系统下安装 Go 可以直接通过 HomeBrew 安装命令

```bash
brew install go
```

下载并配置完环境变量后，可通过输入命令 `go env` 来查看和设置 Go 相关的环境变量和配置信息

1. GOROOT：Go 语言的安装目录路径。它指向 Go 的标准库、工具链
2. GOPATH：工作目录，工程代码存放的位置，此目录下，一个文件夹就是一个工程
3. GOPROXY：指定 Go 模块的代理地址


### 2. 编译器与包管理工具

Go 语言的编译器就是 go 命令本身通过 `go build` 和 `go run` 等子命令来编译、运行代码。

例如：

```go
package main

import "fmt"

func main() {
  fmt.Println("Hello World")
}
```

使用 `go build <filename>` 来进行代码编译：
```bash
go build main.go
```

编译后会生成一个 `main` 可执行文件，可直接运行: `./main`。可以直接使用 `go run filename` 来直接编译且运行


#### 2.2 包管理工具

Go 的包管理工具也集成在 go 命令中

:::tip go mod 的常见命令:

1. 初始化新模块：`go mod init`
2. 整理依赖：`go mod tidy`
3. go mode
4. 
5. 
6. 查看版本: `cargo --version`
:::

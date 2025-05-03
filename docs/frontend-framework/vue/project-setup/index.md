# 项目搭建

## 1. Monorepo

Monorepo 是一种项目管理方式，可以将多个项目放在同一个代码仓库中进行统一管理。常见的 Monorepo 工具有 `Lerna`、`Nx`、`pnpm workspace`、`Yarn workspace` 等。

Vue3 的源码就采用了 Monorepo 的架构方式，具体结构如下：

<!-- ```txt
core
├─ packages
│  ├─ compiler-core   // 核心编译器
│  ├─ compiler-dom    // dom编译器
│  ├─ compiler-sfc    // vue单文件编译器
│  ├─ compiler-ssr    // 服务端渲染编译
│  ├─ dts-test  //测试Typescript类型以确保类型保持为预期类型
│  ├─ global.d.ts  // TypeScript声明文件
│  ├─ reactivity  // 响应式模式，可以和其它框架配合使用
│  ├─ reactivity-transform  // 该功能现在被标记为不推荐使用，并将从Vue核心中删除,提案已经被放弃。
│  ├─ runtime-core // 运行时核心实例相关代码
│  ├─ runtime-dom  // 运行时dom相关API、属性、事件处理  
│  ├─ runtime-test  // 运行时测试相关代码
│  ├─ server-renderer // 服务器渲染
│  ├─ sfc-playground // 单文件组件在线调试器
│  ├─ shared // 内部工具库，不对外暴露
│  ├─ size-check // 测试代码体积
│  ├─ template-explorer // 用于调试编译器输出的开发工具
│  ├─ vue //面向公众的完整版本，包含运行时和编译器
│  └─ vue-compat //是Vue 3的一个构建，它提供了可配置的Vue 2兼容行为。
``` -->


> [!TIP] Monorepo 架构的优势在于：
> 1. 统一的依赖管理：所有项目共享依赖，避免重复安装和版本不一致的问题
> 2. 代码共享和复用：不同项目之间可以方便地引用和复用代码
> 3. 集中化的工具链配置：如统一的 lint、测试、构建等配置，减少重复劳动


## 2. 初始化项目

在创建用于存放所有 Vue 代码的文件夹后，先执行 `pnpm init` 初始化项目。接着，创建一个名为 `pnpm-workspace.yaml` 的文件：

```shell
touch pnpm-workspace.yaml
```

在该 yaml 文件中，通过 `packages` 关键字声明需要被管理的子项目，例如：

::: code-group
```yaml [pnpm-workspace.yaml]
packages:
  # 管理 packages 目录下的所有子项目
  - "packages/*"
``` 
:::

> [!IMPORTANT] 注：
> pnpm 从 v7 版本开始，在 Monorepo 项目的根目录下默认就会以 workspace root 的身份安装依赖，不再强制要求加 -w 或 --workspace-root 参数。直接在根目录下运行 pnpm add xxx，pnpm 会自动识别并把依赖装到根目录的 package.json 里。


### 2.1 安装 TypeScript
安装 TypeScript：

```shell
pnpm add typescript -D
```

安装后执行 `npx tsc --init` 生成 `tsconfig.json` 文件，具体配置如下：

::: code-group
```json [tsconfig.json]
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "node",
    "outDir": "dist",
    "resolveJsonModule": true,
    "strict": false,
    "lib": ["ESNext", "DOM"]
  }
}
```
:::

### 2.2 安装 esbuild
安装 esbuild：

```shell
pnpm add esbuild -D
```

然后在项目根目录下新建 `scripts` 目录，用于存放项目的执行脚本。最后在 `package.json` 中添加如下命令以及创建测试脚本：

::: code-group

```json [package.json]
"scripts": {
  "dev": "scripts/dev.js"
}
```

```js [dev.js]
// 测试脚本
console.log("开始打包")
```
:::

执行命令 `pnpm dev`，如果终端成功输出 “开始打包” 日志，说明脚本配置无误，此时即可开始正式编写 `dev.js` 的具体打包逻辑。

### 2.3 安装 @types/node

安装 @types/node

```shell
pnpm add @types/node -D
```

## 3. 配置 esbuild

### 3.1 解析命令参数

解析命令参数的主要目的是让打包脚本 **具备灵活性**。通过命令行传递不同的参数，可以：动态指定要打包的子包（如 vue、reactivity 等）以及选择输出的模块格式（如 esm、cjs 等）。

这样，无需修改脚本源码，只需调整命令参数，就能快速实现不同子包和不同格式的打包需求。实现方式就是通过 `node:util` 模块的 `parseArgs` 函数来解析析命令行参数，具体实现如下：

```js
import { parseArgs } from "node:util";

const { values: { format }, positionals } = parseArgs({
    // 允许解析位置参数，返回一个数组
    allowPositionals: true, 
    options: {
        format: {
            // 表示 format 参数的值必须是字符串类型
            type: "string",
            // 表示可以用 -f 作为 format 参数的简写，例如：-f cjs
            short: "f",
            // 默认值
            default: "esm"
        }
    }
})

// 例如这段命令：node scripts/dev.js vue --format cjs
// format 的值为 cjs
// allowPositionals 的值为 ["vue"]
```

> [!TIP] 位置参数与 format 参数
> - **位置参数** 是指不带任何前缀（如 -- 或 -）的参数，直接跟在命令后面，通常用来指定主要的操作对象
> - **format 参数** 是一个命令行选项参数，它通常以 --参数名 或 -缩写 的形式出现，用于为脚本传递额外的配置信息

### 3.2 找寻入口文件


### 3.3 IIFE 全局变量名的处理


### 3.4 完整代码


## 4. 安装 Monorepo 中的依赖
 
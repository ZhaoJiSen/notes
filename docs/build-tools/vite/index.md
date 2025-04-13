# Vite

Vite 是一个现代化前端构建工具，旨在提供快速、高效的开发与构建体验。传统 Webpack 通过 Loader 与 Plugin 来解析、构建依赖图并打包所有资源作为一个或多个 bundle 文件，这一过程在大型项目中可能导致整个项目启动和构建速度缓慢。

而 Vite 利用浏览器原生 EMS 支持，在开发阶段通过 esbuild 进行快速转义和按需加载，从而实现几乎瞬时的 **冷启动** 和 **高效 HMR**。在生产环境中，Vite 默认使用 Rollup 进行打包，充分利用 Rollup 的 Tree Shaking、代码分割和输出优化能力，生成高性能的静态资源，同时也可通过配置使用 esbuild 加速部分转译任务。

:::danger ESM 的局限性
<Details>
浏览器原生的 ES Module（ESM）加载机制无法识别来自 node_modules 或裸模块的导入。它仅能识别以 `/` 的绝对路径、`./`或`../` 的相对路径或 `http(s)开头` 的网络路径。这意味着，对浏览器而言，node_modules 中的内容是 **不可见的**。

**这里需要强调：** 浏览器不是因为缺少完整的 node_modules 就无法访问；而是从来就不认识 node_modules 或裸模块路径，即使将整个 node_modules 目录都放在根目录下，浏览器也是无法识别的。
</Details>
:::

因此相较于 Webpack，Vite 在开发速度和配置简洁性上具有显著优势，特别适合现代前端项目。

## 创建 Vite 项目

使用脚手架初始化项目：
::: code-group
```shell [pnpm]
pnpm create vite
```

```shell [yarn]
yarn create vite
```
:::
执行该命令时，pnpm 会查找或临时下载 create-vite 脚手架工具，然后运行其 package.json 中定义的可执行脚本。create-vite 会引导用户选择项目模板（如 Vue、React 或 Vanilla），并生成相应的项目结构和配置文件，快速搭建 Vite 项目。


export default {
  "/frontend-framework/vue/": [
    {
      text: "Vue 源码解析",
      collapsed: false,
      items: [
        {
          text: "设计思想",
          link: "/frontend-framework/vue/index.md",
        },
        {
          text: "项目搭建",
          link: "/frontend-framework/vue/project-setup/index.md",
        },
        {
          text: "响应式原理",
          link: "/frontend-framework/vue/reactivity-principle/index.md",
        },
        {
          text: "虚拟 DOM 原理",
          link: "/frontend-framework/vue/virtual-dom/index.md",
        },
        {
          text: "组件工作流程",
          link: "/frontend-framework/vue/component-workflow/index.md",
        },
        {
          text: "异步更新过程",
          link: "/frontend-framework/vue/async-update-process/index.md",
        },
        {
          text: "API 实现",
          link: "/frontend-framework/vue/api-implementation/index.md",
        },
        {
          text: "内置组件",
          link: "/frontend-framework/vue/built-in-components/index.md",
        },
        {
          text: "编译时优化",
          link: "/frontend-framework/vue/compile-time-optimization/index.md",
        },
        {
          text: "编译时原理",
          link: "/frontend-framework/vue/compile-time-principle/index.md",
        },
      ],
    },
  ],
  "/frontend-framework/react/": [
    {
      text: "JSX",
      collapsed: false,
      link: "/frontend-framework/react/jsx/index.md",
    },
    {
      text: "Hooks",
    },
    {
      text: "组件化",
      collapsed: false,
      items: [
        {
          text: "组件通讯",
          link: "/frontend-framework/react/componentization/component-communication.md",
        },
        {
          text: "受控组件",
          link: "/frontend-framework/react/componentization/controlled-component.md",
        },
        {
          text: "异步组件",
          link: "/frontend-framework/react/componentization/async-component.md",
        },
      ],
    },
    {
      text: "状态管理",
    },
    {
      text: "路由",
    },
  ],
  "/build-tools/vite/": [
    {
      text: "Vite",
      collapsed: false,
      items: [
        {
          text: "基本使用",
          link: "/build-tools/vite/index.md",
        },
        {
          text: "性能优化",
          link: "/build-tools/vite/items/performance-optimization.md",
        },
      ],
    },
  ],
  "/backend/rust/": [
    {
      text: "Rust 基础",
      collapsed: false,
      link: "/backend/rust/index.md",
      items: [
        {
          text: "变量与常量",
          link: "/backend/rust/basic/variable.md",
        },
        {
          text: "数据类型",
          link: "/backend/rust/basic/data-types.md",
        },
        {
          text: "函数",
          link: "/backend/rust/basic/function.md",
        },
        {
          text: "流程控制",
          link: "/backend/rust/basic/flow-control.md",
        },
        {
          text: "所有权与生命周期",
          link: "/backend/rust/basic/ownership.md",
        },
      ],
    },
  ],
  "/backend/go/": [
    {
      text: "基础知识",
      collapsed: true,
      link: "/backend/go/index.md",
      items: [
        {
          text: "变量",
          link: "/backend/go/variable/index.md",
        },
        {
          text: "数据类型",
          link: "/backend/go/data-types/index.md",
        },
        {
          text: "流程控制",
          link: "/backend/go/flow-control/index.md",
        },
        {
          text: "函数",
          link: "/backend/go/function/index.md",
        },
        {
          text: "复杂数据类型",
          link: "/backend/go/complex-types/index.md",
        },
        {
          text: "指针",
          link: "/backend/go/pointer/index.md",
        },
        {
          text: "结构体",
          link: "/backend/go/struct/index.md",
        },
        {
          text: "接口",
          link: "/backend/go/interface/index.md",
        },
        {
          text: "错误处理",
          link: "/backend/go/error-handling/index.md",
        },
        {
          text: "并发",
          link: "/backend/go/concurrency/index.md",
        },
        {
          text: "反射",
          link: "/backend/go/reflection/index.md",
        },
        {
          text: "网络编程",
          link: "/backend/go/network-programming/index.md",
        },
        {
          text: "IO 操作",
          link: "/backend/go/io-operation/index.md",
        },
      ],
    },
  ],
  "/browser/": [
    {
      text: "宏观视角下的浏览器",
      collapsed: false,
      link: "/browser/index.md",
    },
  ],
  "/frontend/typescript/": [
    {
      text: "基础语法",
      collapsed: false,
      items: [
        {
          text: "类型系统",
          items: [
            {
              text: "基本类型",
              link: "/frontend/typescript/basic-syntax/basic-types.md",
            },
            {
              text: "引用类型",
              collapsed: false,
              items: [
                {
                  text: "数组",
                  link: "/frontend/typescript/basic-syntax/array.md",
                },
                {
                  text: "元组",
                  link: "/frontend/typescript/basic-syntax/tuple.md",
                },
                {
                  text: "接口与类型别名",
                  link: "/frontend/typescript/basic-syntax/interface.md",
                },
                {
                  text: "函数",
                  link: "/frontend/typescript/basic-syntax/function.md",
                },
                {
                  text: "类",
                  link: "/frontend/typescript/basic-syntax/class.md",
                },
                {
                  text: "枚举",
                  link: "/frontend/typescript/basic-syntax/enum.md",
                },
              ],
            },
            {
              text: "泛型",
              link: "/frontend/typescript/basic-syntax/",
            },
            {
              text: "类型断言与非空断言",
              link: "/frontend/typescript/basic-syntax/type-assertion.md",
            },
            {
              text: "联合类型和交叉类型",
              link: "/frontend/typescript/basic-syntax/union-and-intersection-types.md",
            },
          ],
        },
        {
          text: "模块及命名空间",
        },
        {
          text: "内置类型工具",
        },
        {
          text: "装饰器",
        },
      ],
    },
    {
      text: "tsconfig 详解",
      collapsed: false,
      link: "/frontend/typescript/tsconfig/index.md",
    },
    {
      text: "Axios 封装",
    },
  ],
};

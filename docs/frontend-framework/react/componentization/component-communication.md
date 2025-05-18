# 组件通讯

在 React 中组件通讯指的是不同组件之间传递数据的方式。其采用单项数据流的设计理念，使得组件间的通讯一般由：Props 通讯、回调函数、Context API 三种方式实现。

在组件的章节中，主要阐述 Props 通讯。

## Props 通讯

Props 通讯是 React 组件通信中最简单的方式。既父组件向子组件传递数据，子组件通过 Props 接收来自父组件的数据。父组件通过传递不同类型的数据，就可以控制子组件的行为和渲染内容。

在使用 Props 时，子组件接收到的 Props 数据是**只读的**，子组件可以通过参数解构或直接通过参数 props 来直接访问 Props 数据。

```tsx
import React from 'react';

const Parent = () => {
  return <Child name="John" />;
};

const Child = ({ name }) => {
  return <div>Hello, {name}!</div>;
};
```
 
> [!NOTE] 需要注意的是
> 子组件不能直接修改父组件传递的 Props 数据，既因为 Props 是只读的，又因为需要去保证 React 的单向数据流动，以避免组件间的数据混乱。

### 1. 结合 TypeScript


通过 TypeScript 可以约束 Props 的类型，从而保证组件的正确性。

```tsx
interface Props {
  name: string;
}

const Child: React.FC<Props> = ({ name }) => {
  return <div>Hello, {name}!</div>;
};

const Parent = () => {
  return <Child name="John" />;
};
```

使用 `React.FC<T>` 的这种用法是可以为组件设置默认值的


### 2. 回调函数

### 3. props.children

### 4. 兄弟组件通讯

推荐使用，发布订阅模式。不推荐使用父组件去管理两兄弟组件间的状态和行为。

还可以是用浏览器原生的自定义事件







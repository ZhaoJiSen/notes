# 工程化规范

工程化规范是指在软件开发过程中为提高团队协作效率、保证代码质量和可维护性而制定的一系列标准和准则。这些规范涵盖了从代码编写到项目部署的各个环节，有助于统一团队成员的开发行为，减少沟通成本，提高开发效率。

::: details  工程化规范主要包括以下几个方面：

1. **代码规范**：统一的代码风格、命名约定、注释要求等，使代码更加可读和一致。
2. **提交规范**：版本控制提交信息的格式和内容要求，有助于清晰记录项目变更历史。
3. **文件结构规范**：项目目录组织、文件命名规则等，便于快速定位和理解项目结构。
4. **构建和部署规范**：标准化构建流程和部署策略，确保产品交付的一致性和可靠性。
5. **文档规范**：API文档、使用说明等文档的编写要求，提高项目的可用性和可维护性。
6. **分支管理规范**：定义分支创建、合并和删除的流程，保证代码集成的顺序和稳定性。

:::

遵循工程化规范不仅能够提高团队的开发效率，还能够降低项目维护成本，减少 bug 的产生，提高代码质量，为项目的长期发展打下坚实基础。

## 1. ESLint 9

ESLint 是一个用于识别和报告 JavaScript 代码中潜在问题的工具。安装 ESLint 可以使用命令：

```bash
pnpm create @eslint/config@latest
```

通过该命令，可以自动创建并生成一个配置文件，其文件名可以是 `eslint.config.mjs`，也可以使用其他后缀，如 `.js` 或 `.cjs`。

在 ESLint 9 中，配置文件的风格与之前的版本有显著不同，所有相关配置已被扁平化处理。

```js
import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    plugins: { js },
    extends: ['js/recommended'],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);

```

### 1.1 规则集

ESLint 的官方，提供了内置的规则集，例如上述代码中 `extends: ['js/recommended']` 就是继承了 ESLint 官方 JS 的规则集。

> [!TIP] 常用的规则集
> 1. `js/recommended`：JS 的规则集
> 2. `typescript-eslint`：TypeScript 的规则集
> 3. `eslint-plugin-react`：React 的规则集
> 4. `eslint-plugin-vue`：Vue 的规则集

在使用 Vue 或 React 的规则集时需要注意，二者属于 ESLint 的插件


<br />
<br />
<br />
<br />
<br />
规则分为三个等级：
- `off` 关闭规则
- `warn` 警告
- `error` 错误


前端工具链使用 Rust 重构的趋势是由于需要统一：AST。在一个 AST 的基础上进行构建、校验、格式化等所有操作。












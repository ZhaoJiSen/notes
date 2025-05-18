# 受控组件与非受控组件

## 受控组件
在 React 中，受控组件一般指的是表单数据由 React 组件的状态来控制的组件。换句话说，受控组件的值是由 React 的状态管理的，而不是由 DOM 元素自身管理。

常见的受控组件包括：`input`、`textarea`、`select` 等表单元素，例如：

```tsx
import { useState } from "react";


export const ControlledInput: React.FC = () => {

  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  return (
    <input type="text" value={value} onChange={handleChange} />
  )
}
```

> [!TIP] 需要使用受控组件的原因：
> 使用受控组件可以确保表单数据与组件的状态保持同步，便于集中管理和验证数据，同时提供相应的事件处理机制以实现校验等联动效果


## 非受控组件

非受控组件就是与受控组件相反的概念，非受控组件不受 React 的组件状态来控制，表单的数据交由 DOM 来管理。通常搭配 `useRef` 来获取表单元素的值。例如：

```tsx
import { useRef } from 'react'

const UnControlledInput = () => {
  const defaultValue = 'This is Default Value'
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleChange = () => {
    console.log(inputRef.current?.value)
  }

  return (
    <input 
      type="text" 
      ref={inputRef} 
      defaultValue={defaultValue} 
      onChange={() => handleChange()}
    />
  )
}
```

> [!TIP] 注意：
> 在受控组件中，使用 value 是为了确保输入框的值与组件的状态保持同步，而 defaultValue 适用于非受控组件，表示初始值但不再与状态同步。因此，在非受控组件中，必须使用 defaultValue 而不是 value。 

### 特殊的非受控组件

对于 `type = 'file'` 类型的表单，它通常被视为一个特殊的非受控组件，因为其值只能由用户通过文件选择操作来设置，而不能通过程序直接设置。尽管可以通过事件处理程序获取用户选择的文件并将其存储在组件的状态中，但输入框的值本身仍然是由用户控制的。


::: code-group

```tsx [通过事件处理程序获取]
import React, { useState } from 'react';

const ControlledFileUpload = () => {
  const [files, setFiles] = useState<FileList | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(event.target.files);
  };

  return (
    <div>
      <input type="file" onChange={handleChange} multiple />
      {files && (
        <ul>
          {Array.from(files).map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

```tsx [非受控]
import { useState } from 'react'

const UnControlledFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    if (inputRef.current?.files) {
      const selectedFiles = Array.from(inputRef.current.files);
      
      setFiles(selectedFiles);
    }
  }

  return (
    <div>
      <input 
        type="file" 
        ref={inputRef} 
        onChange={handleFileChange} 
        multiple
      />

      {files && (
        <ul>
          {Array.from(files).map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

:::



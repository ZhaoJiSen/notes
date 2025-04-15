# Gulp
Gulp 是一个用于自动化工作流的工具包，其核心是 Task Runner（任务运行器），**通过自定义一系列任务并基于 Node.js 的 Stream 机制结合插件体系来完成构建任务。**

相比 Webpack，Gulp 更加轻量、易于上手，适用于处理构建流程中的各类自动化任务。不过在大型项目中，由于缺乏模块打包和依赖管理的功能，Gulp 通常不会用于处理模块化构建，而是配合其他工具使用，或专注于非打包类的构建流程。


::: code-group
```shell [pnpm 安装]
pnpm add gulp -D
```

```shell [yarn 安装]
yarn add gulp -D
```
:::



<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
Gulp 任务
每个 Gulp 任务都是异步的 JavaScript 函数，此函数接收一个 callback 作为参数，调用 callback 表示结束任务。并且 Gulp 任务分为 public 、private 和 default 类型：
● public 类型被称为公开任务，可直接被 gulp 命令执行，需要显示通过 exports 导出
● private  类型被称为私有任务，在内部使用，通常作为 series 或 parallel 组合的组成部分
● default 类型被称为默认任务，通过module.exports.default = (callback) => {}的形式组成

编写gulpfile.js文件，并在其中创建任务，然后过npx gulp tastname来执行任务
const foo = (callback) => {
    console.log('Gulp 任务');
    callback();									// 用于指示任务完成
};

// 导出任务
module.exports = {
    foo
}

除开使用 callback 结束任务以外，还可以通过返回 Stream、Promise、Event Emitter、Child Process 或 Observable 类型的函数结束任务

补充：
在 Gulp 4 之前，任务需通过gulp.tast的方式注册
gulp.tast('bar', callback => {
  console.log('Gulp 任务');
  callback();
})

任务组合
通常一个函数中能完成的任务是有限的，同时也不易于维护，所以会将任务进行组合。Gulp 提供了两个组合方法，分别是：
● series：串行任务组合，任务会按照传入顺序，依次执行
● parallel：并行任务组合，所有任务并行执行，不会按照顺序依次执行

const { series, parallel } = require('gulp');

const foo1 = (callback) => {
    setTimeout(() => {
        console.log('foo1');
        callback()
    }, 1000);
};

const foo2 = (callback) => {
    setTimeout(() => {
        console.log('foo2');
        callback()
    }, 2000);
};

const foo3 = (callback) => {
    setTimeout(() => {
        console.log('foo3');
        callback()
    }, 3000);
};

const seriesTask = series(foo1, foo2, foo3);
const parallelTask = parallel(foo1, foo2, foo3);

module.exports = {
  seriesTask,
  parallelTask
}

执行结果：
使用 series 串行执行的输出结果

使用 parallel 并行执行的输出结果


Gulp 文件操作
Gulp 提供了 src 与 dest 两个方法用于读取文件，src 方法接收一个 glob 参数，用于匹配目标文件，返回一个可读流；dest 接收一个输出目录作为参数，返回一个可写流，通过该流将内容输出到文件中 ⚡
const { src, dest } = require('gulp');

const copyFile = (callback) => {
  // 从可读流中读取文件，然后通过 pipe 放入可写流
  return src('./src/**/*.js').pipe(dest('./dist'));
}

module.exports = {
  copyFile
}

⚡补充：
pipe 方法用于将一个流从一个任务传递到另一个任务，在 Gulp 中几乎所有的任务都是通过 pipe 进行连接将任务串联，例如
gulp.src('./src/**/*.scss')
    .less()
    .pipe(gulp.dest('./temp/'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/'))

监听文件变化
Gulp 提供了 watch 方法用于监视文件系统中的文件变动，并在检查发生变动后自动执行相应的任务
const { watch } = require('gulp');

watch('./src/**/*.js', JSTasK);
watch('./src/**/*.css', CSSTasK);
Gulp 开发与构建
代码处理
JavaScript 的转换与压缩
在 Gulp 读取、写入文件时可以对读取到的文件进行进一步处理，就比如通过 Babel 转换以及 Terser 压缩
pnpm add gulp-babel @babel/preset-env -D
pnpm add gulp-terser -D

通过 pipe 来将流进行传递：
const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const BabelTerser = require('gulp-terser');


const JSTasK = () => {
  return src('./src/**/*.js')
    .pipe(babel({ presets: [ '@babel/preset-env' ] }))
    .pipe(BabelTerser({  mangle: { toplevel: true } }))
    .pipe(dest('./dist/js/'));
};


module.exports = { JSTasK };
HTML 的打包与压缩
与 webpack 类似，在 Gulp 中通过安装对应的插件就可以对 HTML 进行压缩处理
pnpm add gulp-htmlmin -D

const { src, dest } = require('gulp');
const HTMLMin = require('gulp-htmlmin');

const htmlTask = () => {
  return src('./index.html')
    .pipe(HTMLMin(
      { 
        removeComments: true,				// 清除 HTML 注释
        collapseWhitespace: true,		// 移除多余的空格和换行符，但会保留必要的空格
      }))
    .pipe(dest('./dist/'));
};

module.exports = { htmlTask }
CSS 的打包
安装处理 CSS 预处理工具的插件
pnpm add gulp-less -D

const { src, dest } = require('gulp');
const Less = require('gulp-less');

const CSSTask = () => {
  return src('./src/**/*.less')
    .pipe(Less())
    .pipe(dest('./dist/css/'))
}

module.exports = { CSSTask }
注入打包后的文件
通过 Gulp 处理后的文件彼此都是相互独立的，因此需要通过插件来将打包后的资源注入到 HTML 中
pnpm add gulp-inject -D
 
const { src, dest } = require('gulp');
const Inject = require('gulp-inject');

const injectTask = () => {
  return src('./dist/index.html')
    .pipe(Inject(src(['./dist/**/*.js', './dist/**/*.css'])))
    .pipe(dest('./dist/'));		// 重新生成 dist
}

module.exports = { injectTask }

在被注入的 HTML 文件中，需要通过注释的方式告知 Gulp 打包后文件的位置
<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>Gulp</title>
    <!--  inject:css  -->
    <!--  endinject   -->
</head>
<body>
<!--  inject:js   -->
<!--  endinject   -->
</body>
</html>
开启本地服务监听
在 webpack 中搭建服务器的方式是通过 webpack-dev-server  插件来实现，在 Gulp 中也可通过类似的插件实现本地服务
pnpm add browser-sync -D 

const BrowserSync = require('browser-sync');

const bs = BrowserSync.create();
const serverTask = () => {
  // 启动服务
  bs.init({
    port: 9527,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist',
    }
  });
}
构建任务
在打包、压缩、注入完所有的文件后，可通过 parallel 与 series 创建并行任务与串行任务来构建
const { parallel, series } = require('gulp');

const buildTask = series(parallel(htmlTask, JSTasK, CSSTask), injectTask);
const serveTask = series(buildTask, serve);

module.exports = { buildTask, serveTask };

⚡路径报错问题：
构建后，运行构建后的 HTML 会发现代码报错，原因是：通过gulp-inject插件注入后的 CSS 与 JS 默认会在路径前额外拼接打包后指定的目录，例如/dist。所以此时如果直接运行 HTML 文件，在解析 href 或 src 时会去寻找资源路径所对应的文件，而打包后的文件已经在 dist 目录下，因此无法找到该目录

解决方法：在 inject 注入时，需要额外标注相对路径
const { src, dest } = require('gulp');
const Inject = require('gulp-inject');

const injectTask = () => {
  return src('./dist/index.html')
    .pipe(Inject(src(['./dist/**/*.js', './dist/**/*.css']), { relative: true }))
    .pipe(dest('./dist/'));		// 重新生成 dist
}

module.exports = { injectTask }

修改为相对路径后：


完整代码：
const { src, dest, parallel, series, watch } = require('gulp');

const Less = require('gulp-less');
const babel = require('gulp-babel');
const Inject = require('gulp-inject');
const HTMLMin = require('gulp-htmlmin');
const BabelTerser = require('gulp-terser');
const BrowserSync = require('browser-sync');

const bs = BrowserSync.create();

const JSTasK = () => {
  return src('./src/**/*.js')
    .pipe(babel(
      {
        presets: [ '@babel/preset-env' ]
      }
    ))
    .pipe(BabelTerser({
      mangle: { toplevel: true }
    }))
    .pipe(dest('./dist/js'));
};
const CSSTask = () => {
  return src('./src/**/*.less')
    .pipe(Less())
    .pipe(dest('./dist/css/'))
};
const htmlTask = () => {
  return src('./index.html')
    .pipe(HTMLMin({ collapseWhitespace: true }))
    .pipe(dest('./dist/'));
};

const injectTask = () => {
  return src('./dist/index.html')
    .pipe(Inject(src(['./dist/**/*.js', './dist/**/*.css']), { relative: true }))
    .pipe(dest('./dist/'));
};

const serve = () => {
  watch('./src/**', buildTask);
  // 启动服务
  bs.init({
    port: 9527,
    open: true,
    files: './dist/*',
    server: {
      baseDir: './dist',
    }
  });
}

const buildTask = series(parallel(htmlTask, JSTasK, CSSTask), injectTask);
const serveTask = series(buildTask, serve);

module.exports = { buildTask, serveTask };

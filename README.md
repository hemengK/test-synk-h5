# umi project

## Getting Started

Install dependencies,

```bash
$ yarn
```

Start the dev server,

```bash
$ yarn start
```

## 工程目录
***
  * src 代码源文件目录
     * business-components 业务组件目录
     * components 基础组件目录
     * pages 页面目录
     * utils 工具目录
  * app.less 全局样式文件
  * app.ts 入口文件

  其余配置文件非必要不要修改！！！
  git commit 会触发hooks eslint 校验，请不要跳过校验！！！
  工程内不要引入scss文件，否则可能流水线检查无法通过
***

## 文件命名规范
* ts文件，目录以BEM方式命名 如： business-componets
* 页面文件下入口默认以index命名 如：index.tsx index.less
* 组件文件大写开头 如：ChooseDepts.tsx
* 变量使用驼峰命名 如：userDept, userId
* className BEM方式命名
* 类名大写字母开头

### 工程开发规范
* 可以使用react component 和react hook 都可以，建议使用react hook

import { defineConfig } from 'umi';
import routes from './routes';
import theme from './theme';

export default defineConfig({
  title: 'I-People',
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  history: {
    type: 'browser',
  },
  hash: true,
  base: '/anniversary/h5/',
  publicPath: '/anniversary/h5/',
  theme,
  mountElementId: 'root',
  extraPostCSSPlugins: [
    // require('postcss-flexbugs-fixes'),
    require('postcss-px-to-viewport')({
      viewportWidth: 750, // 视窗的宽度，对应的是我们设计稿的宽度，一般是375
      unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
      viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
      selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false, // 允许在媒体查询中转换`px`
      exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
    }),
  ],
  antd: {},
});

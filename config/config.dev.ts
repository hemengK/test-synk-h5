import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    'process.env.env': 'dev',
  },
  // devServer: {
  //   writeToDisk: true,
  //   proxy: {
  //     '/user-server/': {
  //       target: 'http://10.106.130.27:8080',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});

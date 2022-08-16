import autoprefixer from 'autoprefixer';
import dayjs from 'dayjs';
import path from 'path';
import pkg from './package.json';

import { defineConfig, loadEnv, normalizePath } from 'vite';

import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';
import { wrapperEnv } from './build/utils';

const pathTypes = path.resolve(__dirname, 'types');

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss')
};

// false：默认根据环境配置开启，true：强制所有环境开启
const __IS_MOCK__ = false;

// 全局 scss 文件的路径
// 用 normalizePath 解决 window 下的路径问题
const variablePath = normalizePath(path.resolve('src/styles/variable.scss'));

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_DROP_CONSOLE, VITE_PORT, VITE_PROXY, VITE_USE_MOCK } = viteEnv;

  const isBuild = command === 'build';

  return {
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // 重点在这里哦
          // entryFileNames: `assets/[name].${timestamp}.js`,
          // chunkFileNames: `assets/[name].${timestamp}.js`,
          // assetFileNames: `assets/[name].${timestamp}.[ext]`
          entryFileNames: 'assets/[name].js',
          chunkFileNames: 'assets/[name].js',
          assetFileNames: 'assets/[name].[ext]'
        }
      }
    },
    css: {
      // 进行 PostCSS 配置
      postcss: {
        plugins: [
          autoprefixer({
            // 指定目标浏览器
            overrideBrowserslist: ['Chrome > 40', 'ff > 31', 'ie 11']
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          // additionalData 的内容会在每个 scss 文件的开头自动注入
          additionalData: `@import "${variablePath}";`
        }
      }
    },
    define: {
      // setting vue-i18-next
      // Suppress warning
      __INTLIFY_PROD_DEVTOOLS__: false,
      __APP_INFO__: JSON.stringify(__APP_INFO__),
      __IS_MOCK__: __IS_MOCK__ || VITE_USE_MOCK
    },
    esbuild: {
      pure: VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    // The vite plugin used by the project. The quantity is large, so it is separately extracted and managed
    plugins: createVitePlugins(viteEnv, isBuild, pathTypes),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '#': pathTypes,
        '@build': path.resolve(__dirname, 'build'),
        '@enums': path.resolve(__dirname, 'enums')
      }
    },
    server: {
      // https: true,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load Proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    }
  };
});

import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import path from 'path';
import viteEslint from 'vite-plugin-eslint';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { VantResolver } from 'unplugin-vue-components/resolvers';
import { PluginOption } from 'vite';

import { configMockPlugin } from './mock';

export function createVitePlugins(
  viteEnv: ViteEnv,
  isBuild: boolean,
  pathTypes: string
) {
  const { VITE_USE_MOCK } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ['vue'],
      // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
      // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
      resolvers: [
        // Auto import icon components
        // 自动导入图标组件
        IconsResolver({
          prefix: 'Icon'
        }),
        VantResolver()
      ],
      dts: path.resolve(pathTypes, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        // Auto register icon components
        // 自动注册图标组件
        IconsResolver({
          enabledCollections: ['ep']
        }),
        // Auto register Vant components
        // 自动导入 Vant 组件
        VantResolver()
      ],
      dts: path.resolve(pathTypes, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    viteEslint(),
    vue(),
    vueJsx()
  ];

  VITE_USE_MOCK && vitePlugins.push(configMockPlugin(isBuild));

  return vitePlugins;
}

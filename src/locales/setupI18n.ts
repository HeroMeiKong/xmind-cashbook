import type { App } from 'vue';
import { createI18n } from 'vue-i18n';

import { localeSetting } from '@/settings/localeSetting';

// 自定义国际化文件
import zh_CN from './lang/zh_CN';
import en_US from './lang/en_US';

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const { fallback, availableLocales } = localeSetting;
  const i18n = createI18n({
    legacy: false, // Composition API 模式
    globalInjection: true, // 全局注册 $t 方法
    locale: 'zh_CN', // 默认语言
    // 语言库
    messages: {
      zh_CN,
      en_US
    },
    fallbackLocale: fallback,
    availableLocales,
    sync: true, // If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: true, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true
  });

  app.use(i18n);
}

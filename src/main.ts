// 引入模块后自动生效，Vant PC端适配事件
import '@vant/touch-emulator';

import { createApp } from 'vue';
import { setupI18n } from '@/locales/setupI18n';
// import { router, setupRouter } from '@/router'
import App from './App.vue';
import './styles/global.css';

async function bootstrap() {
  const app = createApp(App);

  // 配置多语言
  await setupI18n(app);

  app.mount('#app');
}

bootstrap();

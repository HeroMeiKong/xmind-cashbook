import type { LocaleType } from '#/config';

// 设置页面语言
export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

import type { ServerOptions } from '#/server';

export default class Server {
  static async fetch(
    method: string,
    url: URL | string,
    options?: ServerOptions
  ) {
    let current_url = options?.baseURL
      ? __IS_MOCK__
        ? `${options.baseURL}/mock${url}`
        : options.baseURL + url
      : __IS_MOCK__
      ? `/mock${url}`
      : url;
    // 判断 get
    if (method.toLowerCase() === 'get' && options?.params) {
      let search = '?';
      for (const param in options.params) {
        search += `&${param}=${options.params[param]}`;
      }
      current_url = current_url + search.replace('?&', '?');
    }

    // 判断 post
    if (
      (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') &&
      options?.data
    ) {
      options.body = JSON.stringify(options.data);
    }

    const Options = Object.assign(
      {
        method,
        mode: 'cors',
        // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'include', // include, *same-origin, omit
        headers: {
          authorization: 'JWT',
          'Cache-Control': 'no-cache, no-store',
          locale: 'zh_CN',
          Pragma: 'no-cache',
          'Proxy-Connection': 'keep-alive',
          // "Content-Type": "mulmessageart/form-data",
          'Content-Type': 'application/json',
          'x-requested-with': 'XMLHttpRequest'
        }
        // redirect: 'error', // manual, *follow, error
        // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      },
      options
    );

    try {
      console.log('url: ', current_url);
      const response = await fetch(current_url, Options);
      if (response.ok) {
        // 状态码 200 - 299
        return Options.needHeader
          ? {
              ok: response.ok,
              header: response.headers,
              data: response.json()
            }
          : {
              ok: response.ok,
              data: response.json()
            };
      } else {
        // 其他
        return {
          ok: response.ok,
          status: response.status,
          statusText: response.statusText,
          error: `${response.status}: ${response.statusText}`
        };
      }
    } catch (error) {
      console.log('请检查网络情况！');
      throw error;
    }
  }
}

export interface paramsObj {
  [key: string]: any;
}

export interface FetchOptions {
  method?: string;
  mode?: RequestMode | undefined;
  cache?: RequestCache | undefined;
  credentials?: RequestCredentials | undefined;
  headers?: HeadersInit | undefined;
  redirect?: RequestRedirect | undefined;
  referrerPolicy?: ReferrerPolicy | undefined;
  body?: any;
}

export interface ServerOptions extends FetchOptions {
  baseURL?: string;
  needHeader?: boolean;
  params?: paramsObj;
  data?: object;
}

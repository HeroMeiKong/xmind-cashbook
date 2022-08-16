module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'standard',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:jest/recommended'
  ],
  globals: {
    __IS_MOCK__: 'readonly',
    HeadersInit: 'readonly',
    JSX: 'readonly',
    Recordable: 'readonly',
    ReferrerPolicy: 'readonly',
    RequestCache: 'readonly',
    RequestCredentials: 'readonly',
    RequestMode: 'readonly',
    RequestRedirect: 'readonly',
    ViteEnv: 'readonly'
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': 'off',
    camelcase: 'off'
  }
};

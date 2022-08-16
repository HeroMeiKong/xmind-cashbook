module.exports = {
  globals: {
    '@vue/vue3-jest': {
      compilerOptions: {
        propsDestructureTransform: true
      }
    }
  },
  moduleFileExtensions: ['vue', 'js', 'ts'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest', // vue 文件用 @vue/vue3-jest 转换
    '^.+\\.js$': 'babel-jest',
    '^.+\\.ts$': 'ts-jest' // ts 文件用 ts-jest 转换
  },
  // 匹配 __tests__ 目录下的 .js/.ts 文件 或其他目录下的 xx.test.js/ts xx.spec.js/ts
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.(ts)$'
};

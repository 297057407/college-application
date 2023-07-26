/* eslint-env node */
module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  //解决报错：Component name "index" shold always be multi-word
  rules: {
    'vue/multi-word-component-names': 0
  }
}

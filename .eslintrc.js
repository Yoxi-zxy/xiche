module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 'vue/script-indent': ['error', 2, {'baseIndent': 1}],
    'semi': [0, 'never'],
    'wrap-iife': [2, 'inside'],
  },
  // overrides:[
  //   {
  //     'files':['*.vue'],
  //     'rules':{
  //       'indent':'off'
  //     }
  //   }
  // ],
  parserOptions: {
    parser: 'babel-eslint'
  }
}

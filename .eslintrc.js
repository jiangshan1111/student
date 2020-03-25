// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    node: true,
    jquery: true
  },
  extends: ['plugin:vue/essential', '@vue/prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'prettier/prettier': [
      'error',
      {
        tabWidth: 2,
        useTabs: false,
        semi: false,
        singleQuote: true,
        trailingComma: 'none',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        arrowParens: 'always',
        printWidth: 200
      }
    ],
    'no-unused-vars': 0,
    'no-unreachable': 0,
    'no-undef': 0
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  globals: {
    $App: true
  }
}

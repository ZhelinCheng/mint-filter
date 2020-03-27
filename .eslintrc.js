module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "globals": {
    "describe": "readonly",
    "it": "readonly",
    "expect": "readonly"
  },
  "extends": [
    "standard",
    "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module"
  },
  "plugins": ["@typescript-eslint"]
};

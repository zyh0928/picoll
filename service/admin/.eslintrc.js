module.exports = {
  root: !0,
  env: {
    node: !0
  },
  extends: ["plugin:prettier/recommended"],
  rules: {
    "prettier/prettier": 1
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: !0
    }
  }
};

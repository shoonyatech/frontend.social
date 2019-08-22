module.exports = {
  extends: ["plugin:vue/recommended"],
  rules: {
    "vue/no-unused-vars": "error"
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module"
  }
};

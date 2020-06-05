module.exports = {
  extends: ["plugin:vue/recommended"],
  rules: {
    "vue/no-unused-vars": "error",
    "vue/no-v-html": "off"
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 8,
    sourceType: "module"
  }
};

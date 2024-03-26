require("@rushstack/eslint-patch/modern-module-resolution")
module.exports = {
    env: {
        browser: true,
        node: true,
        commonjs: true,
        es2022: true
    },
    extends: [
        "plugin:vue/recommended",
        "plugin:vue/vue3-essential",
        "@vue/eslint-config-airbnb-with-typescript",
        "plugin:prettier/recommended",
        "prettier"
    ],
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: "module",
        //project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ["prettier", "vue", "import"],
    rules: {
        indent: [
            'error',
            2,
            {
                SwitchCase: 1,
                ignoredNodes: ['ConditionalExpression'],
            },
        ],
        "prettier/prettier": "error",
        "vue/no-multiple-template-root": "off",
        "vue/multi-word-component-names": "off",
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
        "vuejs-accessibility/click-events-have-key-events": "off"
    },
};
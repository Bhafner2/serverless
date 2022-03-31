const ESLintConfiguration = require('@bison/global-auto-configurations').eslint;

module.exports = {
  root: true,

  /**
   * Base configuration for our project
   */
  settings: ESLintConfiguration.settings,
  env: ESLintConfiguration.env,

  /**
   * Shared angular configuration
   */
  overrides: [
    /**
     * -----------------------------------------------------
     * TYPESCRIPT FILES (COMPONENTS, SERVICES ETC) (.ts)
     * -----------------------------------------------------
     */
    {
      files: ['*.ts'],
      parser: ESLintConfiguration.parser, // Specifies the ESLint parser
      parserOptions: Object.assign({}, ESLintConfiguration.parserOptions, {
        project: [
          './tsconfig.app.json',
          './tsconfig.spec.json',
          './cypress/tsconfig.e2e.json'
        ],
        tsconfigRootDir: './',
        createDefaultProgram: true
      }),
      extends: [
        'plugin:@angular-eslint/recommended', // Uses the recommended rules from @angular-eslint
        'plugin:@angular-eslint/template/process-inline-templates', // Process inline-templates
        ...ESLintConfiguration.extends
      ],
      plugins: ['@angular-eslint', ...ESLintConfiguration.plugins],
      rules: {
        ...ESLintConfiguration.rules,

        /**
         * Any TypeScript source code (NOT TEMPLATE) related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
        quotes: ['error', 'single', {allowTemplateLiterals: true}],
      }
    },
    {
      files: ['*.spec.ts'],
      rules: {
        '@typescript-eslint/no-empty-function': 'off',
      }
    },

    /**
     * -----------------------------------------------------
     * COMPONENT TEMPLATES
     * -----------------------------------------------------
     */
    {
      files: ['*.component.html'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
        'max-len': ['error', {code: 160}]
      }
    },
    {
      files: ['*.html'],
      excludedFiles: ['*inline-template-*.component.html'],
      extends: ['plugin:prettier/recommended'],
      rules: {
        'prettier/prettier': ['error', { 'parser': 'angular' }]
      }
    },
  ]
}
;

const defaultStyleLint = require('@bison/global-auto-configurations').stylelint;
defaultStyleLint.rules = {
  ...defaultStyleLint.rules,
  'max-nesting-depth': [5, { ignore: ['blockless-at-rules'] }],
  'selector-max-compound-selectors': 5,
  'selector-class-pattern':
    '^(?:(?:o|c|u|t|s|is|has|_|js|qa)-)?[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*(?:__[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)*(?:--[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*)?(?:\\[.+\\])?$',
}

module.exports = {
  ...require('@bison/global-auto-configurations').stylelint,
};

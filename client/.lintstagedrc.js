module.exports = {
  '*.css': ['stylelint', 'prettier --parser css --write'],
  '*.scss': ['stylelint --syntax=scss', 'prettier --parser scss --write'],
  '*.{ts,tsx}': ['eslint', 'prettier --parser typescript --write'],
  '*.{js,css,json,md}': ['prettier --write'],
};

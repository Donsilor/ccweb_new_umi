'use strict';
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '.', dir);
}

module.exports = {
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': resolve('src'),
    },
  },
};

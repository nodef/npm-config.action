const resolve  = require('@rollup/plugin-node-resolve').default;
const commonjs = require('@rollup/plugin-commonjs').default;
const cleanup  = require('rollup-plugin-cleanup');


module.exports = [{
  input: '.build/index.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    exports: 'auto'
  },
  plugins: [resolve(), commonjs(), cleanup({comments: 'none'})]
}];

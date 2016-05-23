import path from 'path';
import webpack from 'webpack';
import baseConfig from './webpack.config.base';

export default {
  ...baseConfig,

  devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false,

  entry: [
    'babel-polyfill',
    './app/main/index',
  ],

  output: {
    path: path.resolve(__dirname, 'dist/main'),
    filename: 'main.js',
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new webpack.BannerPlugin(
      process.env.NODE_ENV === 'development' ? 'require("source-map-support").install();' : '',
      { raw: true, entryOnly: false }
    ),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],

  target: 'electron-main',

  node: {
    __dirname: false,
    __filename: false,
  },

  externals: [
    ...baseConfig.externals,
    'source-map-support',
  ],
};

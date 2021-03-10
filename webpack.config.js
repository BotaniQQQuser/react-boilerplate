const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = (env, argv) => {
  const dir = process.env.WEBPACK_DIR || __dirname;
  const isDev = argv.mode === 'development';

  const plugins = [
    new webpack.optimize.AggressiveMergingPlugin(),
    // new CompressionPlugin({
    //   filename: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.7,
    // }),
    // new CompressionPlugin({
    //   filename: '[path].br[query]',
    //   algorithm: 'brotliCompress',
    //   test: /\.js$|\.css$|\.html$/,
    //   threshold: 10240,
    //   minRatio: 0.7,
    //   compressionOptions: {
    //     level: 11,
    //   },
    // }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ];

  return {
    mode: isDev ? 'development' : 'production',
    entry: {
      index: './src/index.tsx',
    },
    output: {
      filename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'build'),
    },
    devtool: isDev ? 'source-map' : false,
    resolve: {
      alias: {
        Api: path.resolve(dir, 'src', 'api'),
        Components: path.resolve(dir, 'src', 'components'),
        Constants: path.resolve(dir, 'src', 'constants'),
        Hooks: path.resolve(dir, 'src', 'hooks'),
        Stores: path.resolve(dir, 'src', 'stores'),
        Types: path.resolve(dir, 'src', 'types'),
        Utils: path.resolve(dir, 'src', 'utils'),
        Views: path.resolve(dir, 'src', 'views'),
      },
      extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                esModule: true,
                modules: {
                  localIdentName: '[name]-[local]_[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|svg|woff|woff2|eot)$/,
          use: ['file-loader'],
        },
      ],
    },
    devServer: {
      publicPath: '/',
      host: 'localhost',
      port: 9000,
      disableHostCheck: true,
      contentBase: path.resolve(dir, 'public'),
      hot: true,
    },
    plugins: [
      ...plugins,
    ],
  };
};

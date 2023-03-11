const path = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isProdaction = NODE_ENV == 'production';

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  mode: NODE_ENV,
  entry: path.resolve(__dirname, 'src/index.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          {
            loader: "handlebars-loader",
          },
        ],

        exclude: /(node_modules)/,
      },

      {
        test: /\.scss$/,
        use: ["css-loader", "sass-loader"],
        exclude: /(node_modules)/,
      },

      {
        test: /\html$/,
        use: "html-loader",
        exclude: /(node_modules)/,
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[contenthash:8].[ext]',
          },
        }
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
        exclude: /(node_modules)/,
      },

      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }
      },

    ]
  },
  devServer: {
    port: 3000,
    open: true,
    hot: !isProdaction,
    historyApiFallback: true
  },
  devtool: isProdaction ? false : 'source-map',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendors'
    },
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin({
        parallel: true,
        extractComments: isProdaction,
        terserOptions: {
          sourceMap: !isProdaction
        }
      })
    ],
  },
  plugins: [
    new CleanWebpackPlugin({
      cleanAfterEveryBuildPatterns: ['!*.woff', '!*.woff2', '!*.ttf', '!*.eot', '!*.svg', '!*.png']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, 'src/index.html'),
      minify: {
        collapseWhitespace: isProdaction,
      },
      inject: "body",
    }),

  ]
}

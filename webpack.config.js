/*
 * @Author: lilunze
 * @LastEditors: lilunze
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require('autoprefixer');
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
// const smp = new SpeedMeasurePlugin();
// 引入自己的插件
const WebpackVersionPlugin = require("./plugins/webpack-version-plugin");

module.exports = {
  mode: "production",
  entry: {
    app: "./src/main.js",
  },
  performance: {
    // 资源大小限制
    // hints: false,
    hints: "error",
    maxEntrypointSize: 10000000,
    maxAssetSize: 10000000,
  },
  devtool: 'inline-source-map', // source-map
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    compress: true,
    port: 9000,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolveLoader: {
    modules: ['node_modules', './loaders/'] // 配置加载本地loader
  },
  plugins: [
    new CleanWebpackPlugin(),  // 每次构建前清理dist/
    new HtmlWebpackPlugin({
      title: "中台管理系统",
      template: "public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: './assets/css/[name].css',
    }),
    // 确保该插件在任何添加图片的插件之后
    new ImageminPlugin({
      //disable: process.env.NODE_ENV !== 'production', // 开发模式禁用
      pngquant: {
        quality: '80',
        progressive: true
      }
    }),
    new OptimizeCSSAssetsPlugin({}),
    new WebpackVersionPlugin({
      comment: '测试'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    autoprefixer(),
                  ],
                ],
              }
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: "asset/resource", // 原file-loader
        generator: {
          filename: "assets/images/[name]_[hash][ext]",
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: "asset/resource",
        generator: {
          filename: "assets/fonts/[name]_[hash][ext]",
        }
      },
      {
        test: /\.(csv|tsv)$/,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/,
        use: ["xml-loader"],
      },
      {
        test: /\.txt$/,
        use: [
          'reverse-loader'
        ]
      }
    ],
  }
};

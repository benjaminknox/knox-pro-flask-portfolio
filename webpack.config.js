const path = require('path');
const webpack = require('webpack');
const ManifestRevisionPlugin = require('manifest-revision-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

var node_modules = './node_modules',
    rootAssetPath = './assets',
    assetServer = "http://knox.pro:8282/",
    extractSASS = new ExtractTextPlugin('[name].[chunkhash].css');

module.exports = {
  entry: {
    app_js: [
      rootAssetPath + '/js/app.js'
    ],
    app_css: [
      rootAssetPath + '/scss/app.scss'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'webkit-build'),
    publicPath: assetServer,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[id].[chunkhash].chunk'
  },
  resolve: {
    extensions: ['.jsx', '.js', '.scss']
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/i, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /\.scss$/i,
        loader: extractSASS.extract({
          use: [{
              loader: 'css-loader'
            }, {
              loader: 'sass-loader',
              options: {
                includePaths: [
                  path.resolve(__dirname, node_modules + '/foundation/scss/')
                ]
              }
          }]
        })
      },
      { test: /\.(jpe?g|png|gif|eot|ttf|woff|woff2|otf|svg([\?]?.*))$/i,
        loaders: [
          'file-loader?context=' + rootAssetPath + '&name=[path][name].[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  devServer: {
    contentBase: './webkit-build',
    host: '0.0.0.0',
    public: 'knox.pro',
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  },
  plugins: [
    extractSASS,
    new ManifestRevisionPlugin(path.join('webkit-build', 'manifest.json'), {
      rootAssetPath: rootAssetPath,
      ignorePaths: ['/js', '/scss']
    })
  ]
};

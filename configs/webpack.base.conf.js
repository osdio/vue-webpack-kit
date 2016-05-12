import path from 'path';
import webpack from 'webpack';
import config from '../config';
import * as utils from './utils';


export default {
  entry: {
    app: './src/main.js',
    common: utils.getCommonDependencies(),
    vendor: config.basic.vendor
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '', '.js', '.vue' ],
    fallback: [ path.join(__dirname, '../node_modules') ],
    alias: config.basic.alias
  },
  resolveLoader: {
    fallback: [ path.join(__dirname, '../node_modules') ]
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: config.basic.projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.html$/,
        loader: 'vue-html'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', `${path.resolve(config.build.assetsSubDirectory, config.build.assetsPaths.js).replace(/^\//, '')}/[name].[hash].js`)
  ],
  vue: {
    loaders: utils.cssLoaders({
      sourceMap: true
    })
  }
};

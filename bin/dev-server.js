import path from 'path';
import express from 'express';
import webpack from 'webpack';
import proxyMiddleware from 'http-proxy-middleware';
import devIp from 'dev-ip';
import config from '../config';


const webpackConfig = process.env.NODE_ENV === 'production'
  ? require('../configs/webpack.prod.conf.js').default
  : require('../configs/webpack.dev.conf.js').default;


// 获取本地ip, 适用于mobile调试
const host = devIp()[ 0 ] || 'localhost';
const port = process.env.PORT || config.dev.port;


// 文档地址: https://github.com/chimurai/http-proxy-middleware
const { proxyTable } = config.dev;
const app = express();
const compiler = webpack(webpackConfig);


const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
});


// 强迫html更新
const hotMiddleware = require('webpack-hot-middleware')(compiler);
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb()
  })
});


// api代理
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[ context ];
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
});


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());


// serve webpack bundle output
app.use(devMiddleware);


app.use(hotMiddleware);


// serve pure static assets
const staticPath = path.posix.join(config.build.assetsPublicPath, config.build.assetsSubDirectory);
app.use(staticPath, express.static('./static'));

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Listening at http://${host}:${port}`);
});

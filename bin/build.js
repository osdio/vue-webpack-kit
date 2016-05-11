// https://github.com/shelljs/shelljs
import 'shelljs/global';
env.NODE_ENV = 'production';


import path from 'path';
import fs from 'fs-extra';
import ora from 'ora';
import webpack from 'webpack';
import gzipSize from 'gzip-size';
import config from '../config';
import webpackConfig from '../configs/webpack.prod.conf';


const spinner = ora('building for production...');
spinner.start();

const assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory);
rm('-rf', assetsPath);
mkdir('-p', assetsPath);
cp('-R', 'static/', assetsPath);

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');


  let files = [];
  fs.walk(path.join(__dirname, '../dist'))
    .on('data', function (item) {
      files.push(item.path);
    })
    .on('end', function () {
      files.forEach(function (item) {
        if (/\w*\.(js|css)/.test(item)) {
          console.log(item.replace(assetsPath, ''), gzipSize.sync(fs.readFileSync(item)));
        }
      });
    });
});

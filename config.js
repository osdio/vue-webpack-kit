import path from 'path';
import devIp from 'dev-ip';


let alias = {
  src: './src',
  assets: './src/assets',
  components: './src/components',
  services: './src/services',
  styles: './src/styles',
  utils: './src/utils'
};

for (var key in alias) {
  alias[ key ] = path.join(__dirname, alias[ key ]);
}


export default {
  basic: {
    projectRoot: __dirname,
    src: path.join(__dirname, './src'),
    dist: path.join(__dirname, './dist'),
    alias: alias,
    vendor: [
      'vue',
      'fetch-detector',
      'fetch-ie8',
      'query-string',
      'vue-router',
      'normalize.css'
    ],
    common: [
      'utils',
      'services'
    ]
  },
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    productionSourceMap: false,
    assetsPaths: {
      js: 'js',
      image: 'image',
      font: 'font',
      css: 'css'
    }
  },
  dev: {
    port: 8080,
    hostname: devIp()[ 0 ] || 'localhost',
    proxyTable: {}
  }
};

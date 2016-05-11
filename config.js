import path from 'path';


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
    alias: alias
  },
  build: {
    index: path.resolve(__dirname, 'dist/index.html'),
    assetsRoot: path.resolve(__dirname, 'dist'),
    assetsSubDirectory: '/',
    assetsPublicPath: '/',
    productionSourceMap: false
  },
  dev: {
    port: 8080,
    proxyTable: {}
  }
};

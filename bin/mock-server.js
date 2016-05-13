var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var fs = require('fs-extra');
var path = require('path');
var mockDir = path.resolve(__dirname, '../mock');
var files = fs.readdirSync(mockDir);
var routers = {};


files.forEach(function (item) {
  var routeConfigFiles = [];
  var routerConfig = require(path.join(mockDir, item));
  if (!routerConfig || typeof routerConfig.path === 'undefined') return;
  routers[item] = {
    config: routerConfig
  };
  fs.walk(path.join(mockDir, item))
    .on('data', function (itemRoute) {
      if (/\.js$/.test(itemRoute.path) && itemRoute.path !== path.join(mockDir, item, 'index.js')) {
        routeConfigFiles.push(itemRoute.path);
      }
    })
    .on('end', function () {
      routers[item].routes = routeConfigFiles;
      if (Object.keys(routers).length === files.length) {
        server(routers);
      }
    });
});


function server(routers) {
  const app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));


  Object.keys(routers).forEach(function (key) {
    var routerConfig = routers[key];
    var router = new express.Router();
    routerConfig.routes.forEach(function (routePath) {
      var route = require('../mock/a/test/a.js');
      Object.keys(route).forEach(function (routeKey) {
        router.use(routeKey, route[routeKey]);
      });
    });
    app.use(routerConfig.config.path, router);
  });

  app.listen(3001, function () {
    console.log('Mock server running on 3001');
  });
}

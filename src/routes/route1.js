export default {
  a: {
    component: function (resolve) {
      require([ '../containers/A.vue' ], (component)=> {
        resolve(component);
      });
    }
  },
  b: {
    component: function (resolve) {
      require([ '../containers/B.vue' ], resolve);
    }
  }
}

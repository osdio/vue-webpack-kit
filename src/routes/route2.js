export default {
  c: {
    component: (resolve)=> {
      require([ '../containers/C.vue' ], (component)=> {
        resolve(component);
      });
    }
  }
}

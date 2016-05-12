import VueRouter from 'vue-router';
import Vue from 'vue';
import route1 from './route1';
import route2 from './route2';


Vue.use(VueRouter);

const router = new VueRouter({
  history: true,
  saveScrollPosition: true
});

router.map({
  ...route1,
  ...route2
});

export default router;

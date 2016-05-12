import './polyfill';
import './styles/common.scss';
import Vue from 'vue';
import App from './App';

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App },
});

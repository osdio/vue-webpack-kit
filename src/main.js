import './polyfill';
import './styles/common.scss';
import App from './App';
import router from './routes';

router.start(App, '#app');

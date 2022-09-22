// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import iView from 'iview';
import moment from 'moment'
Vue.prototype.$moment = moment;
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import store from './store'
import i18n from  './locale/index'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
Vue.prototype.$http = axios;
Vue.use(iView);
Vue.config.productionTip = false;
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
if(window.location.href.indexOf('test-pc.taihegongxiang.com') !=-1 || window.location.href.indexOf('www.taiheshuchao.com') !=-1 || window.location.href.indexOf('www.taihegongxiang.com') !=-1){   //判断用户访问的地址是否为泰和数巢域名  www.taiheshuchao.com  www.taihegongxiang.com
  Vue.prototype.$isthsc=true
}else {
  Vue.prototype.$isthsc=false
}
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start();
  next();
});

router.afterEach(route => {
  iView.LoadingBar.finish();
});

Vue.prototype.$addStorageEvent = function (type, key, data) {
  // localStorage
  if (type === 1) {
    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        localStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  } else {
    // sessionStorage
    // 创建一个StorageEvent事件
    let newStorageEvent = document.createEvent('StorageEvent');
    const storage = {
      setItem: function (k, val) {
        sessionStorage.setItem(k, val);
        // 初始化创建的事件
        newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
        // 派发对象
        window.dispatchEvent(newStorageEvent);
      }
    }
    return storage.setItem(key, data);
  }
}

/* eslint-disable no-new */
const vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
Vue.use(vm)

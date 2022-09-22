import Vue from 'vue'

import Cookies from 'js-cookie'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import 'normalize.css/normalize.css'

import Element from 'element-ui'
//
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 引入
import md5 from 'js-md5'
// 定义全局变量
Vue.prototype.$md5 = md5
// 数据字典
// import dict from './components/Dict'

// 权限指令
import permission from './components/Permission'
import './assets/styles/element-variables.scss'
// global css
import './assets/styles/index.scss'

// 代码高亮
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'

import App from './App'
import store from './store'
import router from './router/routers'

import './assets/icons' // icon
import './router/index' // permission control
import 'echarts-gl'

// 适配flex
import './views/common/flexible.js'

// 引入全局css
import './views/assets/scss/style.scss'

// 引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)

import iView from 'iview' // 导入组件库
import 'iview/dist/styles/iview.css' // 导入样式
Vue.use(iView)

// 按需引入vue-awesome图标
// import Icon from 'vue-awesome/components/Icon'
// import 'vue-awesome/icons/chart-bar.js'
// import 'vue-awesome/icons/chart-area.js'
// import 'vue-awesome/icons/chart-pie.js'
// import 'vue-awesome/icons/chart-line.js'
// import 'vue-awesome/icons/align-left.js'

// 全局注册图标
// Vue.component('icon', Icon)

Vue.use(VueHighlightJS)
Vue.use(mavonEditor)
Vue.use(permission)
// Vue.use(dict)
Vue.use(Element, {
  size: Cookies.get('size') || 'small' // set element-ui default size
})
Vue.config.productionTip = false
import VueAMap from 'vue-amap'
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
  key: 'c96da2817fef8aeac3b03260816f86b5',
  // 插件
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})
const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
Vue.use(vm)

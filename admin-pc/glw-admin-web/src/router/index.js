import router from './routers'
import store from '@/store'
import Config from '@/settings'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { buildMenus, getPermissions } from '@/api/system/menu'
import { filterAsyncRouter } from '@/store/modules/permission'
import { redirectToSsoPage } from '@/utils/sso'
import { Notification } from 'element-ui'

NProgress.configure({ showSpinner: false })// NProgress Configuration

const whiteList = ['/abc', '/spread','/agreement','/about']// no redirect whitelist

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + Config.title
  }
  NProgress.start()
  if (to.path === '/spread' || to.path === '/agreement' || to.path === '/about') {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      redirectToSsoPage(to)
    }
  } else {
    if (getToken()) {
      // store.dispatch('SetToken', getToken()).then(res => {})
      // 已登录且要跳转的页面是登录页
      if (to.path === '/login') {
        next({ path: '/' })
        NProgress.done()
      } else {
        // 首次拉取用户信息和菜单
        if (store.getters.loadMenus) {
          // 修改成false，防止死循环
          store.dispatch('disableLoadMenus').then(res => {})
          store.dispatch('GetInfo').then(res => { // 拉取user_info
            console.log('开始加载权限及菜单')
            if (res.userTypeList.includes(2)) {
              // 获取权限集合
              loadPermissions()
              // 动态路由，拉取菜单
              loadMenus(next, to)
            } else {
              Notification.error({
                title: '此类型用户禁止登录，请联系管理员',
                duration: 5000
              })
              store.dispatch('LogOut').then(() => {
                console.log('开始退出')
                location.reload() // 为了重新实例化vue-router对象 避免bug
              })
            }
          }).catch((err) => {
            console.log('获取用户信息报错', err)
            store.dispatch('LogOut').then(() => {
              console.log('开始退出')
              location.reload() // 为了重新实例化vue-router对象 避免bug
            })
          })
        } else {
          next()
        }
      }
    } else {
      /* has no token*/
      if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
        next()
      } else {
        redirectToSsoPage(to)
      }
    }
  }
})

export const loadPermissions = () => {
  console.log('开始加载权限')
  getPermissions().then(res => {
    store.dispatch('GenerateResources', res).then(() => {})
  })
}

export const loadMenus = (next, to) => {
  console.log('开始加载菜单')
  buildMenus().then(res => {
    const asyncRouter = filterAsyncRouter(res)
    asyncRouter.push({ path: '*', redirect: '/dashboard', hidden: true })
    store.dispatch('GenerateRoutes', asyncRouter).then(() => { // 存储路由
      router.addRoutes(asyncRouter) // 动态添加可访问路由表
      next({ ...to, replace: true })
    })
  })
}

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

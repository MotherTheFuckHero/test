import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../layout/index'

Vue.use(Router)

export const constantRouterMap = [
  // { path: '/login',
  //   meta: { title: '登录', noCache: true },
  //   component: (resolve) => require(['@/views/login'], resolve),
  //   hidden: true
  // },
  /* 推广*/
  {
    path: '/spread',
    component: (resolve) => require(['@/views/spread'], resolve),
    hidden: true,
    meta: {
      title: 'APP下载'
    }
  },
  /* 隐私协议  APP使用*/
  {
    path: '/agreement',
    component: (resolve) => require(['@/views/agreement'], resolve),
    hidden: true,
    meta: {
      title: '隐私协议'
    }
  },
  /* 关于我们  APP使用*/
  {
    path: '/about',
    component: (resolve) => require(['@/views/about'], resolve),
    hidden: true,
    meta: {
      title: '关于我们'
    }
  },
  /* 大屏副屏1*/
  {
    path: '/bigScreenOne',
    component: (resolve) => require(['@/views/bigData/bigScreenOne/index'], resolve),
    hidden: true
  },
  /* 大屏副屏2*/
  {
    path: '/bigScreenTwo',
    component: (resolve) => require(['@/views/bigData/bigScreenTwo/index'], resolve),
    hidden: true
  },
  /* 大屏副屏3*/
  {
    path: '/bigScreenThree',
    component: (resolve) => require(['@/views/bigData/bigScreenThree/index'], resolve),
    hidden: true
  },
  /* 大屏主屏*/
  {
    path: '/bigScreenMain',
    component: (resolve) => require(['@/views/bigData/bigScreenMain/index'], resolve),
    hidden: true
  },
  {
    path: '/404',
    component: (resolve) => require(['@/views/features/404'], resolve),
    hidden: true
  },
  {
    path: '/401',
    component: (resolve) => require(['@/views/features/401'], resolve),
    hidden: true
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: (resolve) => require(['@/views/features/redirect'], resolve)
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: (resolve) => require(['@/views/home'], resolve),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'index', affix: true, noCache: true }
      }
    ]
  },
  {
    path: '/user',
    component: Layout,
    hidden: true,
    redirect: 'noredirect',
    children: [
      {
        path: 'center',
        // to: 'http://test-sso.guolaiwan.net/user_info',
        component: (resolve) => require(['@/views/user/index'], resolve),
        name: '个人中心',
        meta: { title: '个人中心' }
      }
    ]
  }
  // {
  //   name: '系统管理',
  //   path: '/system',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '系统管理', icon: 'system', noCache: true },
  //   children: [
  //     {
  //       path: '/sys',
  //       component: (resolve) => require(['@/views/system/sys/index'], resolve),
  //       name: '系统列表',
  //       meta: { title: '系统列表' }
  //     }, {
  //       path: '/city',
  //       component: (resolve) => require(['@/views/system/city/index'], resolve),
  //       name: '城市列表',
  //       meta: { title: '城市列表' }
  //     }, {
  //       path: '/company',
  //       component: (resolve) => require(['@/views/system/company/index'], resolve),
  //       name: '分公司列表',
  //       meta: { title: '分公司列表' }
  //     }, {
  //       path: '/issue',
  //       component: (resolve) => require(['@/views/system/issue/index'], resolve),
  //       name: '常见问题列表',
  //       meta: { title: '常见问题列表' }
  //     }, {
  //       path: '/language',
  //       component: (resolve) => require(['@/views/system/language/index'], resolve),
  //       name: '语言列表',
  //       meta: { title: '语言列表' }
  //     }, {
  //       path: '/advertisement',
  //       component: (resolve) => require(['@/views/system/advertisement/index'], resolve),
  //       name: '广告位列表',
  //       meta: { title: '广告位列表' }
  //     }, {
  //       path: '/storage',
  //       component: (resolve) => require(['@/views/system/storage/index'], resolve),
  //       name: '系统文件列表',
  //       meta: { title: '系统文件列表' }
  //     }, {
  //       path: '/syslog',
  //       component: (resolve) => require(['@/views/system/syslog/index'], resolve),
  //       name: '系统日志列表',
  //       meta: { title: '系统日志列表' }
  //     }, {
  //       path: '/syskeyword',
  //       component: (resolve) => require(['@/views/system/syskeyword/index'], resolve),
  //       name: '关键字列表',
  //       meta: { title: '关键字列表' }
  //     }, {
  //       path: '/dict',
  //       component: (resolve) => require(['@/views/system/dict/index'], resolve),
  //       name: '数据字典列表',
  //       meta: { title: '数据字典列表' }
  //     }, {
  //       path: '/sysnotice',
  //       component: (resolve) => require(['@/views/system/sysnotice/index'], resolve),
  //       name: '系统公告列表',
  //       meta: { title: '系统公告列表' }
  //     }, {
  //       path: '/articleguide',
  //       component: (resolve) => require(['@/views/system/articleguide/index'], resolve),
  //       name: '攻略文章列表',
  //       meta: { title: '攻略文章列表' }
  //     }, {
  //       path: '/sysfeedback',
  //       component: (resolve) => require(['@/views/system/sysfeedback/index'], resolve),
  //       name: '意见反馈列表',
  //       meta: { title: '意见反馈列表' }
  //     }, {
  //       path: '/version',
  //       component: (resolve) => require(['@/views/system/version/index'], resolve),
  //       name: '版本更新列表',
  //       meta: { title: '版本更新列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '用户管理',
  //   path: '/user',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '用户管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/userinfo',
  //       component: (resolve) => require(['@/views/user/userinfo/index'], resolve),
  //       name: '用户列表',
  //       meta: { title: '用户列表' }
  //     },
  //     {
  //       path: '/sysrole',
  //       component: (resolve) => require(['@/views/user/sysrole/index'], resolve),
  //       name: '角色列表',
  //       meta: { title: '角色列表' }
  //     },
  //     {
  //       path: '/sysresource',
  //       component: (resolve) => require(['@/views/user/sysresource/index'], resolve),
  //       name: '权限菜单列表',
  //       meta: { title: '权限菜单列表' }
  //     },
  //     {
  //       path: '/userfootprint',
  //       component: (resolve) => require(['@/views/user/userfootprint/index'], resolve),
  //       name: '用户足迹',
  //       meta: { title: '用户足迹' }
  //     }, {
  //       path: '/userhistory',
  //       component: (resolve) => require(['@/views/user/userhistory/index'], resolve),
  //       name: '用户搜索历史',
  //       meta: { title: '用户搜索历史' }
  //     }, {
  //       path: '/useraddress',
  //       component: (resolve) => require(['@/views/user/useraddress/index'], resolve),
  //       name: '用户地址',
  //       meta: { title: '用户地址' }
  //     }, {
  //       path: '/userfavorite',
  //       component: (resolve) => require(['@/views/user/userfavorite/index'], resolve),
  //       name: '用户收藏',
  //       meta: { title: '用户收藏' }
  //     }
  //   ]
  // },
  // {
  //   name: '内容管理',
  //   path: '/panel',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '内容管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/panel',
  //       component: (resolve) => require(['@/views/panel/panel/index'], resolve),
  //       name: '板块列表',
  //       meta: { title: '板块列表' }
  //     }, {
  //       path: '/panelcategory',
  //       component: (resolve) => require(['@/views/panel/panelcategory/index'], resolve),
  //       name: '板块分类列表',
  //       meta: { title: '板块分类列表' }
  //     }, {
  //       path: '/panelcontent',
  //       component: (resolve) => require(['@/views/panel/panelcontent/index'], resolve),
  //       name: '板块内容列表',
  //       meta: { title: '板块内容列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '商户管理',
  //   path: '/merchant',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '商户管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/merchant',
  //       component: (resolve) => require(['@/views/merchant/merchant/index'], resolve),
  //       name: '商户列表',
  //       meta: { title: '商户列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '商品管理',
  //   path: '/product',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '商品管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/product',
  //       component: (resolve) => require(['@/views/product/product/index'], resolve),
  //       name: '商品列表',
  //       meta: { title: '商品列表' }
  //     },
  //     {
  //       path: '/productcomment',
  //       component: (resolve) => require(['@/views/product/productcomment/index'], resolve),
  //       name: '商品评论列表',
  //       meta: { title: '商品评论列表' }
  //     },
  //     {
  //       path: '/postagetemplate',
  //       component: (resolve) => require(['@/views/product/postagetemplate/index'], resolve),
  //       name: '运费模板列表',
  //       meta: { title: '运费模板列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '订单管理',
  //   path: '/order',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '订单管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/order',
  //       component: (resolve) => require(['@/views/order/order/index'], resolve),
  //       name: '订单列表',
  //       meta: { title: '订单列表' }
  //     },
  //     {
  //       path: '/payment',
  //       component: (resolve) => require(['@/views/order/payment/index'], resolve),
  //       name: '支付列表',
  //       meta: { title: '支付列表' }
  //     },
  //     {
  //       path: '/refund',
  //       component: (resolve) => require(['@/views/order/refund/index'], resolve),
  //       name: '退款列表',
  //       meta: { title: '退款列表' }
  //     },
  //     {
  //       path: '/settlement',
  //       component: (resolve) => require(['@/views/order/settlement/index'], resolve),
  //       name: '结算列表',
  //       meta: { title: '结算列表' }
  //     },
  //     {
  //       path: '/coupon',
  //       component: (resolve) => require(['@/views/order/coupon/index'], resolve),
  //       name: '优惠券列表',
  //       meta: { title: '优惠券列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '活动管理',
  //   path: '/activity',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '活动管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/raffleactivity',
  //       component: (resolve) => require(['@/views/activity/raffleactivity/index'], resolve),
  //       name: '抽奖活动列表',
  //       meta: { title: '抽奖活动列表' }
  //     },
  //     {
  //       path: '/raffleprize',
  //       component: (resolve) => require(['@/views/activity/raffleprize/index'], resolve),
  //       name: '抽奖奖品列表',
  //       meta: { title: '抽奖奖品列表' }
  //     },
  //     {
  //       path: '/votetheme',
  //       component: (resolve) => require(['@/views/activity/votetheme/index'], resolve),
  //       name: '投票活动列表',
  //       meta: { title: '投票活动列表' }
  //     },
  //     {
  //       path: '/voteitem',
  //       component: (resolve) => require(['@/views/activity/voteitem/index'], resolve),
  //       name: '投票项目列表',
  //       meta: { title: '投票项目列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '导览管理',
  //   path: '/guide',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '导览管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/merchantguide',
  //       component: (resolve) => require(['@/views/guide/merchantguide/index'], resolve),
  //       name: '导览图列表',
  //       meta: { title: '导览图列表' }
  //     },
  //     {
  //       path: '/merchantguidepoint',
  //       component: (resolve) => require(['@/views/guide/merchantguidepoint/index'], resolve),
  //       name: '导览点列表',
  //       meta: { title: '导览点列表' }
  //     }
  //   ]
  // },
  // {
  //   name: '直播管理',
  //   path: '/live',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '直播管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/liveroom',
  //       component: (resolve) => require(['@/views/live/liveroom/index'], resolve),
  //       name: '直播列表',
  //       meta: { title: '直播列表' }
  //     },
  //     {
  //       path: '/liveadvert',
  //       component: (resolve) => require(['@/views/live/liveadvert/index'], resolve),
  //       name: '直播广告列表',
  //       meta: { title: '直播广告列表' }
  //     },
  //     {
  //       path: '/liveplayback',
  //       component: (resolve) => require(['@/views/live/liveplayback/index'], resolve),
  //       name: '直播回放列表',
  //       meta: { title: '直播回放列表' }
  //     },
  //     {
  //       path: '/livegift',
  //       component: (resolve) => require(['@/views/live/livegift/index'], resolve),
  //       name: '直播礼物列表',
  //       meta: { title: '直播礼物列表' }
  //     }, {
  //       path: '/livetipgift',
  //       component: (resolve) => require(['@/views/live/livetipgift/index'], resolve),
  //       name: '打赏记录列表',
  //       meta: { title: '打赏记录列表' }
  //     }, {
  //       path: '/liveserver',
  //       component: (resolve) => require(['@/views/live/liveserver/index'], resolve),
  //       name: '直播服务器列表',
  //       meta: { title: '直播服务器列表' }
  //     }
  //   ]
  // }
  // {
  //   name: '团购管理',
  //   path: '/groupon',
  //   component: Layout,
  //   hidden: false,
  //   redirect: 'noredirect',
  //   alwaysShow: true,
  //   meta: { title: '团购管理', icon: 'user', noCache: true },
  //   children: [
  //     {
  //       path: '/community',
  //       component: (resolve) => require(['@/views/groupon/community/index'], resolve),
  //       name: '社区列表',
  //       meta: { title: '社区列表' }
  //     },
  //     {
  //       path: '/merchantCommunity',
  //       component: (resolve) => require(['@/views/groupon/merchantCommunity/index'], resolve),
  //       name: '社区配送范围列表',
  //       meta: { title: '社区配送范围列表' }
  //     },
  //     {
  //       path: '/communityHead',
  //       component: (resolve) => require(['@/views/groupon/communityHead/index'], resolve),
  //       name: '社区团长列表',
  //       meta: { title: '社区团长列表' }
  //     },
  //   ]
  // },
]

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
const Login = resolve => require(['@/components/Login'], resolve);
const error = resolve => require(['@/components/404'], resolve);
const SignUp = resolve => require(['@/components/SignUp'], resolve);
const CheckPhone = resolve => require(['@/components/signUp/CheckPhone'], resolve);
const InputInfo = resolve => require(['@/components/signUp/InputInfo'], resolve);
const SignUpDone = resolve => require(['@/components/signUp/SignUpDone'], resolve);
const GoodsList = resolve => require(['@/components/GoodsList'], resolve);
const aboutUs = resolve => require(['@/components/aboutUs'], resolve);
const news = resolve => require(['@/components/news'], resolve);
const newsDetail = resolve => require(['@/components/newsDetail'], resolve);
const orderDetail = resolve => require(['@/components/order/orderDetail'], resolve);
const GoodsDetail = resolve => require(['@/components/GoodsDetail'], resolve);
const ShoppingCart = resolve => require(['@/components/ShoppingCart'], resolve);
const Order = resolve => require(['@/components/Order'], resolve);
const Pay = resolve => require(['@/components/Pay'], resolve);
const PayDone = resolve => require(['@/components/PayDone'], resolve);
const Freeback = resolve => require(['@/components/Freeback'], resolve);
const Home = resolve => require(['@/components/Home'], resolve);
const MyAddress = resolve => require(['@/components/home/MyAddress'], resolve);
const AddAddress = resolve => require(['@/components/home/AddAddress'], resolve);
const MyOrder = resolve => require(['@/components/home/MyOrder'], resolve);
const MyShoppingCart = resolve => require(['@/components/home/MyShoppingCart'], resolve);
const Merchant = resolve => require(['@/components/Merchant'], resolve);
const PersonalCenter = resolve => require(['@/components/PersonalCenter'], resolve);
const Attractions = resolve => require(['@/components/Attractions'], resolve);
const MallShop = resolve => require(['@/components/MallShop'], resolve);
const ShopCar = resolve => require(['@/components/ShopCar'], resolve);
const AttractionsDetail = resolve => require(['@/components/AttractionsDetail'], resolve);
const qualifications = resolve => require(['@/components/qualifications'], resolve);
const MallShopDetail = resolve => require(['@/components/mallShopDetail'], resolve);
const SectorDetails = resolve => require(['@/components/SectorDetails'], resolve);
const ToShopPay = resolve => require(['@/components/ToShopPay'], resolve);
const secKillSubmit = resolve => require(['@/components/secKillSubmit'], resolve);
const lineSubmit = resolve => require(['@/components/lineSubmit'], resolve);
const guideList = resolve => require(['@/components/guideList'], resolve);
const guideSubmit = resolve => require(['@/components/guideSubmit'], resolve);
const guideShopDetail = resolve => require(['@/components/guideShopDetail'], resolve);
const skillmore = resolve => require(['@/components/skillmore'], resolve);
const couponList = resolve => require(['@/components/couponList'], resolve);
const ToShopCarPay = resolve => require(['@/components/ToShopCarPay'], resolve);
const ShopFight = resolve => require(['@/components/ShopFight'], resolve);
const machine = resolve => require(['@/components/machine/index'], resolve);
const machineDetail = resolve => require(['@/components/machine/detail'], resolve);
const jhResidence = resolve => require(['@/components/jhResidence/index'], resolve);
const jhResidenceDetail = resolve => require(['@/components/jhResidence/detail'], resolve);
const auction1 = resolve => require(['@/components/auction/index1'], resolve);
const lottery = resolve => require(['@/components/auction/lottery'], resolve);
const lotterys = resolve => require(['@/components/auction/lotterys'], resolve);


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/', // 首页
      name: 'Index',
      component: Index
    },
    {
      path: '*', // 404
      name: '404',
      component: error
    },
    {
      path: '/Login', // 登录
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp', // 注册
      name: 'SignUp',
      component: SignUp,
      children: [
        {
          path: '/',
          name: 'index',
          component: CheckPhone
        },
        {
          path: 'checkPhone',
          name: 'CheckPhone',
          component: CheckPhone
        },
        {
          path: 'inputInfo',
          name: 'InputInfo',
          component: InputInfo
        },
        {
          path: 'signUpDone',
          name: 'SignUpDone',
          component: SignUpDone
        }
      ]
    },
    // {
    //   path: '/goodsList', // 商品列表
    //   name: 'GoodsList',
    //   component: GoodsList
    // },
    {
      path: '/aboutUs', // 关于我们
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/news', // 新闻资讯
      name: 'news',
      component: news
    },
    {
      path: '/newsDetail', // 新闻资讯详情
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/orderDetail', // 订单详情
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/goodsDetail', // 商品详情
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/shoppingCart', // 商品详情
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/order', // 订单页面
      name: 'Order',
      component: Order
    },
    {
      path: '/pay', // 支付页面
      name: 'Pay',
      component: Pay
    },
    {
      path: '/payDone', // 支付成功页面
      name: 'PayDone',
      component: PayDone
    },
    {
      path: '/freeback', // 反馈页面
      name: 'Freeback',
      component: Freeback
    },
    {
      path: '/personalCenter', // 个人中心
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/attractions', // 商家景点
      name: 'Attractions',
      component: Attractions
    },
    {
      path: '/attractionsDetail', // 商家详情
      name: 'AttractionsDetail',
      component: AttractionsDetail
    },
    {
      path: '/qualifications', // 商家资质
      name: 'qualifications',
      component: qualifications
    },
    {
      path: '/mallShopDetail', // 商品详情
      name: 'MallShopDetail',
      component: MallShopDetail
    },
    {
      path: '/mallShop', // 商品商城
      name: 'MallShop',
      component: MallShop
    },
    {
      path: '/toShopPay', // 立即购买
      name: 'ToShopPay',
      component: ToShopPay
    },
    {
      path: '/toShopCarPay', // 购物车结算
      name: 'ToShopCarPay',
      component: ToShopCarPay
    },
    {
      path: '/sectorDetails', // 板块详情
      name: 'SectorDetails',
      component: SectorDetails
    },
    {
      path: '/shopCar', // 购物车
      name: 'ShopCar',
      component: ShopCar
    },
    {
      path: '/secKillSubmit', // 秒杀下单并支付
      name: 'secKillSubmit',
      component: secKillSubmit
    },
    {
      path: '/lineSubmit', // 线路下单并支付
      name: 'lineSubmit',
      component: lineSubmit
    },
    {
      path: '/guideList', // 导游列表
      name: 'guideList',
      component: guideList
    },
    {
      path: '/guideShopDetail', // 导游商品详情
      name: 'guideShopDetail',
      component: guideShopDetail
    },
    {
      path: '/guideSubmit', // 导游下单
      name: 'guideSubmit',
      component: guideSubmit
    },
    {
      path: '/skillmore', // 秒杀活动列表
      name: 'skillmore',
      component: skillmore
    },
    {
      path: '/shopFight', // 商品拼团下单并支付
      name: 'ShopFight',
      component: ShopFight
    },
    {
      path: '/couponList', // 优惠券列表
      name: 'couponList',
      component: couponList
    },
    {
      path: '/machine', // 查询机首页
      name: 'machine',
      component: machine
    },
    {
      path: '/machineDetail', // 查询机景区详情
      name: 'machineDetail',
      component: machineDetail
    },
    {
      path: '/jhResidence', // 江浩故居
      name: 'jhResidence',
      component: jhResidence
    },
    {
      path: '/jhResidenceDetail', // 江浩故居详情
      name: 'jhResidenceDetail',
      component: jhResidenceDetail
    },
    {
      path: '/auction1', // 竞拍
      name: 'auction1',
      component: auction1
    },
    {
      path: '/lottery', // 抽奖
      name: 'lottery',
      component: lottery
    },
    {
      path: '/lotterys', // 抽奖
      name: 'lotterys',
      component: lotterys
    },
    {
      path: '/home', // 主页
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'HomeIndex',
          component: MyOrder
        },
        {
          path: 'myAddress',
          name: 'MyAddress',
          component: MyAddress
        },
        {
          path: 'addAddress',
          name: 'AddAddress',
          component: AddAddress
        },
        {
          path: 'myOrder',
          name: 'MyOrder',
          component: MyOrder
        },
        {
          path: 'myShoppingCart',
          name: 'MyShoppingCart',
          component: MyShoppingCart
        }
      ]
    },
    {
      path: '/merchant',
      name: 'Merchant',
      component: Merchant
    }
  ]
});

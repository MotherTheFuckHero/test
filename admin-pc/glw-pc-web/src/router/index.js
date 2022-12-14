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
      path: '/', // ??????
      name: 'Index',
      component: Index
    },
    {
      path: '*', // 404
      name: '404',
      component: error
    },
    {
      path: '/Login', // ??????
      name: 'Login',
      component: Login
    },
    {
      path: '/SignUp', // ??????
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
    //   path: '/goodsList', // ????????????
    //   name: 'GoodsList',
    //   component: GoodsList
    // },
    {
      path: '/aboutUs', // ????????????
      name: 'aboutUs',
      component: aboutUs
    },
    {
      path: '/news', // ????????????
      name: 'news',
      component: news
    },
    {
      path: '/newsDetail', // ??????????????????
      name: 'newsDetail',
      component: newsDetail
    },
    {
      path: '/orderDetail', // ????????????
      name: 'orderDetail',
      component: orderDetail
    },
    {
      path: '/goodsDetail', // ????????????
      name: 'GoodsDetail',
      component: GoodsDetail
    },
    {
      path: '/shoppingCart', // ????????????
      name: 'ShoppingCart',
      component: ShoppingCart
    },
    {
      path: '/order', // ????????????
      name: 'Order',
      component: Order
    },
    {
      path: '/pay', // ????????????
      name: 'Pay',
      component: Pay
    },
    {
      path: '/payDone', // ??????????????????
      name: 'PayDone',
      component: PayDone
    },
    {
      path: '/freeback', // ????????????
      name: 'Freeback',
      component: Freeback
    },
    {
      path: '/personalCenter', // ????????????
      name: 'PersonalCenter',
      component: PersonalCenter
    },
    {
      path: '/attractions', // ????????????
      name: 'Attractions',
      component: Attractions
    },
    {
      path: '/attractionsDetail', // ????????????
      name: 'AttractionsDetail',
      component: AttractionsDetail
    },
    {
      path: '/qualifications', // ????????????
      name: 'qualifications',
      component: qualifications
    },
    {
      path: '/mallShopDetail', // ????????????
      name: 'MallShopDetail',
      component: MallShopDetail
    },
    {
      path: '/mallShop', // ????????????
      name: 'MallShop',
      component: MallShop
    },
    {
      path: '/toShopPay', // ????????????
      name: 'ToShopPay',
      component: ToShopPay
    },
    {
      path: '/toShopCarPay', // ???????????????
      name: 'ToShopCarPay',
      component: ToShopCarPay
    },
    {
      path: '/sectorDetails', // ????????????
      name: 'SectorDetails',
      component: SectorDetails
    },
    {
      path: '/shopCar', // ?????????
      name: 'ShopCar',
      component: ShopCar
    },
    {
      path: '/secKillSubmit', // ?????????????????????
      name: 'secKillSubmit',
      component: secKillSubmit
    },
    {
      path: '/lineSubmit', // ?????????????????????
      name: 'lineSubmit',
      component: lineSubmit
    },
    {
      path: '/guideList', // ????????????
      name: 'guideList',
      component: guideList
    },
    {
      path: '/guideShopDetail', // ??????????????????
      name: 'guideShopDetail',
      component: guideShopDetail
    },
    {
      path: '/guideSubmit', // ????????????
      name: 'guideSubmit',
      component: guideSubmit
    },
    {
      path: '/skillmore', // ??????????????????
      name: 'skillmore',
      component: skillmore
    },
    {
      path: '/shopFight', // ???????????????????????????
      name: 'ShopFight',
      component: ShopFight
    },
    {
      path: '/couponList', // ???????????????
      name: 'couponList',
      component: couponList
    },
    {
      path: '/machine', // ???????????????
      name: 'machine',
      component: machine
    },
    {
      path: '/machineDetail', // ?????????????????????
      name: 'machineDetail',
      component: machineDetail
    },
    {
      path: '/jhResidence', // ????????????
      name: 'jhResidence',
      component: jhResidence
    },
    {
      path: '/jhResidenceDetail', // ??????????????????
      name: 'jhResidenceDetail',
      component: jhResidenceDetail
    },
    {
      path: '/auction1', // ??????
      name: 'auction1',
      component: auction1
    },
    {
      path: '/lottery', // ??????
      name: 'lottery',
      component: lottery
    },
    {
      path: '/lotterys', // ??????
      name: 'lotterys',
      component: lotterys
    },
    {
      path: '/home', // ??????
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

<template>
  <div id="app">
    <Header v-if="excludeRouteserror.indexOf($route.name) == -1"></Header>
    <router-view v-if="isRouterAlive"  />
    <!-- 部分路由不应该包含这个Footer -->
    <Footer v-if="excludeRoutes.indexOf($route.name) == -1"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
export default {
  name: 'App',
  provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      excludeRoutes: ['HomeIndex', 'MyAddress', 'AddAddress', 'MyOrder', 'MyShoppingCart',"404","machine","machineDetail", 'auction1','auction2','auction3','auction4','auction5','lottery','lotterys',"jhResidence","jhResidenceDetail"],
      excludeRouteserror: ["404","machine","machineDetail","jhResidence","jhResidenceDetail", 'auction1','auction2','auction3','auction4','auction5','lotterys', 'lottery'],
      isRouterAlive: true
    };
  },
  methods:{
    reload () {
      this.isRouterAlive = false;            //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true;         //再打开
      })
    }
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style>
 .mouse-cover-canvas{
   left: 800px !important;
   top: 80px !important;
 }
</style>
